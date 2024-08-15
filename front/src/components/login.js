import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #33FFFF;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Substitua esta parte pela lógica correta de verificação de login
    if (username === "usuario" && password === "senha") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      <Input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Entrar</Button>
    </LoginContainer>
  );
}

export default Login;
