// import React, { useState } from "react";

// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #272227;
//   color: #fff;
// `;

// const Title = styled.h1`
//   margin-bottom: 20px;
//   font-size: 24px;
// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #bbb;
//   border-radius: 5px;
//   margin-bottom: 20px;
//   width: 300px;
//   height: 40px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   cursor: pointer;
//   border-radius: 5px;
//   border: none;
//   background-color: #3399FF;
//   color: white;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const AddTarefas = () => {
//   const [inputValue, setInputValue] = useState("");
//   const navigate = useNavigate();

//   const handleCreate = () => {
//     if (inputValue.trim()) {
//       navigate("/form");
//     } else {
//       alert("Por favor, insira uma tarefa.");
//     }
//   };

//   return (
//     <Container>
//       <Title>Vamos adicionar uma tarefa?</Title>
//       <Input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Digite a tarefa aqui"
//       />
//       <Button onClick={handleCreate}>Create</Button>
//     </Container>
//   );
// };

// export default AddTarefas;
