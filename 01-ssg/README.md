# Static Site Generation (SSG) con React puro

## La idea

Static Site Generation significa renderizar tus componentes de React a HTML **una sola vez, de antemano** (en tiempo de build), en lugar de renderizarlos en cada request (SSR) o en el navegador (CSR/SPA).

El resultado son simplemente archivos `.html` planos. No se necesita servidor ni runtime de JS del lado del cliente para ver la página. Eso lo hace ideal para contenido que no cambia por request y que no necesita mucha interactividad — blogs, documentación, páginas de marketing, material de cursos.

Esta carpeta demuestra esa idea con la configuración más simple posible: sin bundler, sin JSX, sin framework — solo `react-dom/server` y tres archivos.

## Los archivos, y qué hace cada uno

### `App.js` — el componente

```js
import { createElement as h } from "react";

function App() {
  return h(
    "div",
    null,
    h("h1", null, "Hello world"),
    h("p", null, "This is SSG"),
  );
}

export default App;
```

Este es un componente normal de React. Lo único inusual es `createElement` (con el alias `h`) en lugar de JSX. `h("h1", null, "Hello world")` es exactamente a lo que se compila `<h1>Hello world</h1>` — JSX no es más que una abstracción sobre `createElement`. Dejo de lado JSX por ahora para hacerlo mas simple y no configurar Babel/Vite/webpack.

### `index.html` — la shell

```html
<!doctype html>
<html lang="en">
  <head>
    <title>React SSG</title>
  </head>
  <body>
    <div id="root"><!--ROOT--></div>
  </body>
</html>
```

Esta es la plantilla de la página. `<!--ROOT-->` es una wildcard que vamos a reemplazar luego por nuestra App renderizada. Podriamos hacerlo solo reemplazando el `<div id="root"></div>`, pero puede crear conflictos si existen dos nodos con el mismo id.

### `build.js` — el generador

Acá es donde la magia empieza:


```javascript
// dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = path.join(__dirname, "dist");

const shell = readFileSync(path.join(__dirname, "index.html"), "utf8");
const app = renderToStaticMarkup(h(App));

const html = shell.replace("<!--ROOT-->", app);

if (!existsSync(distPath)) {
  mkdirSync(distPath);
} else {
  const files = readdirSync(distPath);
  for (const file of files) {
    unlinkSync(path.join(distPath, file));
  }
}

writeFileSync(path.join(distPath, "index.html"), html);
```


1. **Resolver rutas.** `import.meta.url` → `fileURLToPath` → `dirname` recrea `__dirname`, que no está disponible por defecto en los módulos ES (esa es la única razón por la que existen esos dos imports).
2. **Leer la shell.** `readFileSync(index.html)` carga la plantilla HTML como string.
3. **Renderizar el componente a string.** `renderToStaticMarkup(h(App))` Renderizamos nuestra React App a un string compatible con HTML
4. **Unir todo.** `shell.replace("<!--ROOT-->", app)` reemplazamos nuestra App renderizada por la wildcard que definimos anteriormente en el archivo HTML.
5. **Reiniciar el directorio de salida.** Si `dist/` no existe, se crea. Si ya existe, primero se borra todo lo que hay dentro, esto garantiza que cada build arranque desde cero y nunca queden archivos viejos de un build anterior.
6. **Escribir el resultado.** `dist/index.html` es la página estática final, completamente formada. Es la que se va a enviar al browser cada vez que un usuario haga un GET a nuestro servidor.

Se ejecuta con:

```
node build.js
```

## `renderToStaticMarkup` vs `renderToString`

Ambos convierten un árbol de React en un string HTML, pero:

- `renderToString` agrega marcadores/atributos extra (como `data-reactroot` en versiones antiguas, o marcadores de comentario internos) para que React del lado del cliente pueda luego **hidratar** ese markup — es decir, agregar los event listeners y tomar control del DOM sin volver a renderizarlo, convirtiendo el HTML estático de nuevo en una app interactiva de React. Esto es lo que usa SSR.
- `renderToStaticMarkup` renderiza el mismo HTML pero **sin** esas pistas de hidratación, porque nunca se va a hidratar. Pesa un poco menos y comunica la intención: este HTML es el producto final, no un primer pintado a la espera de que una app del lado del cliente lo tome.

Esa distinción — SSG (renderizar una vez, entregar HTML plano, nunca hidratar) vs SSR (renderizar por request y luego hidratar en el cliente) — es la línea conceptual principal que este ejemplo quiere marcar.

## Qué se omitio por simplicidad

- **Sin CSS ni bundling de JS.** Nada impide escribir tags `<link>`/`<script>` en `index.html` o generarlos desde `build.js` — simplemente no hace falta para demostrar el concepto.
- **Sin hidratación / interactividad.** Se podría ańadir pequeños puntos de interactividad (un contador, un toggle), para eso hay que enviar un bundle de JS separado con el runtime de React y llamar a una función de hidratación sobre nodos específicos.
- **Solo una página.** `build.js` renderiza `App` una sola vez. Generar un sitio completo (muchas rutas) solo significa repetir ese mismo proceso de leer → renderizar → reemplazar → escribir sobre una lista de rutas/componentes. Por ejemplo, un `routes.js` que mapea una ruta de URL a un componente, con `build.js` iterando sobre esa lista y escribiendo cada resultado en `dist/<ruta>/index.html`.

## Por qué no construirías esto tú mismo en la práctica

La lección completa de esta carpeta es: **SSG no es magia — es `renderToStaticMarkup` más algo de I/O de archivos.** Frameworks como **Astro** o **Next.js (modo export)** hacen esta misma operación central, pero envuelta en muchísimas herramientas valiosas de experiencia de desarrollo: routing basado en archivos, soporte de Markdown/MDX, pipelines de assets, ayudas de SEO, builds incrementales, servidores de desarrollo con hot reload, etc.
