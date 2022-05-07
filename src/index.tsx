import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/globalStyle";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./redux";
import { Provider } from "react-redux";
import { myInfo } from "./api/auth";
import { loadSetUser, override } from "./redux/user";

// React 17
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

const rootNode = document.getElementById("root")!;

const store = createStore(rootReducer);

function loadUser() {
  let token = localStorage.getItem("Authorization");

  if (!token) return;

  // API 호출
  myInfo(token as string)
    .then((res) => {
      // @ts-ignore
      store.dispatch(setUser(res));
    })
    .catch((err) => {
      console.warn(err);
    });
}
loadUser();

ReactDOM.createRoot(rootNode).render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);

reportWebVitals();
