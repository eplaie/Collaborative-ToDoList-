import { db } from "../db.js";

// Adicionar uma nova tarefa
export const addTarefa = (req, res) => {
  const q =
    "INSERT INTO listas(`nome_lista`, `usuario_criador_id`) VALUES (?)";

  const values = [
    req.body.nome_lista,
    req.body.usuario_criador_id,
  ];

  db.query(q, [values], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Tarefa criada com sucesso.");
  });
};

// Atualizar uma tarefa existente
export const updateTarefa = (req, res) => {
  const q =
    "UPDATE listas SET `nome_lista` = ?, `usuario_criador_id` = ? WHERE `id` = ?";

  const values = [
    req.body.nome_lista,
    req.body.usuario_criador_id,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Lista atualizada com sucesso.");
  });
};

// Buscar todas as tarefas
export const getTarefas = (req, res) => {
  const q = "SELECT * FROM listas";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};

// Buscar uma tarefa específica por ID e suas subtarefas
export const getTarefaById = (req, res) => {
  const tarefaQuery = "SELECT * FROM listas WHERE id = ?";
  const subtarefaQuery = "SELECT * FROM tb_final_bd.tarefas WHERE lista_id = ?";
  console.log(req.params.id);
  db.query(tarefaQuery, [req.params.id], (err, tarefaData) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    if (tarefaData.length === 0) {
      return res.status(404).json("Tarefa não encontrada.");
    }

    db.query(subtarefaQuery, [req.params.id], (err, subtarefaData) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      return res.status(200).json({
        tarefa: tarefaData[0],
        subtarefas: subtarefaData
      });
    });
  });
};
