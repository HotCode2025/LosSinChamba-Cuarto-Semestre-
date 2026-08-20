// ======================================================
//  LA LEYENDA DE AANG - LÓGICA DEL JUEGO
// ======================================================
//
//  EQUIPO SCRUM
//  ─────────────────────────────────────────────────────
//  Scrum Master + Developer : Lautaro Martinez
//  Developers   : Samira Baz | Gabriel Maculus | Leandro Orozco
//
//  Metodología  : SCRUM (sprints + daily standup en Discord)
//  Colaboración : VS Code Live Share
//  Ver detalle  : SCRUM.md
// ======================================================

// ====== ESTADO DEL JUEGO ======  [Lautaro Martinez + Leandro Orozco]
// Usamos objetos para representar al jugador y al enemigo.
// Es un primer paso hacia la POO: agrupamos datos relacionados.
const jugador = {
    nombre: '',
    emoji: '',
    vidas: 3
};

const enemigo = {
    nombre: '',
    emoji: '',
    vidas: 3
};

// "Diccionario" de personajes: la clave es el id del input radio.
const personajes = {
    zuko:   { nombre: 'Zuko',   emoji: '🔥' },
    katara: { nombre: 'Katara', emoji: '💧' },
    aang:   { nombre: 'Aang',   emoji: '🌪️' },
    toph:   { nombre: 'Toph',   emoji: '🌱' }
};

// ====== REGLAS Y DATOS DE ATAQUE ======  [Gabriel Maculus + Samira Baz]
// Lista de ataques posibles (para elegir uno al azar para el enemigo).
const ataques = ['fuego', 'agua', 'tierra', 'aire'];

// Regla del juego (estilo piedra-papel-tijera con 4 elementos):
//   agua   vence a   fuego
//   tierra vence a   agua
//   aire   vence a   tierra
//   fuego  vence a   aire
// Si "ganaA[miAtaque] === ataqueEnemigo" → gano yo.
const ganaA = {
    agua:   'fuego',
    tierra: 'agua',
    aire:   'tierra',
    fuego:  'aire'
};

const emojiAtaque = {
    fuego:  '🔥',
    agua:   '💧',
    tierra: '🌱',
    aire:   '🌪️'
};

// ====== REFERENCIAS AL DOM ======  [Todo el equipo]
// Las guardamos una sola vez al inicio para no buscarlas en cada acción.
const seccionPersonaje  = document.getElementById('seleccionar-personaje');
const seccionAtaque     = document.getElementById('seleccionar-ataque');
const seccionMensajes   = document.getElementById('mensajes');
const seccionReiniciar  = document.getElementById('reiniciar');
const contenedorMensajes = document.getElementById('contenedor-mensajes');
const spanVidasJugador  = document.getElementById('vidas-jugador');
const spanVidasEnemigo  = document.getElementById('vidas-enemigo');
const spanNombreJugador = document.getElementById('nombre-jugador');
const spanNombreEnemigo = document.getElementById('nombre-enemigo');
const contenedorEnemigo = document.getElementById('contenedor-enemigo');

// ====== FUNCIONES ======  [Todo el equipo — colaboración en Live Share]

/**
 * Se ejecuta al apretar "Seleccionar".
 * Lee el radio elegido, asigna personajes, y arranca el combate.
 */
function seleccionarPersonajeJugador() {
    // querySelector con :checked nos da directo el radio seleccionado
    // (más limpio que ir chequeando uno por uno con if/else).
    const inputElegido = document.querySelector('input[name="personaje"]:checked');

    if (!inputElegido) {
        mostrarMensaje('⚠️ Por favor, elegí un personaje primero.', 'tie');
        return;
    }

    // Asignamos los datos del personaje al objeto jugador.
    const datos = personajes[inputElegido.id];
    jugador.nombre = datos.nombre;
    jugador.emoji  = datos.emoji;

    // El enemigo se elige al azar.
    aleatoria();

    // Actualizamos los nombres visibles en el panel de combate.
    spanNombreJugador.textContent = `${jugador.emoji} ${jugador.nombre}`;
    spanNombreEnemigo.textContent = `${enemigo.emoji} ${enemigo.nombre}`;

    // Mostramos las secciones de combate y ocultamos la de elegir personaje.
    seccionPersonaje.classList.add('oculto');
    seccionAtaque.classList.remove('oculto');
    seccionMensajes.classList.remove('oculto');

    mostrarMensaje(
        `Sos ${jugador.nombre} ${jugador.emoji} — el enemigo es ${enemigo.nombre} ${enemigo.emoji}. ¡Que empiece el combate!`
    );
}

/**
 * Elige una clave aleatoria del objeto "personajes"
 * y la asigna al enemigo, mostrándolo con innerHTML.
 */
function aleatoria() {
    const claves = Object.keys(personajes);                       // ['zuko', 'katara', 'aang', 'toph']
    const aleatoriaId = claves[Math.floor(Math.random() * claves.length)];
    const datos = personajes[aleatoriaId];
    enemigo.nombre = datos.nombre;
    enemigo.emoji  = datos.emoji;

    // Agregamos el enemigo con innerHTML
    contenedorEnemigo.innerHTML = `
        <div class="enemigo-card">
            <span class="emoji">${enemigo.emoji}</span>
            <span class="nombre">${enemigo.nombre}</span>
        </div>
    `;
}

/**
 * Se ejecuta cuando el jugador apreta un botón de ataque.
 * @param {string} ataqueJugador - 'fuego' | 'agua' | 'tierra' | 'aire'
 */
function atacar(ataqueJugador) {
    // El enemigo elige al azar.
    const ataqueEnemigo = ataques[Math.floor(Math.random() * ataques.length)];

    let resultado;
    let claseMensaje;

    if (ataqueJugador === ataqueEnemigo) {
        resultado = 'EMPATE';
        claseMensaje = 'tie';
    } else if (ganaA[ataqueJugador] === ataqueEnemigo) {
        resultado = 'GANASTE';
        claseMensaje = 'win';
        enemigo.vidas--;
    } else {
        resultado = 'PERDISTE';
        claseMensaje = 'lose';
        jugador.vidas--;
    }

    actualizarVidas();

    mostrarMensaje(
        `${jugador.nombre} usó ${emojiAtaque[ataqueJugador]} ${ataqueJugador.toUpperCase()} ` +
        `vs ${enemigo.nombre} con ${emojiAtaque[ataqueEnemigo]} ${ataqueEnemigo.toUpperCase()} — ${resultado}`,
        claseMensaje
    );

    revisarFinDelJuego();
}

/**
 * Refresca los spans con las vidas actuales.
 */
function actualizarVidas() {
    spanVidasJugador.textContent = jugador.vidas;
    spanVidasEnemigo.textContent = enemigo.vidas;
}

/**
 * Verifica si alguien se quedó sin vidas.
 */
function revisarFinDelJuego() {
    if (jugador.vidas <= 0 && enemigo.vidas <= 0) {
        finalizarJuego('🤝 Empate final: ambos cayeron al mismo tiempo.');
    } else if (jugador.vidas <= 0) {
        finalizarJuego(`💀 ${enemigo.nombre} te derrotó. ¡Perdiste!`);
    } else if (enemigo.vidas <= 0) {
        finalizarJuego(`🏆 ¡Venciste a ${enemigo.nombre}! Sos el Avatar.`);
    }
}

/**
 * Muestra el mensaje final, desactiva los ataques y muestra "Reiniciar".
 */
function finalizarJuego(mensaje) {
    mostrarMensaje(mensaje, 'final');
    document.querySelectorAll('#seleccionar-ataque button').forEach(btn => {
        btn.disabled = true;
    });
    seccionReiniciar.classList.remove('oculto');
}

/**
 * Crea un <p> nuevo y lo agrega arriba del todo en la lista de mensajes.
 * @param {string} texto
 * @param {string} [clase] - 'win' | 'lose' | 'tie' | 'final' (opcional)
 */
function mostrarMensaje(texto, clase) {
    const p = document.createElement('p');
    p.textContent = texto;
    if (clase) p.classList.add(clase);
    contenedorMensajes.prepend(p); // El más reciente queda arriba
}

/**
 * Resetea todo y vuelve a la pantalla inicial.
 */
function reiniciar() {
    // Reseteamos el estado.
    jugador.nombre = ''; jugador.emoji = ''; jugador.vidas = 3;
    enemigo.nombre = ''; enemigo.emoji = ''; enemigo.vidas = 3;

    // Limpiamos UI.
    contenedorMensajes.innerHTML = '';
    contenedorEnemigo.innerHTML = '';
    actualizarVidas();
    document.querySelectorAll('input[name="personaje"]').forEach(i => i.checked = false);
    document.querySelectorAll('#seleccionar-ataque button').forEach(btn => btn.disabled = false);

    // Mostramos solo la selección de personaje.
    seccionPersonaje.classList.remove('oculto');
    seccionAtaque.classList.add('oculto');
    seccionMensajes.classList.add('oculto');
    seccionReiniciar.classList.add('oculto');
}

// ====== EVENTOS ======  [Lautaro Martinez + Samira Baz]
document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador);

// REQUERIMIENTO: Aplicar DRY (Don't Repeat Yourself) y reutilizar variable global "ataques"
ataques.forEach(ataque => {
    document.getElementById(`boton-${ataque}`).addEventListener('click', () => atacar(ataque));
});

document.getElementById('boton-reiniciar').addEventListener('click', reiniciar);
