import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./lib/store";
import { Provider } from "react-redux";
import { SkynetProvider } from "./lib/skynetContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SkynetProvider>
                <App />
            </SkynetProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
