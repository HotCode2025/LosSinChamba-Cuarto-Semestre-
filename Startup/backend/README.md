# Refugio MVP – Los Sin Chamba (UTN FRSR)

Sistema de gestión para refugios de animales: registro de animales, historial sanitario,
control de insumos y panel con avisos. Backend en Node.js + SQLite, **sin instalar paquetes**.

## Cómo correrlo (3 pasos)
1. Instalar Node.js 22.5 o superior (https://nodejs.org). Verificar con `node -v`.
2. Abrir una terminal en esta carpeta.
3. Ejecutar `npm start` y abrir http://localhost:3000

La primera vez se crea `db/refugio.db` con los datos de ejemplo.
Para volver a los datos de ejemplo: cerrar el servidor, borrar `db/refugio.db` y ejecutar `npm start`.

## Estructura
- `server.js` – servidor y API REST (con validaciones)
- `db/schema.sql` – tablas, triggers y vistas · `db/seed.sql` – datos de ejemplo (ficticios)
- `public/index.html` – interfaz (conectada a la API)

## API
| Recurso | Métodos |
|---|---|
| `/api/animales`, `/api/sanitarios`, `/api/stock` | GET, POST · PUT y DELETE en `/:id` |
| `/api/panel` | GET: resumen, insumos bajo stock y tratamientos pendientes |

Los animales e insumos se dan de baja de forma lógica (`activo = 0`); no se pierde el historial.
