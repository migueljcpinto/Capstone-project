import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    display: grid;
    margin: auto;
    font-family: system-ui;
    place-items: center;
    min-height: 110vh;
    max-width: 50rem;
    background-color: #fafafc;

  }
`;
