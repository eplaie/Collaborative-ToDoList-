import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from '../db.js'; 

// Função para obter todos os usuários
export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// Função para adicionar um novo usuário
export const addUser = (req, res) => {
  const { nome, email, fone, senha } = req.body;

  if (!nome || !email || !fone || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(senha, salt);

  const q = "INSERT INTO usuarios (`nome_usuario`, `email`, `telefone`, `senha`) VALUES (?)";
  const values = [nome, email, fone, hashedPassword];

  db.query(q, [values], (err) => {
    if (err) {
      console.error("Erro ao adicionar usuário:", err);
      return res.status(500).json({ error: "Erro ao adicionar usuário" });
    }

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

// Função para fazer login do usuário
export const loginUser = (req, res) => {
  const q = "SELECT * FROM usuarios WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("Usuário não encontrado!");

    const user = data[0];
    const isPasswordCorrect = bcrypt.compareSync(req.body.senha, user.senha);
    if (!isPasswordCorrect)
      return res.status(400).json("Senha incorreta!");

    const token = jwt.sign({ id: user.id }, "jwtkey");

    const { senha, ...userWithoutPassword } = user;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userWithoutPassword);
  });
};
