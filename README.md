# Explorador Rick and Morty

Aplicación web que consulta personajes de [The Rick and Morty API](https://rickandmortyapi.com/documentation) con `fetch()`, permite buscarlos, filtrarlos y guardarlos como favoritos (con `localStorage`).

**Sitio publicado:** https://USUARIO.github.io/proyecto-web-ia/  <!-- reemplazar USUARIO -->

## Alumno que realizo la tarea

| Alumno |
|---|---|
| Julio Jesus Catzin Puc | 

## Funcionalidades

- Interfaz con HTML, CSS y JavaScript.
- Consumo de la API con `fetch()` (personajes con imagen y datos).
- Buscador por nombre.
- Filtros por estado, género y especie.
- Paginación (20 personajes por página).
- Sección de favoritos guardada en `localStorage`.
- Mensajes cuando no hay resultados o falla la consulta.
- Diseño adaptable a celulares y computadoras.
- Reto extra: _(completar: cuál se eligió)_

## Cómo funciona

1. `index.html` define la estructura: controles, lista de resultados y favoritos.
2. `style.css` da estilo y adapta la cuadrícula (1, 2 o 4 columnas según el ancho).
3. `script.js` arma la URL con los parámetros de búsqueda y filtros, llama a la API con `fetch()` y dibuja las tarjetas.
4. Los favoritos se guardan como arreglo JSON en `localStorage`.

---

## Uso de inteligencia artificial

Se utilizó claude pro para la realización del proyecto

### 1. Tres prompts importantes

**Prompt 1:** Actúa como un desarrollador experto en frontend. Estoy realizando un proyecto individual y necesito que me proporciones el código completo y listo para producción (dividido en index.html, style.css y script.js) para un "Explorador interactivo de información" usando la API de Rick and Morty (https://rickandmortyapi.com/api/character).

Requisitos específicos que debe cumplir:
1. HTML limpio, estructurado y semántico.
2. CSS moderno, adaptable (responsive para celulares y computadoras) y con un diseño visual atractivo.
3. JavaScript que utilice fetch() para consumir al menos los primeros 10 personajes de la API y mostrarlos en tarjetas con su imagen, nombre y descripción/especie.
4. Un buscador funcional en tiempo real para filtrar personajes por nombre.
5. Filtros adicionales (por ejemplo, por estatus: Alive, Dead, Unknown).
6. Manejo de estados de error y de "sin resultados" con mensajes visuales claros.

Por favor, entrégame el código de cada archivo por separado de manera clara para poder copiarlo directamente a GitHub.

**Prompt 2:** Ya tengo la base de mi explorador de personajes de Rick and Morty. Ahora necesito que me ayudes a implementar las siguientes mejoras en el código JavaScript y CSS existente:

1. **Sección de favoritos y LocalStorage:** Permite al usuario marcar/desmarcar personajes como favoritos haciendo clic en un botón en cada tarjeta. Guarda estos favoritos en el localStorage del navegador para que persistan al recargar la página, y muestra una sección o pestaña dedicada exclusivamente a ver los favoritos guardados.
2. **Funcionalidad extra (Modo Oscuro/Claro):** Agrega un botón de alternancia (toggle) para cambiar entre modo oscuro y modo claro, guardando también la preferencia en el localStorage.

Proporcióname el código actualizado o las funciones específicas que debo agregar en mi script.js, style.css e index.html, explicando brevemente cómo funcionan para poder justificarlo.

**Prompt 3:** Actúa como un estudiante de desarrollo de software documentando su proyecto final. Necesito que redactes el contenido completo en formato Markdown para el archivo README.md de mi repositorio "proyecto-web-ia". 

El documento debe incluir estrictamente los siguientes apartados requeridos por mi profesor:
1. **Descripción del proyecto:** Breve resumen del explorador interactivo de Rick and Morty.
2. **Tres prompts importantes utilizados durante el desarrollo:** (Redacta tres ejemplos profesionales de prompts que habríamos podido usar).
3. **Respuesta de la IA que requirió correcciones:** Describe un escenario hipotético realista donde la IA cometió un pequeño error (por ejemplo, en la ruta de una propiedad de la API o un selector de CSS) y cómo lo corregiste.
4. **Error encontrado y solución:** Describe un error común (como un fallo en el fetch o en el parseo del localStorage) y explica el paso a paso de cómo lo resolviste.
5. **Modificación realizada al código:** Explicación técnica de la funcionalidad extra agregada (Modo Oscuro / LocalStorage).
6. **Reflexión sobre el aprendizaje:** Un párrafo reflexivo sobre las ventajas y retos de utilizar Inteligencia Artificial como apoyo en el desarrollo web.

### 2. Una respuesta de la IA que requirió correcciones

- Qué respuesta dio la IA:
- Qué estaba mal o incompleto:
- Cómo lo corregimos:

### 3. Un error encontrado y cómo lo resolvimos

- Síntoma (qué se veía mal, mensaje de la consola):
- Causa:
- Solución (enlazar el commit o Issue):

### 4. Una modificación al código que podemos explicar

- Archivo y función modificada:
- Qué cambia y por qué:
- Explicación paso a paso con nuestras palabras:

### 5. Reflexión: qué aprendimos usando IA

_(Un párrafo por integrante o uno del equipo: qué ayudó, qué hubo que verificar, qué haríamos distinto.)_

---

## Reto: funcionalidad extra

- Funcionalidad elegida:
- Cómo funciona (explicación propia):
- Commit / Pull Request relacionado:

## Créditos

Datos: [The Rick and Morty API](https://rickandmortyapi.com).
