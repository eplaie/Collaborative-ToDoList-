import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { CgAdd } from "react-icons/cg";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-start; /* Alinha ao topo */
  gap: 30px; /* Espaçamento entre os elementos */
  flex-wrap: wrap;
  background-color: #272227;
  padding: 42px;
  box-shadow: 0px 0px 5px #cccc;
  border-radius: 5px;
  width: 113%; 
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column; /* Coloca o label em cima do input */
  gap: 5px; /* Espaçamento entre o label e o input */
  margin-bottom: 10px; /* Espaçamento na parte inferior */
`;

const InputArea = styled.div`
  display: flex;
  align-items: center; /* Alinha o botão ao centro dos inputs */
  gap: 10px; /* Espaçamento entre os elementos */
`;

const Input = styled.input`
  width: 350px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 42px; /* Mesma altura do botão */
`;

const Label = styled.label`
  font-size: 14px;
  color: #ffffff; /* Cor do texto do label */
`;

const Button = styled.button`
  padding: 10px 30px; 
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #3399FF;
  color: white;
  height: 42px; 
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 15px; 
  
  svg {
    color: #33FFFF;
  }
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.data_tarefa.value = onEdit.data_tarefa;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.data_tarefa.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          data_tarefa: user.data_tarefa.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          data_tarefa: user.data_tarefa.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
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
