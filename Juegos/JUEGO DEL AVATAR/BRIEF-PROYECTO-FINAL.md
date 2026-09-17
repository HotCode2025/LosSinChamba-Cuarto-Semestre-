# Brief del Proyecto Integrador

## Información del Grupo
*   **Nombre del grupo:** [A definir con el equipo — sugerencia: "Los Maestros del Código"]
*   **Integrantes:**
    *   Lautaro Martinez (Scrum Master / Developer)
    *   Samira Baz (Developer)
    *   Gabriel Maculus (Developer)
    *   Leandro Orozco (Developer)

## Propósito del Proyecto
*   **Temática del sistema:** Videojuego de combate por turnos ambientado en *Avatar: La Leyenda de Aang* ("La Leyenda de Aang"). El jugador elige un personaje de un catálogo extensible (piedra-papel-tijera temático: Puño, Patada, Barrida) y pelea contra un enemigo elegido al azar. El catálogo, los movimientos y el reglamento se generan dinámicamente a partir de clases (`Personaje`, `Ataque`, `Juego`), por lo que puede escalar de 4 a 1000+ personajes sin tocar el HTML ni el CSS.
*   **Objetivo principal:** Ofrecerle al jugador una experiencia de combate rápida y rejugable, con progreso propio: puede crear personajes personalizados, ver el historial de sus partidas (victorias, derrotas, racha) persistido entre sesiones, y ampliar el catálogo del juego sin fricción gracias al diseño orientado a objetos.

## Tecnologías a Utilizar
*   **Frontend (Cliente):** HTML5, CSS3 (Flexbox/Grid), JavaScript Vanilla (ES6+, clases y objetos).
*   **Persistencia actual:** `localStorage` del navegador para el historial de partidas del jugador (victorias, derrotas, empates, racha actual y mejor racha).
*   **Backend / Otros (a evaluar este semestre):** de sumar una etapa de backend, la idea natural es un ranking global (Node.js + Express + una base de datos como SQLite/PostgreSQL) que reemplace el `localStorage` por un historial compartido entre jugadores.
*   **Herramientas de trabajo:** Git, GitHub (Organización), VS Code (Live Share), Discord (Daily Standups), Metodología SCRUM.

---
> *Nota: El nombre del grupo y la decisión de sumar backend quedan como los dos puntos abiertos a confirmar con el equipo y el profesor antes de la entrega final. El resto del brief refleja el estado real del proyecto (ver README.md y SCRUM.md para el detalle técnico y de sprints).*
