server {
    listen 80;
    listen [::]:80;
    server_name react-js-project.com www.react-js-project.com;
    root /var/www/react-js-project/portfolio;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}