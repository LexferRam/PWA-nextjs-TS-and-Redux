
## Comando usado para crear el proyecto (PWA con NextJS con TypeScript y Redux Thunk) :smiley: :+1:

yarn create next-app . --typescript

## Configuracion de PWA en una app de NextJS

1. Instalar npm install next-pwa
2. Generar manifest.json en : [simicart.com](https://www.simicart.com/manifest-generator.html/)(PWA Manifest generator)
3. extraer el zip generado por la pg web y colocar los archivos generados en la carpeta public del proyecto
4. cambiar manifest.webmanifest por manifest.json
5. en la carpeta pages crear un archivo llamado: _document.js que envuelve a todas las pgs de la app y colocar el sig codigp:

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/icon.png" />
                    <meta name="theme-color" content="#fff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
```

6. en el archivo de configuracion "next.config.js" colocar la sig configuracion:

```javascript
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa:{
    dest:"public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})
```


7. ejecutar : npm run build y luego npm start

---
## Notas tomadas del repositorio de NEXTJS con Redux Thunk 

[https://github.com/vercel/next.js/tree/canary/examples/with-redux-thunk](https://github.com/vercel/next.js/tree/canary/examples/with-redux-thunk)

### Instalar las siguientes dependencias de Redux

yarn add redux react-redux redux-thunk redux-devtools-extension


#### Notes
The Redux Provider is implemented in pages/_app.js. The MyApp component is wrapped in a withReduxStore function, the redux store will be initialized in the function and then passed down to MyApp as this.props.initialReduxState, which will then be utilized by the Provider component.

Every initial server-side request will utilize a new store. However, every Router or Link action will persist the same store as a user navigates through the pages. To demonstrate this example, we can navigate back and forth to /show-redux-state using the provided Links. However, if we navigate directly to /show-redux-state (or refresh the page), this will cause a server-side render, which will then utilize a new store.

In the clock component, we are going to display a digital clock that updates every second. The first render is happening on the server and then the browser will take over. To illustrate this, the server rendered clock will initially have a black background; then, once the component has been mounted in the browser, it changes from black to a grey background.

In the counter component, we are going to display a user-interactive counter that can be increased or decreased when the provided buttons are pressed.

This example includes two different ways to access the store or to dispatch actions:

1 pages/index.js will utilize connect from react-redux to dispatch the startClock redux action once the component has been mounted in the browser.

2 components/counter.js and components/examples.js have access to the redux store using useSelector and can dispatch actions using useDispatch from react-redux@^7.1.0

You can either use the connect function to access redux state and/or dispatch actions or use the hook variations: useSelector and useDispatch. It's up to you.

This example also includes hot-reloading when one of the reducers has changed. However, there is one caveat with this implementation: If you're using the Redux DevTools browser extension, then all previously recorded actions will be recreated when a reducer has changed (in other words, if you increment the counter by 1 using the +1 button, and then change the increment action to add 10 in the reducer, Redux DevTools will playback all actions and adjust the counter state by 10 to reflect the reducer change). Therefore, to avoid this issue, the store has been set up to reset back initial state upon a reducer change. If you wish to persist redux state regardless (or you don't have the extension installed), then in store.js change (line 19) store.replaceReducer(createNextReducer(initialState)) to store.replaceReducer(createNextReducer).

### Agregar configuracion para mejorar los imports

1. dentro del objeto de compilerOptions:
```javascript
		//mejora las importaciones
		// instalar el plugin tsconfig-paths-webpack-plugin
		//yarn add --dev tsconfig-paths-webpack-plugin
		"baseUrl": ".", // Aquí
		"paths": { // Aquí
		//   "@helpers/*": ["helpers/*"],
		  "@components/*": ["components/*"],
		//   ... 
		},
```

2. En next.config,js agregar:

instalar : npm install tsconfig-paths-webpack-plugin

```javascript
webpack: config => {
    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }

    config.resolve.plugins.push(new TsconfigPathsPlugin());

    return config;
  },
  reactStrictMode: true,
```