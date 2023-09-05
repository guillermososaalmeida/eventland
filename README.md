## proyecto-final-eventos

# Instalaciones

para iniciar el proyecto, empezamos con npm init -y

luego instalamos:

- npm i express
- npm i dotenv
- npm i mongoose
- npm i nodemon -D (dependencia de desarrollo)
- npm i cloudinary multer multer-storage-cloudinary (gestión de archivos multimedia, almacenarlos en una nube)
- npm i -D eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-simple-import-sort pre-commit prettier (control de errores, formateo código)
- npm i cors (CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que permite o niega el acceso a recursos de un dominio a una aplicación en otro dominio. En el contexto de una API en Node.js, CORS es una técnica para controlar qué aplicaciones pueden hacer solicitudes a la API.)
- npm i jsonwebtoken
- npm i bcrypt
- npm i validator

cambiamos en el package json los scripts a:

- start: node index.js
- dev: nodemon index.js

# configuracion prettier(extension)

cambiamos la configuración del prettier del Visual Studio:
en el apartado "Trailing comma" lo cambiamos a "all".

# format eslint antes de commit

- npm run format:fix
