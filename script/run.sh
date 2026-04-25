SERVER_NAME=124.221.65.156 \
ADMIN_API_PROXY_TARGET=http://43.167.207.108:18080/api/ \
SQUIRREL_API_PROXY_TARGET=http://43.167.207.108:19090/ \
bash start.sh

cd ~/app/swan-admin

SERVER_NAME="swanadmin.oooorange.space 124.221.65.156" \
ADMIN_API_PROXY_TARGET=http://127.0.0.1:18080/api/ \
SQUIRREL_API_PROXY_TARGET=http://127.0.0.1:19090/ \
bash start.sh
