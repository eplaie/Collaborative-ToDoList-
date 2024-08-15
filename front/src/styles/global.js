import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body, p, h2, h3, h4, h5, h6, a, span {
    color: white;
}

  h1 {
    color: #430064;
    
  }

  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: linear-gradient(to bottom right, #000000, #272227);
    margin: 0;
    overflow: hidden; 
  }
`;

export default Global;
