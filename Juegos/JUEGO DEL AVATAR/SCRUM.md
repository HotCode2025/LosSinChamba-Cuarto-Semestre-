# 🔥 LA LEYENDA DE AANG — METODOLOGÍA SCRUM

## Equipo de Desarrollo

| Rol                    | Integrante          |
|------------------------|---------------------|
| **Scrum Master + Developer** | Lautaro Martinez   |
| Developer              | Samira Baz         |
| Developer              | Gabriel Maculus    |
| Developer              | Leandro Orozco     |

---

## Herramientas de Trabajo

| Herramienta   | Uso                                                    |
|---------------|--------------------------------------------------------|
| **VS Code Live Share** | Colaboración en tiempo real sobre el mismo código |
| **Discord**   | Canal de voz/texto para comunicación diaria del equipo |

---

## ¿Qué es SCRUM?

SCRUM es un marco ágil que organiza el trabajo en **sprints** (ciclos cortos), con reuniones diarias (*daily standups*) y roles definidos. El objetivo es entregar incrementos funcionales del producto en cada sprint.

---

## Sprint 1 — Fundación del Proyecto

**Objetivo:** Definir estructura base del juego, personajes y mecánica piedra-papel-tijera con 4 elementos.

### Backlog del Sprint

| # | Historia de Usuario | Responsable | Estado |
|---|---------------------|-------------|--------|
| 1 | Como jugador quiero elegir un personaje (Zuko, Katara, Aang, Toph) | Todo el equipo | ✅ Completado |
| 2 | Como jugador quiero atacar con fuego, agua, tierra o aire | Todo el equipo | ✅ Completado |
| 3 | Como jugador quiero ver el resultado de cada ronda | Todo el equipo | ✅ Completado |
| 4 | Como jugador quiero ver cuántas vidas me quedan | Todo el equipo | ✅ Completado |
| 5 | Como jugador quiero que el enemigo sea aleatorio | Todo el equipo | ✅ Completado |
| 6 | Como jugador quiero poder reiniciar el juego | Todo el equipo | ✅ Completado |

---

## Sprint 2 — Diseño Visual y UX

**Objetivo:** Aplicar diseño épico temático de Avatar con animaciones, tipografías y fondo dinámico.

### Backlog del Sprint

| # | Historia de Usuario | Responsable | Estado |
|---|---------------------|-------------|--------|
| 7 | Como jugador quiero una interfaz visual atractiva temática de Avatar | Todo el equipo | ✅ Completado |
| 8 | Como jugador quiero que los botones de ataque tengan colores del elemento | Todo el equipo | ✅ Completado |
| 9 | Como jugador quiero ver los mensajes de combate animados | Todo el equipo | ✅ Completado |
| 10 | Como jugador quiero tarjetas visuales para seleccionar personaje | Todo el equipo | ✅ Completado |

---

## División del Trabajo por Secciones

Todos los integrantes colaboraron en partes iguales a lo largo de ambos sprints mediante **VS Code Live Share**. Las secciones del proyecto y sus responsables conjuntos:

### `avatar.html`
- **Estructura HTML / semántica:** Lautaro Martinez, Samira Baz
- **Secciones de personajes y ataques:** Gabriel Maculus, Leandro Orozco
- **Panel de vidas y mensajes:** Todo el equipo

### `avatar.css` (estilos en `<style>`)
- **Variables CSS y tema visual:** Lautaro Martinez, Gabriel Maculus
- **Tarjetas de personaje y botones:** Samira Baz, Leandro Orozco
- **Animaciones y scrollbar:** Todo el equipo

### `avatar.js`
- **Estado del juego (jugador/enemigo):** Lautaro Martinez, Leandro Orozco
- **Lógica de combate y reglas:** Gabriel Maculus, Samira Baz
- **Manipulación del DOM / eventos:** Todo el equipo

---

## Daily Standup (modelo usado)

Cada sesión de trabajo comenzaba con una breve reunión en **Discord** respondiendo:

1. ¿Qué hice la última sesión?
2. ¿Qué voy a hacer hoy?
3. ¿Tengo algún bloqueo?

El **Scrum Master (Lautaro)** coordinaba la reunión y resolvía impedimentos técnicos.

---

## Definición de "Terminado" (Definition of Done)

Una historia se considera terminada cuando:
- [ ] El código funciona sin errores en el navegador
- [ ] Fue revisado por al menos otro integrante del equipo en Live Share
- [ ] La funcionalidad es visible y usable en la interfaz

---

## Retrospectiva Final

| ¿Qué salió bien? | ¿Qué mejoraríamos? |
|---|---|
| Comunicación fluida por Discord | Planificar los sprints con más detalle al inicio |
| Live Share permitió trabajar en tiempo real | Definir roles más específicos por tarea |
| Diseño visual coherente y temático | Agregar más personajes y ataques |
| Mecánica de juego funcional y completa | Incorporar sistema de puntuación persistente |
