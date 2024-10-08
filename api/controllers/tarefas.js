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

export const updateTarefa = (req, res) => {
  const q =
    "UPDATE listas SET `nome_lista` = ?, `usuario_criador_id` = ?, `data_ultima_modificacao` = ? WHERE `id` = ?";

  const values = [
    req.body.nome_lista,
    req.body.usuario_criador_id,
    req.body.data_tarefa, // Adiciona a data da tarefa aqui
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Lista atualizada com sucesso.");
  });
};


export const deleteTarefas = (req, res) => {
  const q = "DELETE FROM listas WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa deletado com sucesso.");
  });
};

// Buscar todas as tarefas
export const getTarefas = (req, res) => {
  const usuario_id = req.query.usuario_id;
  // const q = "SELECT * FROM listas WHERE usuario_criador_id=?";

  const q = `
  SELECT 
    li.* ,
    CASE cv.usuario_convidado_id 
    WHEN ? THEN true
    ELSE false
END 'compartilhado'
FROM 
    tb_final_bd.listas li,
	tb_final_bd.convites cv 
    where 
    li.usuario_criador_id = ?
	or
    (cv.usuario_convidado_id=? and cv.status='ACEITO')
  `

  db.query(q, [usuario_id, usuario_id, usuario_id], (err, data) => {
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
