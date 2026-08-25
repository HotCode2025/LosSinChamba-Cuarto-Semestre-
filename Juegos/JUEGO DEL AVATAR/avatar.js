// --- LA LEYENDA DE AANG - LÓGICA DEL JUEGO ---
// Equipo: Lautaro (SM + Dev), Samira, Gabriel, Leandro
// SCRUM con dailies en Discord + Live Share. Detalle en SCRUM.md

// --- VARIABLES GLOBALES PARA DRY ---
// Jugador y enemigo, cada uno con su data
const jugador = {
    id: '',
    nombre: '',
    emoji: '',
    vidas: 3
};

const enemigo = {
    id: '',
    nombre: '',
    emoji: '',
    vidas: 3
};

// Personajes disponibles, la key es el id del radio (y el nombre del archivo en /img)
const personajes = {
    aang:   { nombre: 'Aang',   emoji: '🌪️' },
    katara: { nombre: 'Katara', emoji: '💧' },
    sokka:  { nombre: 'Sokka',  emoji: '🪃' },
    haru:   { nombre: 'Haru',   emoji: '🪨' }
};

// Ruta de la imagen de cada personaje: img/<id>.webp
const rutaImagen = id => `./img/${id}.webp`;

// --- REGLAS Y DATOS DE COMBATE ---
const movimientos = ['puno', 'patada', 'barrida'];

// Piedra-papel-tijera con 3 movimientos: puño>barrida, patada>puño, barrida>patada
const ganaA = {
    puno:    'barrida',
    patada:  'puno',
    barrida: 'patada'
};

const emojiMovimiento = {
    puno:    '👊',
    patada:  '🦵',
    barrida: '🌀'
};

const nombreMovimiento = {
    puno:    'Puño',
    patada:  'Patada',
    barrida: 'Barrida'
};

// --- VARIABLES GLOBALES PARA DRY (referencias al DOM) ---
// Las guardamos una sola vez al arrancar, así no repetimos getElementById
const seccionPersonaje  = document.getElementById('seleccionar-personaje');
const seccionAtaque     = document.getElementById('seleccionar-ataque');
const seccionMensajes   = document.getElementById('mensajes');
const seccionReiniciar  = document.getElementById('reiniciar');
const contenedorMensajes = document.getElementById('contenedor-mensajes');
const spanVidasJugador  = document.getElementById('vidas-jugador');
const spanVidasEnemigo  = document.getElementById('vidas-enemigo');
const spanNombreJugador = document.getElementById('nombre-jugador');
const spanNombreEnemigo = document.getElementById('nombre-enemigo');
const spanEmojiJugador  = document.getElementById('emoji-jugador');
const spanEmojiEnemigo  = document.getElementById('emoji-enemigo');
const imgJugador        = document.getElementById('img-jugador');
const imgEnemigo        = document.getElementById('img-enemigo');
const barraJugador      = document.getElementById('barra-jugador');
const barraEnemigo      = document.getElementById('barra-enemigo');
const modalReglas       = document.getElementById('modal-reglas');

const VIDAS_MAX = 3;

// --- FUNCIONES ---

// Muestra la foto de un personaje; si la imagen no carga, el listener de
// error (al final del archivo) muestra el emoji de respaldo automáticamente
function mostrarAvatar(imgEl, fallbackEl, id, datos) {
    fallbackEl.textContent = datos.emoji;
    imgEl.alt = datos.nombre;
    imgEl.classList.remove('oculto');
    fallbackEl.classList.add('oculto');
    imgEl.src = rutaImagen(id);
}

// Toma el personaje elegido, arma el combate y muestra la pantalla de pelea
function seleccionarPersonajeJugador() {
    const inputElegido = document.querySelector('input[name="personaje"]:checked');

    if (!inputElegido) {
        mostrarMensaje('⚠️ Por favor, elegí un personaje primero.', 'tie');
        return;
    }

    const datos = personajes[inputElegido.id];
    jugador.id     = inputElegido.id;
    jugador.nombre = datos.nombre;
    jugador.emoji  = datos.emoji;

    aleatoria(); // el enemigo sale random

    mostrarAvatar(imgJugador, spanEmojiJugador, jugador.id, jugador);
    mostrarAvatar(imgEnemigo, spanEmojiEnemigo, enemigo.id, enemigo);
    spanNombreJugador.textContent = jugador.nombre;
    spanNombreEnemigo.textContent = enemigo.nombre;

    seccionPersonaje.classList.add('oculto');
    seccionAtaque.classList.remove('oculto');
    seccionMensajes.classList.remove('oculto');

    mostrarMensaje(
        `Sos ${jugador.nombre} ${jugador.emoji} — el enemigo es ${enemigo.nombre} ${enemigo.emoji}. ¡Que empiece el combate!`
    );
}

// Elige un personaje random para el enemigo
function aleatoria() {
    const claves = Object.keys(personajes);
    const aleatoriaId = claves[Math.floor(Math.random() * claves.length)];
    const datos = personajes[aleatoriaId];
    enemigo.id     = aleatoriaId;
    enemigo.nombre = datos.nombre;
    enemigo.emoji  = datos.emoji;
}

// Resuelve el movimiento del jugador contra uno random del enemigo
function atacar(movimientoJugador) {
    const movimientoEnemigo = movimientos[Math.floor(Math.random() * movimientos.length)];

    let resultado;
    let claseMensaje;

    if (movimientoJugador === movimientoEnemigo) {
        resultado = 'EMPATE';
        claseMensaje = 'tie';
    } else if (ganaA[movimientoJugador] === movimientoEnemigo) {
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
        `${jugador.nombre} usó ${emojiMovimiento[movimientoJugador]} ${nombreMovimiento[movimientoJugador]} ` +
        `vs ${enemigo.nombre} con ${emojiMovimiento[movimientoEnemigo]} ${nombreMovimiento[movimientoEnemigo]} — ${resultado}`,
        claseMensaje
    );

    revisarFinDelJuego();
}

// Actualiza las vidas y las barras de vida en pantalla
function actualizarVidas() {
    spanVidasJugador.textContent = jugador.vidas;
    spanVidasEnemigo.textContent = enemigo.vidas;

    const porcentajeJugador = Math.max(jugador.vidas, 0) / VIDAS_MAX * 100;
    const porcentajeEnemigo = Math.max(enemigo.vidas, 0) / VIDAS_MAX * 100;

    barraJugador.style.width = `${porcentajeJugador}%`;
    barraEnemigo.style.width = `${porcentajeEnemigo}%`;

    barraJugador.classList.toggle('critica', jugador.vidas === 1);
    barraEnemigo.classList.toggle('critica', enemigo.vidas === 1);
}

// Chequea si ya hay ganador
function revisarFinDelJuego() {
    if (jugador.vidas <= 0 && enemigo.vidas <= 0) {
        finalizarJuego('🤝 Empate final: ambos cayeron al mismo tiempo.');
    } else if (jugador.vidas <= 0) {
        finalizarJuego(`💀 ${enemigo.nombre} te derrotó. ¡Perdiste!`);
    } else if (enemigo.vidas <= 0) {
        finalizarJuego(`🏆 ¡Venciste a ${enemigo.nombre}! Sos el Avatar.`);
    }
}

// Corta el juego: mensaje final + desactiva botones + muestra reiniciar
function finalizarJuego(mensaje) {
    mostrarMensaje(mensaje, 'final');
    document.querySelectorAll('#seleccionar-ataque .ataques button').forEach(btn => {
        btn.disabled = true;
    });
    seccionReiniciar.classList.remove('oculto');
}

// Agrega un mensaje nuevo arriba de todo
function mostrarMensaje(texto, clase) {
    const p = document.createElement('p');
    p.textContent = texto;
    if (clase) p.classList.add(clase);
    contenedorMensajes.prepend(p);
}

// Abre / cierra el modal de reglas
function toggleReglas(mostrar) {
    modalReglas.classList.toggle('oculto', !mostrar);
}

// Vuelve todo a cero
function reiniciar() {
    jugador.id = ''; jugador.nombre = ''; jugador.emoji = ''; jugador.vidas = VIDAS_MAX;
    enemigo.id = ''; enemigo.nombre = ''; enemigo.emoji = ''; enemigo.vidas = VIDAS_MAX;

    contenedorMensajes.innerHTML = '';
    imgJugador.classList.add('oculto');
    imgJugador.removeAttribute('src');
    imgEnemigo.classList.add('oculto');
    imgEnemigo.removeAttribute('src');
    spanEmojiJugador.textContent = '—';
    spanEmojiJugador.classList.remove('oculto');
    spanEmojiEnemigo.textContent = '—';
    spanEmojiEnemigo.classList.remove('oculto');
    spanNombreJugador.textContent = '—';
    spanNombreEnemigo.textContent = '—';
    actualizarVidas();
    document.querySelectorAll('input[name="personaje"]').forEach(i => i.checked = false);
    document.querySelectorAll('#seleccionar-ataque .ataques button').forEach(btn => btn.disabled = false);

    seccionPersonaje.classList.remove('oculto');
    seccionAtaque.classList.add('oculto');
    seccionMensajes.classList.add('oculto');
    seccionReiniciar.classList.add('oculto');
}

// --- EVENTOS ---
document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador);

// DRY: reusamos el array "movimientos" para no repetir 3 listeners a mano
movimientos.forEach(movimiento => {
    document.getElementById(`boton-${movimiento}`).addEventListener('click', () => atacar(movimiento));
});

document.getElementById('boton-reiniciar').addEventListener('click', reiniciar);

// Reglas: se pueden abrir desde la selección de personaje o desde la arena
document.getElementById('boton-reglas-personaje').addEventListener('click', () => toggleReglas(true));
document.getElementById('boton-reglas-arena').addEventListener('click', () => toggleReglas(true));
document.getElementById('boton-cerrar-reglas').addEventListener('click', () => toggleReglas(false));
document.getElementById('modal-reglas-fondo').addEventListener('click', () => toggleReglas(false));

// Si a una foto de personaje (selección o arena) le falta el archivo en /img,
// se oculta y se muestra el emoji de respaldo que está justo al lado
document.querySelectorAll('.avatar-img img').forEach(img => {
    img.addEventListener('error', () => {
        img.classList.add('oculto');
        img.nextElementSibling.classList.remove('oculto');
    });
});
