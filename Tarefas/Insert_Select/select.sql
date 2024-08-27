usuarios
1.  Obter todos os usuários:
SELECT * FROM usuarios

2.  Fazer login do usuário:
SELECT * FROM usuarios WHERE email = ?


tarefas
1.  Seleciona todas as tarefas da tabela listas, incluindo uma coluna compartilhado que indica se a tarefa é compartilhada com o usuário especificado.
SELECT 
    li.*,
    CASE cv.usuario_convidado_id 
    WHEN ? THEN true
    ELSE false
    END 'compartilhado'
FROM 
    tb_final_bd.listas li,
    tb_final_bd.convites cv 
WHERE 
    li.usuario_criador_id = ?
    OR
    (cv.usuario_convidado_id = ? AND cv.status = 'ACEITO')


2.  Buscar uma tarefa específica por ID:
SELECT * FROM listas WHERE id = ?

3.  Buscar subtarefas de uma tarefa específica:
SELECT * FROM tb_final_bd.tarefas WHERE lista_id = ?

4.  Atualizar uma tarefa existente:
UPDATE listas SET `nome_lista` = ?, `usuario_criador_id` = ?, `data_ultima_modificacao` = ? WHERE `id` = ?

5.  Deletar uma tarefa:
DELETE FROM listas WHERE `id` = ?


subtarefas
1.  Buscar todas as subtarefas:
SELECT * FROM tarefas

2.  Buscar uma subtarefa específica por ID:
SELECT * FROM tarefas WHERE lista_id = ?

3.  Atualizar uma subtarefa existente:
UPDATE tarefas SET `nome` = ?, `data_vencimento` = ?, `concluida` = ?, `lista_id` = ? WHERE `id` = ?

convites
1.  Buscar convites pendentes para um usuário específico:
SELECT * FROM convites
WHERE usuario_convidado_id = ? AND status = 'PENDENTE'

2.  Atualizar o status de um convite:
UPDATE convites
SET status = ?, data_resposta = NOW() 
WHERE id = ? AND usuario_convidado_id = ?
