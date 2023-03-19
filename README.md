# Firebase Orders App

# Aplicación de Órdenes con Firebase

## Descripción

Esta aplicación de órdenes se basa en Firebase, un servicio de plataforma en la nube administrada por Google que proporciona almacenamiento en tiempo real y bases de datos.

La aplicación permite:

- Crear nuevas órdenes con detalles sobre los productos y su cantidad.
- Ver la lista de órdenes completadas y pendientes.

## Instalación

### Paso 1: Clonar el Repositorio

Clonar el repositorio de la aplicación desde el siguiente enlace:

```
https://github.com/user/repo.git
```

### Paso 2: Crear una base de datos Firebase

Para utilizar Firebase con esta aplicación, primero debe crear una base de datos Firebase. Siga las instrucciones del sitio de Firebase para obtener información sobre cómo crear una base de datos Firebase.

### Paso 3: Configuración

Dentro del proyecto clonado, cree un archivo `firebaseConfig.js` en la carpeta `src` y agregue su información de configuración de Firebase:

```javascript
import firebase from "firebase";

const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
};

firebase.initializeApp(config);

export default firebase;
```

### Paso 4: Ejecutar la aplicación

Ejecute el siguiente comando en la línea de comandos para iniciar la aplicación:

```
npm start
```

La aplicación se ejecutará en `localhost:3000` en el navegador predeterminado.

## Uso

Para utilizar la aplicación, siga los siguientes pasos:

1. Crear una nueva orden: Haga clic en el botón "Crear Nueva Orden" e ingrese los detalles de la orden, como el nombre del producto y la cantidad.

2. Ver lista de órdenes: La página principal mostrará una lista de las órdenes creadas con sus detalles y estado actual.

## Contribuyendo

Las solicitudes de extracción son bienvenidas. Para cambios importantes, abra primero un problema para discutir qué le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

Esta aplicación es de código abierto bajo la Licencia MIT. Sientase libre de usar y amoldarla a sus necesidades!
