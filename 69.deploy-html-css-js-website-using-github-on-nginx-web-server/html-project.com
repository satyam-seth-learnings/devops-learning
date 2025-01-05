server {
    listen 80;
    listen [::]:80;
    server_name html-project.com www.html-project.com;
    root /var/www/html-project;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
