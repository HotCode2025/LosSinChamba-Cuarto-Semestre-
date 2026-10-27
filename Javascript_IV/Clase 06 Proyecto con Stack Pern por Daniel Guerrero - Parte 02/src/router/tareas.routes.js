import { Router } from "express";
import {listarTareas} from "../controllers/tarea.controller.js";
import {listarTarea} from "../controllers/tarea.controller.js";
import {crearTarea} from "../controllers/tarea.controller.js";
import {actualizarTarea} from "../controllers/tarea.controller.js";
import {eliminarTarea} from "../controllers/tarea.controller.js";

const router = Router();

router.get('/tareas', listarTareas);

router.get('/tareas/:id', listarTarea);

router.post('/tareas', crearTarea);

router.put('/tareas/:id', actualizarTarea);

router.delete('/tareas/:id', eliminarTarea);

export default router;
