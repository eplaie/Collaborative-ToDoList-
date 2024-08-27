CREATE DATABASE tb_final_bd;
USE tb_final_bd;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome_completo VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE listas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_lista VARCHAR(100) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_ultima_modificacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    usuario_criador_id INT,
    FOREIGN KEY (usuario_criador_id) REFERENCES usuarios(id)
);

CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_vencimento DATETIME,
    concluida BOOLEAN DEFAULT FALSE,
    lista_id INT,
    FOREIGN KEY (lista_id) REFERENCES listas(id)
);


CREATE TABLE convites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_convidado_id INT,
    lista_id INT,
    status ENUM('PENDENTE', 'ACEITO', 'RECUSADO') DEFAULT 'PENDENTE',
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_resposta DATETIME,
    FOREIGN KEY (usuario_convidado_id) REFERENCES usuarios(id),
    FOREIGN KEY (lista_id) REFERENCES listas(id)
);