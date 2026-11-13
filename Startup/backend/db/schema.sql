-- =====================================================================
-- Base de datos: Sistema de Gestión para Refugios de Animales (MVP)
-- Grupo: Los Sin Chamba - UTN FRSR - Metodología de Sistemas 2026
-- Motor: SQLite 3
-- Módulos: Animales | Historial sanitario | Insumos (stock) | Avisos/Panel
-- =====================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------
-- Catálogos (valores fijos que usa el frontend en los <select>)
-- ---------------------------------------------------------------------
CREATE TABLE especie (
    id_especie  INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre      TEXT NOT NULL UNIQUE            -- Perro, Gato, Otro
);

CREATE TABLE estado_general (
    id_estado   INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre      TEXT NOT NULL UNIQUE            -- Bueno / Saludable, Bajo Tratamiento, Observación
);

CREATE TABLE tipo_intervencion (
    id_tipo     INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre      TEXT NOT NULL UNIQUE            -- Vacuna, Desparasitación, Tratamiento
);

CREATE TABLE categoria_insumo (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre       TEXT NOT NULL UNIQUE           -- Alimento, Medicamento, Higiene / Otro
);

-- ---------------------------------------------------------------------
-- 1) Registro de animales (módulo Mariano)
-- ---------------------------------------------------------------------
CREATE TABLE animal (
    id_animal       INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre          TEXT    NOT NULL CHECK (length(trim(nombre)) > 0),
    id_especie      INTEGER NOT NULL REFERENCES especie(id_especie),
    edad_aprox      TEXT    NOT NULL,           -- texto libre: "3 años", "6 meses"
    fecha_ingreso   TEXT    NOT NULL CHECK (fecha_ingreso GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    id_estado       INTEGER NOT NULL REFERENCES estado_general(id_estado),
    activo          INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0,1)),  -- baja lógica
    creado_en       TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_animal_especie ON animal(id_especie);
CREATE INDEX idx_animal_estado  ON animal(id_estado);

-- ---------------------------------------------------------------------
-- 2) Seguimiento sanitario (módulo Kevin)
--    fecha_aplicacion = cuándo se aplicó / se aplicará
--    proxima_fecha    = refuerzo o próxima dosis (permite detectar pendientes)
--    realizado        = 1 aplicado, 0 pendiente
-- ---------------------------------------------------------------------
CREATE TABLE registro_sanitario (
    id_registro       INTEGER PRIMARY KEY AUTOINCREMENT,
    id_animal         INTEGER NOT NULL REFERENCES animal(id_animal) ON DELETE CASCADE,
    id_tipo           INTEGER NOT NULL REFERENCES tipo_intervencion(id_tipo),
    detalle           TEXT    NOT NULL CHECK (length(trim(detalle)) > 0),  -- fármaco / vacuna
    fecha_aplicacion  TEXT    NOT NULL CHECK (fecha_aplicacion GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    proxima_fecha     TEXT    CHECK (proxima_fecha IS NULL OR proxima_fecha GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    realizado         INTEGER NOT NULL DEFAULT 1 CHECK (realizado IN (0,1)),
    observaciones     TEXT,
    creado_en         TEXT    NOT NULL DEFAULT (datetime('now')),
    CHECK (proxima_fecha IS NULL OR proxima_fecha >= fecha_aplicacion)
);
CREATE INDEX idx_sanitario_animal  ON registro_sanitario(id_animal);
CREATE INDEX idx_sanitario_proxima ON registro_sanitario(proxima_fecha);

-- ---------------------------------------------------------------------
-- 3) Control de insumos (módulo Ezequiel)
-- ---------------------------------------------------------------------
CREATE TABLE insumo (
    id_insumo       INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre          TEXT    NOT NULL UNIQUE CHECK (length(trim(nombre)) > 0),
    id_categoria    INTEGER NOT NULL REFERENCES categoria_insumo(id_categoria),
    cantidad_actual REAL    NOT NULL DEFAULT 0 CHECK (cantidad_actual >= 0),
    stock_minimo    REAL    NOT NULL CHECK (stock_minimo >= 1),
    unidad          TEXT    NOT NULL,           -- Kg, Frascos, Unidades...
    activo          INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0,1)),
    actualizado_en  TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_insumo_categoria ON insumo(id_categoria);

-- Historial de movimientos de stock (entradas / consumos)
CREATE TABLE movimiento_insumo (
    id_movimiento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_insumo     INTEGER NOT NULL REFERENCES insumo(id_insumo) ON DELETE CASCADE,
    tipo          TEXT    NOT NULL CHECK (tipo IN ('ENTRADA','SALIDA','AJUSTE')),
    cantidad      REAL    NOT NULL CHECK (cantidad > 0),
    fecha         TEXT    NOT NULL DEFAULT (date('now')),
    nota          TEXT
);
CREATE INDEX idx_mov_insumo ON movimiento_insumo(id_insumo);

-- Mantiene cantidad_actual sincronizada con los movimientos
CREATE TRIGGER trg_mov_actualiza_stock
AFTER INSERT ON movimiento_insumo
BEGIN
    UPDATE insumo
       SET cantidad_actual = CASE NEW.tipo
                                WHEN 'ENTRADA' THEN cantidad_actual + NEW.cantidad
                                WHEN 'SALIDA'  THEN max(cantidad_actual - NEW.cantidad, 0)
                                ELSE NEW.cantidad                -- AJUSTE fija el valor
                             END,
           actualizado_en = datetime('now')
     WHERE id_insumo = NEW.id_insumo;
END;

-- ---------------------------------------------------------------------
-- Vistas: avisos internos y panel principal (módulo Samira)
-- ---------------------------------------------------------------------

-- Insumos por debajo del mínimo
CREATE VIEW v_insumos_bajo_stock AS
SELECT i.id_insumo, i.nombre, c.nombre AS categoria,
       i.cantidad_actual, i.stock_minimo, i.unidad,
       (i.stock_minimo - i.cantidad_actual) AS faltante,
       CASE WHEN i.cantidad_actual = 0 THEN 'AGOTADO' ELSE 'BAJO MÍNIMO' END AS alerta
  FROM insumo i
  JOIN categoria_insumo c ON c.id_categoria = i.id_categoria
 WHERE i.activo = 1 AND i.cantidad_actual < i.stock_minimo;

-- Tratamientos pendientes o próximos (vencidos o dentro de 30 días)
CREATE VIEW v_sanitario_pendiente AS
SELECT r.id_registro, a.id_animal, a.nombre AS animal, t.nombre AS tipo, r.detalle,
       COALESCE(r.proxima_fecha, r.fecha_aplicacion) AS fecha_objetivo,
       CASE WHEN COALESCE(r.proxima_fecha, r.fecha_aplicacion) < date('now') THEN 'VENCIDO'
            ELSE 'PRÓXIMO' END AS alerta
  FROM registro_sanitario r
  JOIN animal a            ON a.id_animal = r.id_animal AND a.activo = 1
  JOIN tipo_intervencion t ON t.id_tipo   = r.id_tipo
 WHERE (r.realizado = 0 AND r.fecha_aplicacion <= date('now','+30 day'))
    OR (r.proxima_fecha IS NOT NULL AND r.proxima_fecha <= date('now','+30 day'));

-- Listado de animales con nombres legibles
CREATE VIEW v_animales AS
SELECT a.id_animal, a.nombre, e.nombre AS especie, a.edad_aprox,
       a.fecha_ingreso, s.nombre AS estado
  FROM animal a
  JOIN especie e         ON e.id_especie = a.id_especie
  JOIN estado_general s  ON s.id_estado  = a.id_estado
 WHERE a.activo = 1;

-- Historial sanitario con nombres legibles
CREATE VIEW v_historial_sanitario AS
SELECT r.id_registro, a.nombre AS animal, t.nombre AS tipo, r.detalle,
       r.fecha_aplicacion, r.proxima_fecha, r.realizado
  FROM registro_sanitario r
  JOIN animal a            ON a.id_animal = r.id_animal
  JOIN tipo_intervencion t ON t.id_tipo   = r.id_tipo
 ORDER BY r.fecha_aplicacion DESC;

-- Panel principal: métricas resumidas
CREATE VIEW v_panel_resumen AS
SELECT
  (SELECT COUNT(*) FROM animal WHERE activo = 1)                                   AS total_animales,
  (SELECT COUNT(*) FROM animal a JOIN especie e USING(id_especie)
    WHERE a.activo = 1 AND e.nombre = 'Perro')                                     AS perros,
  (SELECT COUNT(*) FROM animal a JOIN especie e USING(id_especie)
    WHERE a.activo = 1 AND e.nombre = 'Gato')                                      AS gatos,
  (SELECT COUNT(*) FROM animal a JOIN estado_general s USING(id_estado)
    WHERE a.activo = 1 AND s.nombre = 'Bueno / Saludable')                         AS saludables,
  (SELECT COUNT(*) FROM animal a JOIN estado_general s USING(id_estado)
    WHERE a.activo = 1 AND s.nombre <> 'Bueno / Saludable')                        AS requieren_atencion,
  (SELECT COUNT(*) FROM v_sanitario_pendiente)                                     AS pendientes_sanitarios,
  (SELECT COUNT(*) FROM v_insumos_bajo_stock)                                      AS insumos_a_reponer;
