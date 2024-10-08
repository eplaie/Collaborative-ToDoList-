import express from "express";
import authRoutes from "./routes/user.js";
import taskRoutes from "./routes/user.js"; 
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Usando as rotas de autenticação
app.use("/", authRoutes);

// Usando as rotas de tarefas e subtarefas
app.use("/", taskRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
