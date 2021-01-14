import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const DATA = [
  { id: "1", name: "Reading", completed: true, isEditing: false },
  { id: "2", name: "Thinking", completed: false, isEditing: false },
  { id: "3", name: "Writing", completed: false, isEditing: false },
];

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById("root")
);
