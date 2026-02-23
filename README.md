# Módulo 1: Fundamentos de Programación en Java

Guía interactiva de aprendizaje que cubre los fundamentos de programación en Java. Es una Single Page Application (SPA) que funciona directamente en el navegador, sin necesidad de servidor ni instalación.

## Estructura del proyecto

```
modulo1/
├── index.html          # Página principal y todo el contenido
├── css/
│   └── styless.css     # Estilos, tema claro/oscuro, responsive
├── js/
│   └── main.js         # Lógica interactiva y funcionalidades
└── img/
    ├── imagen_variable.svg
    └── palabras_reservadas.svg
```

## Contenido

El módulo cubre 9 temas organizados en el menú lateral:

| # | Tema | Descripción |
|---|------|-------------|
| 1 | ¿Qué es Java? | JDK, JVM, JRE y el ecosistema Java |
| 2 | Fundamentos | Ciclo de vida de un programa, "Hola Mundo" |
| 3 | Tipos de Datos | Primitivos, Wrappers y tipos de referencia |
| 4 | Variables | Declaración, palabras reservadas, mapa mental |
| 5 | Operadores | Aritméticos, asignación compuesta, relacionales, lógicos |
| 6 | Condicionales | if-else, switch y operador ternario |
| 7 | Bucles | while, do-while, for y for-each |
| 8 | Arrays | Declaración, recorrido y casos de uso |
| 9 | Ejercicios | Práctica por tema + narrativas de negocio |

## Funcionalidades interactivas

- **Buscador en tiempo real** — filtra y resalta coincidencias en todo el contenido (ESC para limpiar)
- **Progreso por tema** — checkboxes en el menú lateral con barra de progreso persistente en `localStorage`
- **Ejercicios interactivos** — checkboxes por ejercicio con contador por sección, también persistente
- **Editor de código** — botón "▶ Probar" abre el código en un modal con enlace directo a JDoodle
- **Copiar código** — botón en cada bloque para copiar el ejemplo al portapapeles
- **Navegación por teclado** — flechas ← → cambian de tema con notificación toast
- **Tiempo de lectura** — badge con estimación en minutos en cada sección
- **Modo oscuro / claro** — toggle persistente, con transición suave
- **Tooltips de glosario** — términos técnicos con definición al pasar el cursor (Tippy.js)
- **Animaciones** — fade-in al entrar a cada sección, scroll suave al cambiar de tema

## Tecnologías

| Librería | Uso |
|----------|-----|
| [Prism.js 1.29](https://prismjs.com/) | Resaltado de sintaxis Java |
| [Tippy.js 6](https://atomiks.github.io/tippyjs/) | Tooltips del glosario |
| [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) | Tipografía principal |
| localStorage | Persistencia de progreso y preferencias |

## Uso

Abre `index.html` directamente en cualquier navegador moderno. No requiere servidor, build ni dependencias locales; todas las librerías se cargan desde CDN.

```
# Opción simple: doble clic en index.html
# Opción con Live Server (VS Code): clic derecho → "Open with Live Server"
```

## Compatibilidad

Funciona en Chrome, Firefox, Edge y Safari modernos. El diseño es responsive y se adapta a pantallas móviles con menú hamburguesa.
