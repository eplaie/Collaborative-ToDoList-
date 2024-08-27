1. Inserção de um novo usuário
INSERT INTO usuarios (`nome_usuario`, `email`, `telefone`, `senha`) VALUES (?)

2. Inserção de uma nova tarefa
INSERT INTO listas(`nome_lista`, `usuario_criador_id`) VALUES (?)

3. Inserção de uma nova subtarefa
INSERT INTO tarefas (`nome`, `data_vencimento`, `concluida`, `lista_id`) VALUES (?, ?, ?, ?)

4. Inserção de um novo convite
INSERT INTO convites (`lista_id`, `usuario_convidado_id`) VALUES (?, ?)
