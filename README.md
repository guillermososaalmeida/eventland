# Eventland

## Descripción

En EventLand nos hemos propuesto solucionar este problema con un página para encontrar aquellos eventos que o no sabías que existían, o cuándo ni dónde eran, centrada en el usuario, que tenga una performance más intuitiva, y poder hacer que cada uno disfrute de lo que más le guste.

¡Anímate y Únete!

## Motivación

La idea de este proyecto surge cuando uno de nuestros compañeros comparte su experiencia con diferentes páginas de eventos y su sensación de que la experiencia en ellas no es del todo satisfactoria. Si bien está acostumbrado a utilizarlas, sentía que les faltaba mejorar en varios aspectos la experiencia de usuario y tras los conocimientos adquiridos en el Bootcamp propuso la idea al grupo creyendo que podríamos hacer una página de eventos mejorada, más funcional y atractiva para los usuarios. El abanico de posibilidades que este tipo de proyecto nos brindaba nos animó a decidirnos por esta idea para el proyecto final.

## Instalaciones

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
- npm i nodemailer

cambiamos en el package json los scripts a:

- start: node index.js
- dev: nodemon index.js

## Configuracion Prettier(extension)

-cambiamos la configuración del prettier del Visual Studio:
en el apartado "Trailing comma" lo cambiamos a "all".
-Para que dejara de salir el error de formato de "Delete `CR`" hemos puesto en el "extends"
del .eslintrc.json lo siguiente: "prettier"

## Configuración nodemailer

Importante, en cuentas de Google, verificación en 2 pasos. Luego ir a Contraseñas de aplicaciones. Escribir "Nodemailer" y ahí te genera una contraseña. Contraseña que debe ir en el .env acompañando al correo.

## 🤝 Contributing

### Clone the repo

```bash
git clone https://github.com/guillermososaalmeida/eventland@latest
cd eventland
```

### Build the project

### Submit a pull request

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.
