server {
    listen 80;
    listen [::]:80;
    server_name second-project.com www.second-project.com;
    root /var/www/second-project;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
