import React, { useState } from "react";
import styled from "styled-components";
import todolistImage from "../images/todolist.png";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #141414;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #141414;
  color: white;
  padding: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  color: white;
  padding: 50px;
`;

const Image = styled.img`
  width: 90%;
  max-width: 505px;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.h3`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ccc;
  margin-bottom: 30px;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
`;

const Icon = styled.span`
  margin-right: 10px;
  color: #333;
`;

const Input = styled.input`
  border: none;
  background: none;
  width: 100%;
  outline: none;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 18px;
  background-color: #000000;
  color: white;
  border: 3px solid white;
  border-radius: 15px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin-top: 30px;
  text-align: center;
`;

const CustomModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalTitle = styled.h2`
  color: #430064;
  margin-bottom: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setEmail(""); // Limpar 
    setPassword(""); 
    setError(""); 
  };

  const handleClose = () => setOpen(false);

  const handleLogin = async () => {
    try {
      setError(""); // Limpar erros anteriores
      setSuccess(""); 

      const response = await axios.post("http://localhost:8800/login", {
        email,
        senha: password,
      });
      if (response.status === 200) {
        
      localStorage.setItem('UsuarioId', response.data.id);
        
      localStorage.setItem('UsuarioNome', response.data.nome);

        window.location.href = "http://localhost:3000/home";
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.response ? error.response.data : error.message);
      setError("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
    }
  };

  const handleRegister = async () => {
    try {
      setError(""); // Limpar erros anteriores
      setSuccess(""); 
      console.log({
        nome: name,
        email,
        fone: phone,
        senha: password,
      });
      const response = await axios.post("http://localhost:8800/register", {
        nome: name,
        email,
        fone: phone,
        senha: password,
      });
      console.log("Cadastro realizado com sucesso:", response.data);
      setSuccess("Cadastro realizado com sucesso!");

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      console.error(
        "Erro ao cadastrar:",
        error.response ? error.response.data : error.message
      );
      setError("Erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <Container>
      <LeftSection>
        <Title>Bem-Vindo de volta!</Title>
        <Image src={todolistImage} alt="To Do List" />
        <Button onClick={handleOpen}>Entrar</Button>
      </LeftSection>
      <RightSection>
        <Title>Crie sua conta</Title>
        <Subtitle>Preencha seus dados</Subtitle>
        <InputContainer>
          <Icon>👤</Icon>
          <Input
            type="text"
            placeholder="Insira seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Icon>📧</Icon>
          <Input
            type="email"
            placeholder="Insira seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Icon>📞</Icon>
          <Input
            type="tel"
            placeholder="Insira seu telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Icon>🔒</Icon>
          <Input
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <Button onClick={handleRegister}>Cadastrar</Button>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </RightSection>

      <CustomModal isOpen={open}>
        <ModalContent>
          <ModalTitle>Login</ModalTitle>
          <Input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ActionButtons>
            <Button onClick={handleLogin}>Entrar</Button>
            <Button onClick={handleClose}>Voltar</Button>
          </ActionButtons>
        </ModalContent>
      </CustomModal>
    </Container>
  );
};

export default Login;
