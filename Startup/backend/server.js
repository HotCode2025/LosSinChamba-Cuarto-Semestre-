// Backend del MVP - Sistema de gestión para refugios (Los Sin Chamba, UTN FRSR)
// Sin dependencias externas: usa http y node:sqlite (incluidos en Node >= 22.5)
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db', 'refugio.db');
const PUBLIC_DIR = path.join(__dirname, 'public');

// ---------- Base de datos (se crea sola la primera vez) ----------
const esNueva = !fs.existsSync(DB_FILE);
const db = new DatabaseSync(DB_FILE);
db.exec('PRAGMA foreign_keys = ON');
if (esNueva) {
  db.exec(fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8'));
  db.exec(fs.readFileSync(path.join(__dirname, 'db', 'seed.sql'), 'utf8'));
  console.log('Base de datos creada con datos de ejemplo.');
}

// ---------- Consultas (devuelven el mismo formato que usa el frontend) ----------
const SQL_ANIMALES = `
  SELECT a.id_animal AS id, a.nombre, e.nombre AS especie, a.edad_aprox AS edad,
         a.fecha_ingreso AS fecha, s.nombre AS estado
    FROM animal a
    JOIN especie e        ON e.id_especie = a.id_especie
    JOIN estado_general s ON s.id_estado  = a.id_estado`;

const SQL_SANITARIOS = `
  SELECT r.id_registro AS id, r.id_animal AS animal_id, a.nombre AS animal,
         t.nombre AS tipo, r.detalle, r.fecha_aplicacion AS fecha,
         r.proxima_fecha, r.realizado
    FROM registro_sanitario r
    JOIN animal a            ON a.id_animal = r.id_animal
    JOIN tipo_intervencion t ON t.id_tipo   = r.id_tipo`;

const SQL_STOCK = `
  SELECT i.id_insumo AS id, i.nombre, c.nombre AS categoria,
         i.cantidad_actual AS cantidad, i.stock_minimo AS minimo, i.unidad
    FROM insumo i
    JOIN categoria_insumo c ON c.id_categoria = i.id_categoria`;

const getAnimales   = () => db.prepare(SQL_ANIMALES + ' WHERE a.activo = 1 ORDER BY a.id_animal').all();
const getSanitarios = () => db.prepare(SQL_SANITARIOS + ' WHERE a.activo = 1 ORDER BY r.fecha_aplicacion DESC, r.id_registro DESC').all();
const getStock      = () => db.prepare(SQL_STOCK + ' WHERE i.activo = 1 ORDER BY i.id_insumo').all();

// ---------- Validaciones ----------
class ErrorValidacion extends Error {}
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

function texto(valor, campo, max = 100) {
  const v = String(valor ?? '').trim();
  if (!v) throw new ErrorValidacion(`El campo "${campo}" es obligatorio.`);
  if (v.length > max) throw new ErrorValidacion(`El campo "${campo}" no puede superar ${max} caracteres.`);
  return v;
}
function fecha(valor, campo) {
  const v = String(valor ?? '');
  const d = new Date(v);
  if (!FECHA.test(v) || Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v) throw new ErrorValidacion(`"${campo}" debe ser una fecha válida (AAAA-MM-DD).`);
  return v;
}
function numero(valor, campo, min) {
  const n = Number(valor);
  if (valor === '' || valor === null || !Number.isFinite(n) || n < min) throw new ErrorValidacion(`"${campo}" debe ser un número mayor o igual a ${min}.`);
  return n;
}
function idDe(tabla, col, valor, campo) {
  const fila = db.prepare(`SELECT ${col} AS id FROM ${tabla} WHERE nombre = ?`).get(String(valor ?? ''));
  if (!fila) throw new ErrorValidacion(`Valor inválido para "${campo}".`);
  return fila.id;
}

function datosAnimal(b) {
  return {
    nombre: texto(b.nombre, 'Nombre', 60),
    id_especie: idDe('especie', 'id_especie', b.especie, 'Especie'),
    edad: texto(b.edad, 'Edad', 30),
    fecha: fecha(b.fecha, 'Fecha de ingreso'),
    id_estado: idDe('estado_general', 'id_estado', b.estado, 'Estado general'),
  };
}
function datosSanitario(b) {
  const id_animal = Number(b.animal_id);
  const existe = db.prepare('SELECT 1 FROM animal WHERE id_animal = ? AND activo = 1').get(id_animal);
  if (!existe) throw new ErrorValidacion('El animal seleccionado no existe.');
  return {
    id_animal,
    id_tipo: idDe('tipo_intervencion', 'id_tipo', b.tipo, 'Tipo de intervención'),
    detalle: texto(b.detalle, 'Detalle / Fármaco', 120),
    fecha: fecha(b.fecha, 'Fecha de aplicación'),
  };
}
function datosStock(b) {
  return {
    nombre: texto(b.nombre, 'Nombre del insumo', 80),
    id_categoria: idDe('categoria_insumo', 'id_categoria', b.categoria, 'Categoría'),
    cantidad: numero(b.cantidad, 'Cantidad actual', 0),
    minimo: numero(b.minimo, 'Mínimo requerido', 1),
    unidad: texto(b.unidad, 'Unidad de medida', 20),
  };
}

// ---------- Rutas de la API ----------
// Cada recurso: listar, crear, editar y dar de baja
const rutas = {
  animales: {
    listar: getAnimales,
    crear: (b) => {
      const d = datosAnimal(b);
      db.prepare('INSERT INTO animal (nombre, id_especie, edad_aprox, fecha_ingreso, id_estado) VALUES (?,?,?,?,?)')
        .run(d.nombre, d.id_especie, d.edad, d.fecha, d.id_estado);
    },
    editar: (id, b) => {
      const d = datosAnimal(b);
      return db.prepare('UPDATE animal SET nombre=?, id_especie=?, edad_aprox=?, fecha_ingreso=?, id_estado=? WHERE id_animal=? AND activo=1')
        .run(d.nombre, d.id_especie, d.edad, d.fecha, d.id_estado, id).changes;
    },
    borrar: (id) => db.prepare('UPDATE animal SET activo = 0 WHERE id_animal = ?').run(id).changes,
  },
  sanitarios: {
    listar: getSanitarios,
    crear: (b) => {
      const d = datosSanitario(b);
      db.prepare('INSERT INTO registro_sanitario (id_animal, id_tipo, detalle, fecha_aplicacion) VALUES (?,?,?,?)')
        .run(d.id_animal, d.id_tipo, d.detalle, d.fecha);
    },
    editar: (id, b) => {
      const d = datosSanitario(b);
      return db.prepare(`UPDATE registro_sanitario SET id_animal=?, id_tipo=?, detalle=?, fecha_aplicacion=?
                          WHERE id_registro=?`).run(d.id_animal, d.id_tipo, d.detalle, d.fecha, id).changes;
    },
    borrar: (id) => db.prepare('DELETE FROM registro_sanitario WHERE id_registro = ?').run(id).changes,
  },
  stock: {
    listar: getStock,
    crear: (b) => {
      const d = datosStock(b);
      db.prepare('INSERT INTO insumo (nombre, id_categoria, cantidad_actual, stock_minimo, unidad) VALUES (?,?,?,?,?)')
        .run(d.nombre, d.id_categoria, d.cantidad, d.minimo, d.unidad);
    },
    editar: (id, b) => {
      const d = datosStock(b);
      return db.prepare(`UPDATE insumo SET nombre=?, id_categoria=?, cantidad_actual=?, stock_minimo=?, unidad=?,
                                          actualizado_en=datetime('now') WHERE id_insumo=? AND activo=1`)
        .run(d.nombre, d.id_categoria, d.cantidad, d.minimo, d.unidad, id).changes;
    },
    borrar: (id) => db.prepare('UPDATE insumo SET activo = 0 WHERE id_insumo = ?').run(id).changes,
  },
};

// ---------- Servidor ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.ico': 'image/x-icon', '.svg': 'image/svg+xml' };

function responder(res, codigo, datos) {
  res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(datos));
}

function leerBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 1e6) { reject(new ErrorValidacion('Solicitud demasiado grande.')); req.destroy(); } });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new ErrorValidacion('JSON inválido.')); } });
  });
}

async function manejarApi(req, res, url) {
  const partes = url.pathname.split('/').filter(Boolean); // ['api', recurso, id?]
  const recurso = partes[1];
  const id = partes[2] !== undefined ? Number(partes[2]) : null;

  if (recurso === 'panel' && req.method === 'GET') {
    return responder(res, 200, {
      resumen: db.prepare('SELECT * FROM v_panel_resumen').get(),
      insumos_bajo_stock: db.prepare('SELECT * FROM v_insumos_bajo_stock').all(),
      sanitario_pendiente: db.prepare('SELECT * FROM v_sanitario_pendiente ORDER BY fecha_objetivo').all(),
    });
  }

  const r = rutas[recurso];
  if (!r) return responder(res, 404, { error: 'Recurso no encontrado.' });
  if (id !== null && !Number.isInteger(id)) return responder(res, 400, { error: 'ID inválido.' });

  if (req.method === 'GET' && id === null) return responder(res, 200, r.listar());
  if (req.method === 'POST' && id === null) { r.crear(await leerBody(req)); return responder(res, 201, r.listar()); }
  if (req.method === 'PUT' && id !== null) {
    const cambios = r.editar(id, await leerBody(req));
    return cambios ? responder(res, 200, r.listar()) : responder(res, 404, { error: 'Registro no encontrado.' });
  }
  if (req.method === 'DELETE' && id !== null) {
    return r.borrar(id) ? responder(res, 200, r.listar()) : responder(res, 404, { error: 'Registro no encontrado.' });
  }
  return responder(res, 405, { error: 'Método no permitido.' });
}

function servirEstatico(req, res, url) {
  const pedido = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const archivo = path.normalize(path.join(PUBLIC_DIR, pedido));
  if (!archivo.startsWith(PUBLIC_DIR + path.sep)) { res.writeHead(403); return res.end('Prohibido'); }
  fs.readFile(archivo, (err, data) => {
    if (err) { res.writeHead(404); return res.end('No encontrado'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(archivo)] || 'application/octet-stream' });
    res.end(data);
  });
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith('/api/')) await manejarApi(req, res, url);
    else servirEstatico(req, res, url);
  } catch (e) {
    if (e instanceof ErrorValidacion) return responder(res, 400, { error: e.message });
    if (String(e.message).includes('UNIQUE')) return responder(res, 409, { error: 'Ya existe un registro con ese nombre.' });
    console.error(e);
    responder(res, 500, { error: 'Error interno del servidor.' });
  }
}).listen(PORT, () => console.log(`Refugio MVP corriendo en http://localhost:${PORT}`));
