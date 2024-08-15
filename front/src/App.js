import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaDatabase } from 'react-icons/fa';


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 48px; /* Ajuste o tamanho do ícone conforme necessário */
  color: #33FFFF; /* Defina a cor do ícone diretamente */
  margin-right: 10px; /* Espaço entre o ícone e o título */
`;


const Title = styled.h2`
  color: transparent; /* Torna o texto transparente para mostrar o gradiente */
  font-size: 48px;    /* Ajuste o tamanho da fonte conforme necessário */
  font-family: 'Arial', sans-serif; /* Altere para a fonte desejada */
  line-height: 1.5;   /* Ajusta a altura da linha */
  padding: 20px 0;    /* Espaço acima e abaixo do título */
  text-align: center; /* Centraliza o título */

  /* Gradiente de cor */
  background: linear-gradient(to right, #9370DB, #33FFFF);
  -webkit-background-clip: text; /* Aplica o gradiente ao texto no WebKit */
  background-clip: text; /* Aplica o gradiente ao texto */
  display: flex; /* Usa flexbox para alinhar o ícone e o título */
  align-items: center; /* Alinha o ícone e o texto verticalmente */
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
      <Title>
        <IconContainer>
          <FaDatabase />
        </IconContainer>
        TODOLIST
      </Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      {toast && toast.POSITION && (
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      )}
      <GlobalStyle />
    </>
  );
  
}

export default App;
