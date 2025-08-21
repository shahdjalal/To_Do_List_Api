import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <h1 className={style.title}>About My To-Do App</h1>
      <p className={style.description}>
        This To-Do App is built with React and Axios. It lets you manage your daily tasks efficiently, filter completed or pending tasks, and view details of each task.
      </p>
      <button
        className={style.navigateBtn}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
