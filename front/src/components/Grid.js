import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { Fab, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";

// Componentes estilizados
const TableContainer = styled.div`
  width: 118%;
  background-color: #272227;
  padding: 20px;
  box-shadow: 0px 0px 5px #cccc;
  border-radius: 5px;
  max-width: 2000px;
`;

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
  margin-bottom: 10px;
`;

const TaskName = styled.div`
  flex: 2;
  text-align: center;
  width: 150px;
`;

const TaskDate = styled.div`
  flex: 3;
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

const ToggleButton = styled.div`
  cursor: pointer;
  color: #ccc;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const InfoText = styled.p`
  margin: 0;
  padding: 10px;
  flex: 1;
  margin-left: 400px;
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
  background: linear-gradient(to right, #9370db, #33ffff);
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
const Grid = ({ tarefas, setTarefas, setOnEdit }) => {
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [subtaskName, setSubtaskName] = useState("");
  const [subtaskDate, setSubtaskDate] = useState("");
  const [subtasks, setSubtasks] = useState({});
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [participantEmail, setParticipantEmail] = useState("");

  // Inicializa tarefas como um array vazio
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/tarefas?usuario_id=${localStorage.getItem(
            "UsuarioId"
          )}`
        );
        setTasks(response.data);
      } catch (error) {
        toast.error("Erro ao carregar tarefas.");
      }
    };

    fetchTarefas();
  }, []);

  const handleEdit = (tarefas) => {
    console.log(tarefas);
    setOnEdit(tarefas);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/tarefas/" + id);
      const newArray = tasks.filter((tarefa) => tarefa.id !== id);
      setTasks(newArray);
      toast.success("Tarefa excluída com sucesso.");
    } catch (error) {
      toast.error("Erro ao excluir tarefa.");
    }
    setOnEdit(null);
  };

  const toggleDetails = async (id) => {
    if (expandedItemId === id) {
      setExpandedItemId(null);
      setSubtasks((prevSubtasks) => ({ ...prevSubtasks, [id]: [] }));
    } else {
      setExpandedItemId(id);

      try {
        const response = await axios.get(
          `http://localhost:8800/subtarefas/${id}`
        );
        setSubtasks((prevSubtasks) => ({
          ...prevSubtasks,
          [id]: response.data || [], // Garante que seja sempre um array
        }));

        console.log(response);
        console.log(subtasks);
      } catch (error) {
        toast.error("Erro ao carregar subtarefas.");
      }
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedHeader(selectedHeader === itemId ? null : itemId);
    setOpenSnackbar(true);
  };

  const handleOpenModal = () => {
    const UsuarioId = localStorage.getItem("UsuarioId");
    console.log(UsuarioId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenShareModal = () => {
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };

  const handleSubtaskSubmit = async () => {
    try {
      await axios.post("http://localhost:8800/subtarefas", {
        nome: subtaskName,
        data_vencimento: subtaskDate,
        tarefa_id: expandedItemId,
      });
      toast.success("Sub-tarefa adicionada com sucesso!");
      handleCloseModal();

      const response = await axios.get(
        `http://localhost:8800/subtarefas/${expandedItemId}`
      );
      setSubtasks((prevSubtasks) => ({
        ...prevSubtasks,
        [expandedItemId]: response.data || [],
      }));
    } catch (error) {
      toast.error("Erro ao adicionar sub-tarefa.");
    }
  };

  const handleShareSubmit = async () => {
    try {
      const UsuarioId = localStorage.getItem("UsuarioId");
      if (!participantEmail) {
        toast.error("Por favor, insira o email do participante.");
        return;
      }

      const response = await axios.post("http://localhost:8800/compartilhar", {
        lista_id: expandedItemId, // ID da tarefa que está sendo compartilhada
        usuario_convidado_id: participantEmail, // Utilize o email como identificador por enquanto
      });

      if (response.status === 200) {
        toast.success("Participante adicionado com sucesso!");
        handleCloseShareModal();
      } else {
        toast.error("Erro ao adicionar participante.");
      }
    } catch (error) {
      toast.error("Erro ao adicionar participante.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <TableContainer>
      {tasks.length > 0
        ? tasks.map((item) => (
            <TaskContainer key={item.id}>
              <TaskHeader>
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <Checkbox
                    checked={selectedHeader === item.id}
                    onChange={() => handleCheckboxChange(item.id)}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <div style={{ display: "flex" }}>
                    <TaskName>{item.nome_lista}</TaskName>
                    <TaskName>
                      {item.compartilhado === 1 ? "Compartilhado" : ""}
                    </TaskName>
                  </div>
                </div>
                <TaskDate>
                  {/* {new Date(item.data_criacao).toLocaleDateString("pt-BR")} exibir data no principal */}
                </TaskDate>
                <TaskActions>
                  <FaEdit onClick={() => handleEdit(item)} />
                  <FaTrash onClick={() => handleDelete(item.id)} />
                </TaskActions>
                <MdGroupAdd
                  style={{ cursor: "pointer", marginLeft: "auto" }}
                  onClick={handleOpenShareModal}
                />
              </TaskHeader>

              <ToggleButton onClick={() => toggleDetails(item.id)}>
                {expandedItemId === item.id ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
                <span style={{ marginLeft: "5px" }}>Detalhes</span>
              </ToggleButton>
              <AdditionalInfo show={expandedItemId === item.id}>
                <InfoContainer>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add-subtask"
                    onClick={handleOpenModal}
                  >
                    +
                  </Fab>
                  <div>
                    <InfoText>
                      Data e Hora de Criação:{" "}
                      {new Date(item.data_criacao).toLocaleString("pt-BR")}
                    </InfoText>
                    <InfoText>
                      Data e Hora da Modificação:{" "}
                      {new Date(item.data_ultima_modificacao).toLocaleString(
                        "pt-BR"
                      )}
                    </InfoText>
                  </div>
                </InfoContainer>

                {Array.isArray(subtasks[expandedItemId]) &&
                  subtasks[expandedItemId].map((subtask, index) => (
                    <div
                      key={subtask.id}
                      style={{
                        marginTop: index !== 0 ? "15px" : "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }} // Espaçamento e alinhamento
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          sx={{
                            color: pink[800],
                            "&.Mui-checked": {
                              color: pink[600],
                            },
                          }}
                        />
                        <span style={{ marginLeft: "10px" }}>
                          {subtask.nome}
                        </span>
                      </div>
                      <span>
                        {new Date(subtask.data_vencimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                  ))}
              </AdditionalInfo>
            </TaskContainer>
          ))
        : "Nenhuma tarefa encontrada"}

      {/* Modal de Adicionar Sub-tarefa */}
      <CustomModal isOpen={modalOpen}>
        <ModalContent>
          <ModalTitle>Adicionar Sub-tarefa</ModalTitle>
          <Input
            type="text"
            placeholder="Nome da Sub-tarefa"
            value={subtaskName}
            onChange={(e) => setSubtaskName(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Data de Vencimento"
            value={subtaskDate}
            onChange={(e) => setSubtaskDate(e.target.value)}
          />
          <ActionButtons>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubtaskSubmit}
            >
              Adicionar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </ActionButtons>
        </ModalContent>
      </CustomModal>

      {/* Modal de Compartilhamento */}
      <CustomModal isOpen={shareModalOpen}>
        <ModalContent>
          <ModalTitle>Compartilhar Tarefa</ModalTitle>
          <Input
            type="email"
            placeholder="Email do Participante"
            value={participantEmail}
            onChange={(e) => setParticipantEmail(e.target.value)}
          />
          <ActionButtons>
            <Button onClick={handleShareSubmit} variant="contained">
              Compartilhar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseShareModal}
            >
              Cancelar
            </Button>
          </ActionButtons>
        </ModalContent>
      </CustomModal>

      {/* Snackbar de Notificação */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          Tarefa concluida com sucesso!
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default Grid;
