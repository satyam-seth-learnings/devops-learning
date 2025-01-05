server {
    listen 80;
    listen [::]:80;
    server_name first-project.com www.first-project.com;
    root /var/www/first-project;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
