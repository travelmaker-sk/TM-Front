import App from "./App";
import GlobalStyle from "./styles/globalStyle";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./redux";
import { Provider } from "react-redux";

const rootNode = document.getElementById("root")!;

const store = createStore(rootReducer);

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
