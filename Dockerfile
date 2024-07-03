# Usa la imagen de Nginx como base
FROM nginx:alpine

# Elimina el archivo de configuración predeterminado de Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Crear un archivo de configuración de Nginx predeterminado
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copia los archivos del sitio web al directorio de Nginx
COPY . /usr/share/nginx/html

# Puerto en el que escucha Nginx
EXPOSE 80

# Comando para iniciar Nginx cuando se inicie el contenedor
CMD ["nginx", "-g", "daemon off;"]
