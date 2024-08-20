import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Fab, Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';

// Componentes estilizados
const TableContainer = styled.div`
  width: 112vh;
  background-color: #272227;
  padding: 70px;
  box-shadow: 0px 0px 5px #cccc;
  border-radius: 5px;
  max-width: 2000px;
`;

// const HeaderRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px;
//   background-color: #333;
//   color: #fff;
//   font-weight: bold;
//   border-radius: 5px;
//   margin-bottom: 8px;
// `;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #272227;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 8px;
  box-shadow: 0px 0px 5px #cccc;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
`;

const TaskName = styled.div`
  flex: 2;
  text-align: left;
`;

const TaskDate = styled.div`
  flex: 8;
  text-align: center;
`;

const TaskActions = styled.div`
  flex: 1;
  text-align: center;
`;

const AdditionalInfo = styled.div`
  padding: 10px;
  background-color: #333;
  color: #ccc;
  border-radius: 5px;
  margin-top: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Spacer = styled.div`
  margin-left: 20px;
`;

const ToggleButton = styled.div`
  cursor: pointer;
  color: #ccc;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const InfoText = styled.p`
  margin: 10;
  text-align: right;
  padding-left: 400px; /* Espaço entre o ícone e o texto */
  flex: 1;
`;

const CustomModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  background: linear-gradient(to right, #9370DB, #33FFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ActionButtons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// Componente Grid
const Grid = ({ users, setUsers, setOnEdit }) => {
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    // Lógica para deletar o item
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const toggleDetails = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedHeader(selectedHeader === itemId ? null : itemId);
    setOpenSnackbar(true);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddSubtask = () => {
    // Lógica para adicionar uma sub-tarefa
    handleOpenModal();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const sortedUsers = [...users].sort((a, b) => {
    const priorityA = selectedHeader === a.id;
    const priorityB = selectedHeader === b.id;

    if (priorityA !== priorityB) {
      return priorityA ? 1 : -1;
    }

    return new Date(a.data_tarefa) - new Date(b.data_tarefa);
  });

  return (
    <TableContainer>
      {sortedUsers.map((item) => (
        <TaskContainer key={item.id}>
          <TaskHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={selectedHeader === item.id}
                onChange={() => handleCheckboxChange(item.id)}
                sx={{
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
              />
              <TaskName>{item.nome}</TaskName>
            </div>
            <TaskDate>{new Date(item.data_tarefa).toLocaleDateString('pt-BR')}</TaskDate>
            <TaskActions>
              <FaEdit onClick={() => handleEdit(item)} />
              <FaTrash onClick={() => handleDelete(item.id)} />
            </TaskActions>
          </TaskHeader>
          <ToggleButton onClick={() => toggleDetails(item.id)}>
            {expandedItemId === item.id ? <FaChevronUp /> : <FaChevronDown />}
            <span style={{ marginLeft: '5px' }}>Detalhes</span>
          </ToggleButton>
          <AdditionalInfo show={expandedItemId === item.id}>
            <InfoContainer>
              <Fab
                size="small"
                color="primary"
                aria-label="add-subtask"
                onClick={handleAddSubtask}
              >
                +
              </Fab>
              <Spacer />
              <div>
                <InfoText>Data e Hora de Criação: {new Date(item.data_criacao).toLocaleString('pt-BR')}</InfoText>
                <InfoText>Data e Hora da Modificação: {item.data_modificacao ? new Date(item.data_modificacao).toLocaleString('pt-BR') : "Ainda não modificado"}</InfoText>
                <InfoText>Quem modificou: {item.quem_modificou || "Desconhecido"}</InfoText>
              </div>
            </InfoContainer>
          </AdditionalInfo>
        </TaskContainer>
      ))}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Você concluiu sua tarefa!
        </Alert>
      </Snackbar>

      <CustomModal isOpen={modalOpen}>
        <ModalContent>
          <ModalTitle>Adicionar uma Sub-Tarefa</ModalTitle>
          <Input
            type="text"
            placeholder="Nome da Tarefa"
          />
          <Input
            type="date"
            placeholder="Data"
          />
          <ActionButtons>
            <Button onClick={() => { /* Adicionar lógica de cadastro */ }}>Cadastrar</Button>
            <Button onClick={handleCloseModal}>Voltar</Button>
          </ActionButtons>
        </ModalContent>
      </CustomModal>
    </TableContainer>
  );
};

export default Grid;
