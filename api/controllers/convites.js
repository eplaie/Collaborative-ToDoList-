import express from "express";
import nodemailer from "nodemailer";
import { db } from "../db.js";  

const router = express.Router();

export const enviarConvite = (req, res) => {
  const q = `
    INSERT INTO convites 
    (lista_id, usuario_convidado_id) 
    VALUES (?, ?)
  `;

  const values = [
    req.body.lista_id,
    req.body.usuario_convidado_id,
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Convite enviado com sucesso.");
  });
};

export const responderConvite = (req, res) => {
  const q = `
    UPDATE convites
    SET status = ?, data_resposta = NOW() 
    WHERE id = ? AND usuario_convidado_id = ?
  `;

  const values = [
    req.body.status,  // 'ACEITO' ou 'RECUSADO'
    req.params.id,
    req.body.usuario_convidado_id
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(`Convite ${req.body.status.toLowerCase()} com sucesso.`);
  });
};

export const getConvites = (req, res) => {
  const usuario_convidado_id = req.query.usuario_convidado_id;
  const q = `
    SELECT * FROM convites
    WHERE usuario_convidado_id = ?
  `;

  db.query(q, [usuario_convidado_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};

export default router;
