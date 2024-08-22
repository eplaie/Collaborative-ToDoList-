import express from "express";
import { addUser, getUsers, loginUser } from "../controllers/user.js";
import { addTarefa, updateTarefa, getTarefas, getTarefaById } from "../controllers/tarefas.js";
import { addSubtarefa, updateSubtarefa, getSubtarefas, getSubtarefaById } from "../controllers/subtarefas.js";

const router = express.Router();

// Cadastro de usuário
router.get("/", getUsers);
router.post("/register", addUser);
router.post("/login", loginUser);

// Cadastro de tarefas
router.get("/tarefas", getTarefas); 
router.post("/tarefas", addTarefa); 
router.put("/tarefas/:id", updateTarefa); 
router.get("/tarefas/:id", getTarefaById); 

// Cadastro de subtarefas
router.get("/subtarefas", getSubtarefas); 
router.post("/subtarefas", addSubtarefa); 
router.put("/subtarefas/:id", updateSubtarefa); 
router.get("/subtarefas/:id", getSubtarefaById); 

export default router;
