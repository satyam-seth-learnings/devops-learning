server {
    listen 80;
    listen [::]:80;

    server_name django-project.com www.django-project.com;

    location = /favicon.ico { access_log off; log_not_found off; }

    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://unix:/run/django-project.com.gunicorn.sock;
    }

    location  /static/ {
        root /var/www/django-project;
    }

    location  /media/ {
        root /var/www/django-project;
    }
}
