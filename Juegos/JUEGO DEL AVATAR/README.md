# 🔥 La Leyenda de Aang — Juego del Avatar

Un juego de combate por turnos inspirado en *Avatar: La Leyenda de Aang*, donde elegís un personaje y enfrentás a un enemigo aleatorio usando los cuatro elementos: **fuego, agua, tierra y aire**.

---

## 🎮 ¿Cómo se juega?

1. **Elegí tu personaje:** Zuko 🔥, Katara 💧, Aang 🌪️ o Toph 🌱.
2. **Atacá con un elemento** en cada ronda: Fuego, Agua, Tierra o Aire.
3. El enemigo elige su ataque al azar.
4. Cada ronda tiene un resultado: **Ganaste / Perdiste / Empate**.
5. Cada derrota cuesta una vida (empezás con 3).
6. **Gana** quien deje al otro sin vidas primero.
7. Podés **reiniciar** el combate en cualquier momento.

## 🌀 Poderes que se pueden usar
- **Fuego** 🔥: vence a Aire y pierde contra Agua.
- **Agua** 💧: vence a Fuego y pierde contra Tierra.
- **Tierra** 🌱: vence a Agua y pierde contra Aire.
- **Aire** 🌪️: vence a Tierra y pierde contra Fuego.

> El jugador elige un ataque con los botones de combate, y el enemigo selecciona su ataque de forma aleatoria.

### ⚔️ Tabla de ventajas (estilo piedra-papel-tijera)

| Ataque     | Vence a   |
|------------|-----------|
| 💧 Agua    | 🔥 Fuego  |
| 🌱 Tierra  | 💧 Agua   |
| 🌪️ Aire    | 🌱 Tierra |
| 🔥 Fuego   | 🌪️ Aire   |

---

## 📜 Reglamento del juego
1. Elegí tu personaje: Zuko, Katara, Aang o Toph.
2. En cada turno elegí un ataque: Fuego, Agua, Tierra o Aire.
3. El enemigo ataca con un elemento al azar.
4. Si tu ataque vence al del enemigo, él pierde 1 vida.
5. Si el ataque enemigo vence al tuyo, perdés 1 vida.
6. Si hay empate, nadie pierde vida.
7. El juego termina cuando alguno llega a 0 vidas.
8. Si ambos quedan en 0 vidas al mismo tiempo, es un empate final.
9. Podés reiniciar el combate cuando termine o si querés jugar otra vez.

---

## 👥 Equipo

| Rol              | Integrante          |
|------------------|---------------------|
| **Scrum Master + Developer** | Lautaro Martinez    |
| Developer        | Samira Baz          |
| Developer        | Gabriel Maculus     |
| Developer        | Leandro Orozco      |

> Trabajamos en tiempo real usando **VS Code Live Share** y nos coordinamos por **Discord** con metodología SCRUM.

---

## 🗂️ Estructura del proyecto

```
JUEGO DEL AVATAR/
├── avatar.html   → Estructura visual e interfaz del juego
├── avatar.js     → Lógica completa del juego
├── README.md     → Este archivo
└── SCRUM.md      → Documentación de sprints y metodología
```

---

## 📄 Explicación del código

### `avatar.html`

Contiene toda la interfaz del juego dividida en cuatro secciones principales:

| Sección HTML | Qué hace |
|---|---|
| `#seleccionar-personaje` | Muestra las tarjetas con los 4 personajes para elegir |
| `#seleccionar-ataque` | Panel de combate: vidas, nombre de personajes y botones de ataque |
| `#mensajes` | Historial de rondas con el resultado de cada ataque |
| `#reiniciar` | Botón que aparece al terminar el juego |

También incluye todo el **CSS** dentro de un `<style>` con:
- Variables CSS (`:root`) para colores de cada elemento y el fondo oscuro temático.
- Tarjetas de personaje con efecto de selección usando `:has(input:checked)`.
- Botones con gradientes y transiciones animadas.
- Animación `slideIn` para los mensajes de combate.

**Colaboraron:** Lautaro Martinez · Samira Baz · Gabriel Maculus · Leandro Orozco

---

### `avatar.js`

Toda la lógica del juego. Organizado en las siguientes partes:

#### 1. Estado del juego
```js
const jugador = { nombre, emoji, vidas: 3 };
const enemigo = { nombre, emoji, vidas: 3 };
```
Objetos que representan al jugador y al enemigo. Agrupan datos relacionados como primer paso hacia la Programación Orientada a Objetos.

**Colaboraron:** Lautaro Martinez · Leandro Orozco

---

#### 2. Datos de personajes y reglas
```js
const personajes = { zuko, katara, aang, toph };
const ganaA = { agua: 'fuego', tierra: 'agua', aire: 'tierra', fuego: 'aire' };
```
- `personajes`: "diccionario" con nombre y emoji de cada personaje.
- `ganaA`: define qué elemento vence a cuál (la lógica del juego).
- `ataques`: lista de los 4 elementos para el ataque aleatorio del enemigo.

**Colaboraron:** Gabriel Maculus · Samira Baz

---

#### 3. Referencias al DOM
```js
const seccionPersonaje = document.getElementById('seleccionar-personaje');
// ... etc.
```
Se guardan una única vez al inicio para no repetir búsquedas en cada acción. Mejor rendimiento y código más limpio.

**Colaboraron:** Todo el equipo

---

#### 4. Funciones principales

| Función | Qué hace |
|---|---|
| `seleccionarPersonajeJugador()` | Lee el radio seleccionado, asigna el personaje al jugador, elige enemigo aleatorio y muestra el panel de combate |
| `asignarPersonajeAleatorioEnemigo()` | Toma una clave aleatoria del objeto `personajes` y la asigna al enemigo |
| `atacar(ataqueJugador)` | Genera el ataque enemigo, aplica las reglas, descuenta vidas y llama a `mostrarMensaje()` |
| `actualizarVidas()` | Refresca los `<span>` del DOM con los valores actuales de vidas |
| `revisarFinDelJuego()` | Detecta si alguien se quedó sin vidas y llama a `finalizarJuego()` |
| `finalizarJuego(mensaje)` | Muestra mensaje final, deshabilita botones y muestra el botón reiniciar |
| `mostrarMensaje(texto, clase)` | Crea un `<p>` animado y lo inserta arriba del historial de combate |
| `reiniciar()` | Resetea el estado completo y vuelve a la pantalla inicial |

**Colaboraron:** Todo el equipo

---

#### 5. Eventos
```js
document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador);
document.getElementById('boton-fuego').addEventListener('click', () => atacar('fuego'));
// ...etc.
```
Conectan cada botón de la interfaz con su función correspondiente.

**Colaboraron:** Lautaro Martinez · Samira Baz

---

## 🚀 ¿Cómo ejecutarlo?

Abrí `avatar.html` directamente en el navegador o usá la extensión **Live Server** de VS Code.

No requiere instalación ni dependencias externas.

---

## 📋 Metodología

Este proyecto se desarrolló con **SCRUM**. Ver [SCRUM.md](SCRUM.md) para el detalle de sprints, backlog y retrospectiva.
