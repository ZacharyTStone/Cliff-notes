import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FetchApp from "./FetchApp.tsx";
import AsycnApp from "./AsyncApp.tsx";
import CliffAsyncApp from "./CliffAsyncApp";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <>
      {/* <FetchApp /> */}
      {/* <AsycnApp /> */}
      <CliffAsyncApp />
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
