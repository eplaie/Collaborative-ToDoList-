import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaDatabase } from 'react-icons/fa';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login.js";

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
  font-size: 48px;
  color: #33FFFF;
  margin-right: 10px;
`;

const Title = styled.h2`
  color: transparent;
  font-size: 48px;
  font-family: 'Arial', sans-serif;
  line-height: 1.5;
  padding: 20px 0;
  text-align: center;
  background: linear-gradient(to right, #9370DB, #33FFFF);
  -webkit-background-clip: text;
  background-clip: text;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? (
            <Container>
              <Title>
                <IconContainer>
                  <FaDatabase />
                </IconContainer>
                TODOLIST
              </Title>
              <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
              <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
              {toast && toast.POSITION && (
                <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
              )}
            </Container>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
