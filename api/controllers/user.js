import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM tarefas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO tarefas(`nome`, `data_tarefa`) VALUES(?)";

  const values = [
    req.body.nome,
    // req.body.email,
    // req.body.fone,
    req.body.data_tarefa,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE tarefas SET `nome` = ?, `data_tarefa` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    // req.body.email,
    // req.body.fone,
    req.body.data_tarefa,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM tarefas WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
};

// export const compartilharUser = (req, res => {
//   const q = ""
// })