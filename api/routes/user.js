import express from "express";
import { addUser, getUsers, loginUser } from "../controllers/user.js";
import {addTarefa, updateTarefa, getTarefas, getTarefaById} from "../controllers/tarefas.js";

const router = express.Router();
// cadastro de usuario
router.get("/", getUsers);
router.post("/register", addUser);
router.post("/login", loginUser);

// cadastro de tarefas

router.get("/tarefas", getTarefas); // Buscar todas as tarefas
router.post("/tarefas", addTarefa); // Adicionar uma nova tarefa
router.put("/tarefas/:id", updateTarefa); // Atualizar uma tarefa existente
router.get("/tarefas/:id", getTarefaById); // Buscar uma tarefa específica por ID

export default router;
