import { db } from "../db.js";

// Adicionar uma nova subtarefa
export const addSubtarefa = (req, res) => {
  const q = "INSERT INTO tarefas (`nome`, `data_vencimento`, `concluida`, `lista_id`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.nome,
    req.body.data_vencimento || null,  
    req.body.concluida || 0,            
    req.body.tarefa_id || null           
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Subtarefa criada com sucesso.");
  });
};

// Atualizar uma subtarefa existente
export const updateSubtarefa = (req, res) => {
  const q = "UPDATE tarefas SET `nome` = ?, `data_vencimento` = ?, `concluida` = ?, `lista_id` = ? WHERE `id` = ?";
  const values = [
    req.body.nome,
    req.body.data_vencimento || null,
    req.body.concluida || 0,
    req.body.lista_id || null,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Subtarefa atualizada com sucesso.");
  });
};

// Buscar todas as subtarefas
export const getSubtarefas = (req, res) => {
  const q = "SELECT * FROM tarefas";
    console.log("teste")
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};


export const getSubtarefaById = (req, res) => {
  const q = "SELECT * FROM tarefas WHERE lista_id = ?";
    // console.log(req.params);
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error(err);

      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("Subtarefa não encontrada.");
    }
    // console.log(data);
    return res.status(200).json(data);
  });
};
