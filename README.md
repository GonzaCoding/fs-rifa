## TO-DO:

- Estandarizar componentes y CSS de todas las páginas
- Integración con Marketplace de Mercadopago
- Login con Google
- Login con Twitter
- Página de "Mis Rifas"
- Agregar ícono de NavBar <br />
- Agregar favicon <br />


## Variables de entorno e inicialización

Para poder inicializar el proyecto se deben establecer las siguientes variables de entorno (archivo .env en la raiz del proyecto), pertenecientes a un proyecto de Firebase:<br />

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```
Además, se debe configurar la Autenticación del proyecto de Firebase para que admita registrarse utilizando **Email**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
