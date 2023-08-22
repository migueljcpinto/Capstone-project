import { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

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
    min-height: 100vh;
    max-width: 50rem;
  }
`;
