# Instruccones de Instalación del Blog

* Clonar el repositorio con el comando o descargar el zip y descomprimirlo

`git clone https://github.com/richardd82/Blog2024.git`

Existen 2 carpetas una para la api `back-blog` y otra para el frontend `front-blog`, hay que instalar las dependencias dentro de cada carpeta.

* instalar las dependencias con:
`npm install`

# Backend y Base de Datos

Una vez instaladas las dependencias existe en la raíz de la carpeta `back-blog` um archivo example.env el cual contiene las variables de entorno a utilizar, se debe crear un archivo .env con las variables de entorno del archivo de ejemplo.

Posteriormente, dentro de SQL server hay que crear una instancia nueva con el nombre `blog` eligiendo de preferencia collate `SQL_Latin1_General_CP1_CI_AS` para un mejor manejo de caracteres especiales en español latino americano.

De igual forma, en la raíz de la carpeta `back-blog` se encuentra un archivo de nombre `dbo.blogData.sql` el cual contiene regitros que pueden ser insertados en la base de datos ejecutando el contenido como script SQL usando SQL server management studio o el Administrador de bases de datos de su preferencia.

---
Una vez configurada la base de datos, las variables de entorno e instaladas las dependencias, podemos inicializar nuestra api con el comando:

`npm run start`

# Frontend
Una vez que el servidor del backend se esté ejecutando podemos acceder a la carpeta `front-blog`y debemos instalar las dependencias con el comando:
`npm install`. Una vez finalizada la instalación podemos iniciar la aplicación con el comando:

`npm run dev`

y acceder al navegador por medio de la url que nos indique la consola.


Saludos!!

---
Creado por Ricardo Díaz 😎 - Febrero 2024







