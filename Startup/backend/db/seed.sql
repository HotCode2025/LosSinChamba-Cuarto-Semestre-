-- Datos de ejemplo (ficticios) para la prueba piloto - Fundación Huellas del Sur
PRAGMA foreign_keys = ON;

INSERT INTO especie (nombre) VALUES ('Perro'), ('Gato'), ('Otro');
INSERT INTO estado_general (nombre) VALUES ('Bueno / Saludable'), ('Bajo Tratamiento'), ('Observación');
INSERT INTO tipo_intervencion (nombre) VALUES ('Vacuna'), ('Desparasitación'), ('Tratamiento');
INSERT INTO categoria_insumo (nombre) VALUES ('Alimento'), ('Medicamento'), ('Higiene / Otro');

-- Animales (los 3 del frontend + algunos más)
INSERT INTO animal (nombre, id_especie, edad_aprox, fecha_ingreso, id_estado) VALUES
 ('Milo',  1, '3 años',   '2026-01-10', 2),
 ('Luna',  2, '1 año',    '2026-02-15', 1),
 ('Rocky', 1, '5 años',   '2026-03-01', 1),
 ('Nala',  2, '8 meses',  '2026-04-22', 3),
 ('Toby',  1, '2 años',   '2026-05-30', 2),
 ('Mora',  1, '6 meses',  '2026-09-12', 1);

-- Historial sanitario
INSERT INTO registro_sanitario (id_animal, id_tipo, detalle, fecha_aplicacion, proxima_fecha, realizado, observaciones) VALUES
 (1, 1, 'Antirrábica',          '2026-03-20', '2027-03-20', 1, NULL),
 (2, 2, 'Pipeta Antipulgas',    '2026-03-18', '2026-06-18', 1, 'Refuerzo vencido'),
 (1, 3, 'Amoxicilina 10 días',  '2026-10-25', '2026-11-04', 1, 'Control al finalizar'),
 (3, 1, 'Quíntuple',            '2026-03-05', '2026-11-20', 1, 'Refuerzo anual próximo'),
 (4, 3, 'Control dermatológico','2026-11-18', NULL,         0, 'Turno veterinario pendiente'),
 (5, 3, 'Antibiótico post-cirugía','2026-11-08', '2026-11-15', 1, NULL),
 (6, 1, 'Primera dosis cachorro','2026-09-20','2026-10-11', 1, 'Segunda dosis atrasada');

-- Insumos (los 3 del frontend + algunos más)
INSERT INTO insumo (nombre, id_categoria, cantidad_actual, stock_minimo, unidad) VALUES
 ('Alimento Perros Adultos', 1, 20, 30, 'Kg'),
 ('Amoxicilina Suspensión',  2,  4,  5, 'Frascos'),
 ('Alimento Gatos',          1,  7, 15, 'Kg'),
 ('Antipulgas (pipetas)',    2,  0, 10, 'Unidades'),
 ('Piedras sanitarias',      3, 20, 10, 'Kg'),
 ('Alcohol en gel',          3,  3,  4, 'Litros');

-- Movimientos de stock (el trigger ajusta cantidad_actual)
INSERT INTO movimiento_insumo (id_insumo, tipo, cantidad, fecha, nota) VALUES
 (1, 'SALIDA',  5, '2026-11-10', 'Consumo semanal'),
 (3, 'SALIDA',  2, '2026-11-11', 'Consumo semanal'),
 (2, 'ENTRADA', 4, '2026-11-05', 'Donación veterinaria');
