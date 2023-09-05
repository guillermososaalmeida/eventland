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

cambiamos en el package json los scripts a:

- start: node index.js
- dev: nodemon index.js
