## TO-DO:

- Implementar variables de entorno
- Eliminar/Cambiar todos los emojis
- Agregar ícono de NavBar <br />
- Agregar favicon <br />
- Estandarizar componentes y CSS de todas las páginas
- Integración con Marketplace de Mercadopago
- Login con Google
- Login con Twitter
- Página de "Mis Rifas"


## Variables de entorno e inicialización

Para poder inicializar el proyecto se deben establecer las siguientes variables de entorno (archivo .env en la raiz del proyecto), pertenecientes a un proyecto de Firebase:<br />

```
REACT_APP_FIREBASE_API_KEY=AIzaSyCLxAdhKE_-MGU1274xVEhRBg8U8tXlz40
REACT_APP_FIREBASE_AUTH_DOMAIN=fs-rifa.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://fs-rifa.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=fs-rifa
REACT_APP_FIREBASE_STORAGE_BUCKET=fs-rifa.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1024562608922
REACT_APP_FIREBASE_APP_ID=1:1024562608922:web:6bc1ea4e2987d8c92d0aa3
REACT_APP_FIREBASE_MEASUREMENT_ID=G-3VQPW5HZDB
```
Además, se debe configurar la Autenticación del proyecto de Firebase para que admita registrarse utilizando **Email**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
