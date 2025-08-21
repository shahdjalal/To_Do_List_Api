import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import { ThemeContext } from "../../components/context/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
    
  return (


<div  className={`${style.container} ${darkMode ? style.dark : ""}`}>
      <h1 className={style.title}>My To-Do list App</h1>
      <p className={style.description}>
        Welcome! This app helps you manage your tasks easily. You can add, edit, delete, and track completed tasks.
      </p>
      <button
        className={style.navigateBtn}
        onClick={() => navigate("/all")}
      >
        Go to Tasks
      </button>
    </div>
  
    
  );
}
