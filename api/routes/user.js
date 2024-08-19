import express from "express";
import { addUser, getUsers, loginUser } from "../controllers/user.js";
import {addTarefa, deleteTarefa, updateTarefa } from "../controllers/tarefas.js";

const router = express.Router();
// cadastro de usuario
router.get("/", getUsers);
router.post("/register", addUser);
router.post("/login", loginUser);

// cadastro de tarefas


router.get("/", addTarefa);
router.post("/updateTarefa", updateTarefa);
router.post("/deleteTarefa", deleteTarefa);



export default router;
