import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/globalStyle";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// React 17
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

const rootNode = document.getElementById("root")!;

ReactDOM.createRoot(rootNode).render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);

reportWebVitals();
