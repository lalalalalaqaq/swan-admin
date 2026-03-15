apt-get update
apt install -y nginx

cd /var/www/html
sudo mv dist/* dist/.[!.]* dist/..?* . 2>/dev/null

sudo nginx -t
sudo systemctl reload nginx