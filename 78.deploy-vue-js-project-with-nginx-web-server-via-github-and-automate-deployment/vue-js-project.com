server {
    listen 80;
    listen [::]:80;
    server_name vue-js-project.com www.vue-js-project.com;
    root /var/www/vue-js-project/build;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}