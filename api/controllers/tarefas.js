// tarefas.js
import { db } from "../db.js";


// Adicionar uma nova tarefa
export const addTarefa = (req, res) => {
  const q =
    "INSERT INTO listas(`nome_lista`, `data_criacao`, `data_ultima_modificacao`, `usuario_criador_id`) VALUES (?)";

  const values = [
    req.body.nome_lista,
    req.body.data_criacao,
    req.body.data_ultima_modificacao,
    req.body.usuario_criador_id,
  ];

  db.query(q, [values], (err) => {
    if (err) {
      console.error(err); // Exibe o erro no console
      return res.status(500).json(err); // Retorna o erro com status 500
    }

    return res.status(200).json("Tarefa criada com sucesso.");
  });
};

// Atualizar uma tarefa existente
export const updateTarefa = (req, res) => {
  const q =
    "UPDATE listas SET `nome_lista` = ?, `data_ultima_modificacao` = ?, `usuario_criador_id` = ? WHERE `id` = ?";

  const values = [
    req.body.nome_lista,
    req.body.data_ultima_modificacao,
    req.body.usuario_criador_id,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) {
      console.error(err); // Exibe o erro no console
      return res.status(500).json(err); // Retorna o erro com status 500
    }

    return res.status(200).json("Lista atualizada com sucesso.");
  });
};

// Buscar todas as tarefas
export const getTarefas = (req, res) => {
  const q = "SELECT * FROM listas";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err); // Exibe o erro no console
      return res.status(500).json(err); // Retorna o erro com status 500
    }

    return res.status(200).json(data);
  });
};

// Buscar uma tarefa específica por ID
export const getTarefaById = (req, res) => {
  const q = "SELECT * FROM listas WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error(err); // Exibe o erro no console
      return res.status(500).json(err); // Retorna o erro com status 500
    }

    if (data.length === 0) {
      return res.status(404).json("Tarefa não encontrada.");
    }

    return res.status(200).json(data[0]);
  });
};
