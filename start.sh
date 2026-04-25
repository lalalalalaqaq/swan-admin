#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="${APP_NAME:-swan-admin}"
APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
WEB_ROOT="${WEB_ROOT:-/var/www/${APP_NAME}}"
SERVER_NAME="${SERVER_NAME:-_}"
API_PROXY_TARGET="${API_PROXY_TARGET:-}"
ADMIN_API_PROXY_TARGET="${ADMIN_API_PROXY_TARGET:-${API_PROXY_TARGET}}"
SQUIRREL_API_PROXY_TARGET="${SQUIRREL_API_PROXY_TARGET:-}"
NGINX_CONF="/etc/nginx/sites-available/${APP_NAME}"
NGINX_LINK="/etc/nginx/sites-enabled/${APP_NAME}"

run_as_root() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  else
    sudo "$@"
  fi
}

need_command() {
  command -v "$1" >/dev/null 2>&1
}

print_usage() {
  cat <<EOF
Usage:
  bash start.sh

Common examples:
  SERVER_NAME=example.com bash start.sh
  ADMIN_API_PROXY_TARGET=http://127.0.0.1:8080/api/ bash start.sh
  SQUIRREL_API_PROXY_TARGET=http://127.0.0.1:19090/ bash start.sh
  VITE_API_BASE_URL=https://api.example.com bash start.sh

Optional environment variables:
  APP_NAME              Nginx site name. Default: swan-admin
  APP_DIR               Project directory. Default: current script directory
  WEB_ROOT              Static file target. Default: /var/www/\$APP_NAME
  SERVER_NAME           Nginx server_name. Default: _
  ADMIN_API_PROXY_TARGET
                        Optional /api/ reverse proxy target
  API_PROXY_TARGET      Backward-compatible alias for ADMIN_API_PROXY_TARGET
  SQUIRREL_API_PROXY_TARGET
                        Optional /squirrel-api/ reverse proxy target
  VITE_API_BASE_URL     Frontend production API base URL, consumed by Vite
  VITE_MARKET_API_BASE_URL
                        Frontend market API base URL, consumed by Vite
EOF
}

if [ "${1:-}" = "--" ]; then
  shift
fi

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  print_usage
  exit 0
fi

echo "==> Deploying ${APP_NAME}"
echo "    App dir: ${APP_DIR}"
echo "    Web root: ${WEB_ROOT}"
echo "    Server name: ${SERVER_NAME}"
if [ -n "${ADMIN_API_PROXY_TARGET}" ]; then
  echo "    Admin API proxy: /api/ -> ${ADMIN_API_PROXY_TARGET}"
fi
if [ -n "${SQUIRREL_API_PROXY_TARGET}" ]; then
  echo "    Squirrel API proxy: /squirrel-api/ -> ${SQUIRREL_API_PROXY_TARGET}"
fi

if ! need_command apt-get; then
  echo "This script is intended for Ubuntu/Debian servers with apt-get." >&2
  exit 1
fi

echo "==> Installing system dependencies"
run_as_root apt-get update
run_as_root apt-get install -y nginx curl rsync

if ! need_command node; then
  echo "Node.js is not installed. Install Node.js 22 LTS first:" >&2
  echo "  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -" >&2
  echo "  sudo apt-get install -y nodejs" >&2
  exit 1
fi

if ! need_command pnpm; then
  echo "==> Enabling pnpm with corepack"
  if need_command corepack; then
    run_as_root corepack enable
    corepack prepare pnpm@latest --activate
  else
    echo "corepack is not available. Please install pnpm first:" >&2
    echo "  npm install -g pnpm" >&2
    exit 1
  fi
fi

cd "${APP_DIR}"

if [ -n "${SQUIRREL_API_PROXY_TARGET}" ] && [ -z "${VITE_MARKET_API_BASE_URL:-}" ]; then
  export VITE_MARKET_API_BASE_URL="/squirrel-api"
fi

echo "==> Installing frontend dependencies"
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
else
  pnpm install
fi

echo "==> Building frontend"
pnpm run build

echo "==> Publishing dist to ${WEB_ROOT}"
run_as_root mkdir -p "${WEB_ROOT}"
run_as_root rsync -a --delete "${APP_DIR}/dist/" "${WEB_ROOT}/"

echo "==> Writing Nginx config"
tmp_conf="$(mktemp)"
cat >"${tmp_conf}" <<EOF
server {
    listen 80;
    server_name ${SERVER_NAME};

    root ${WEB_ROOT};
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
EOF

if [ -n "${ADMIN_API_PROXY_TARGET}" ]; then
  cat >>"${tmp_conf}" <<EOF

    location /api/ {
        proxy_pass ${ADMIN_API_PROXY_TARGET};
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
EOF
fi

if [ -n "${SQUIRREL_API_PROXY_TARGET}" ]; then
  cat >>"${tmp_conf}" <<EOF

    location /squirrel-api/ {
        proxy_pass ${SQUIRREL_API_PROXY_TARGET};
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
EOF
fi

cat >>"${tmp_conf}" <<EOF
}
EOF

run_as_root mv "${tmp_conf}" "${NGINX_CONF}"
run_as_root ln -sfn "${NGINX_CONF}" "${NGINX_LINK}"

if [ -e /etc/nginx/sites-enabled/default ]; then
  run_as_root rm -f /etc/nginx/sites-enabled/default
fi

echo "==> Reloading Nginx"
run_as_root nginx -t
run_as_root systemctl enable nginx >/dev/null
run_as_root systemctl reload nginx

echo "==> Done"
echo "Open: http://${SERVER_NAME}"
