import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import palette from "./palette";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    display: relative;
  }
  body{
    font-family: 'Noto Sans KR', sans-serif;
    color: ${palette.gray[9]};
  }
  a {
    font-family: 'Noto Sans KR', sans-serif;
    color: inherit;
    text-decoration: none;
  }
  input, button {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
  }
  button{
    cursor: pointer;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
