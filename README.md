# pruebaTecnicaBack

Repositorio para la API de un sistema de manejo de usuarios

# Instrucciones

Para compilar la API: 

- Primero hay que crear un archivo .env siguiendo el ejemplo que se muestra en el archivo .env.exaple

- Después hay que crear una base de datos en el sistema con el nombre dado en el archivo .env

- Una vez hecho eso se corren los comandos:
    - npm install -> para descargar las dependencias del proyecto
    - npm run db:install -> para crear las tablas e instalar los catálogos
    - npm run db:data-fake -> en caso de querer instalar datos de prueba

- Ahora está todo listo para iniciar el servidor con el comando:
    - npm run dev -> en caso de querer compilarlo en un entorno de desarrollo
    - npm run start -> en caso de que sea un entorno de pruebas o producción
