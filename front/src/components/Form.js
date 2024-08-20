import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { CgAdd } from "react-icons/cg";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
  background-color: #272227;
  padding: 42px;
  box-shadow: 0px 0px 5px #cccc;
  border-radius: 5px;
  width: 113%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 350px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 42px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #ffffff;
`;

const Button = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #3399ff;
  color: white;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 15px;
  
  svg {
    color: #33ffff;
  }
`;

const Form = ({ getUsers, onEdit, setOnEdit, userLoggedId }) => {  
  
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome_lista;
      user.data_tarefa.value = onEdit.data_criacao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.nome.value || !user.data_tarefa.value) {
      return toast.warn("Preencha todos os campos!");
    }

    const tarefaData = {
      nome_lista: user.nome.value,
      data_criacao: user.data_tarefa.value,
      data_ultima_modificacao: new Date().toISOString().slice(0, 10),
      // usuario_criador_id: userLoggedId,  // Use o ID do usuário logado aqui
    };

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/tarefas/${onEdit.id}`, tarefaData);
        toast.success("Tarefa atualizada com sucesso.");
      } else {
        await axios.post("http://localhost:8800/tarefas", tarefaData);
        toast.success("Tarefa criada com sucesso.");
      }
    } catch (error) {
      console.error(error.response.data); // Exibe o erro no console
      toast.error("Erro ao salvar a tarefa.");
    }

    user.nome.value = "";
    user.data_tarefa.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <InputGroup>
          <Label>Nome da tarefa</Label>
          <Input name="nome" />
        </InputGroup>
        <InputGroup>
          <Label>Data da tarefa</Label>
          <Input name="data_tarefa" type="date" />
        </InputGroup>
        <Button type="submit">
          <CgAdd />
          Create
        </Button>
      </InputArea>
    </FormContainer>
  );
};

export default Form;