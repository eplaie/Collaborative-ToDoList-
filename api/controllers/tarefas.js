import { db } from "../db.js";

export const addTarefa = (_, res) => {
  const q = "SELECT * FROM tarefas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const AddTarefa = (req, res) => {
  const q =
    "INSERT INTO tarefas(`nome`, `data_vencimento`, `concluida`, `data_cadastro` ) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.data_vencimento,
    req.body.concluida,
    req.body.data_cadastro,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa criada.");
  });
};

export const updateTarefa = (req, res) => {
  const q =
    "UPDATE tarefas SET `nome` = ?, `data_vencimento` = ?, `status` = ?, `data_cadastro` = ?,  WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.data_vencimento,
    req.body.concluida,
    req.body.data_cadastro,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteTarefa = (req, res) => {
  const q = "DELETE FROM tarefas WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
};
