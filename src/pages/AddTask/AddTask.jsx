import React, { useContext } from "react";
import { CiBoxList } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import style from "./AddTask.module.css";
import { ThemeContext } from "../../components/context/ThemeContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function AddTask() {
  const { darkMode } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const addTask = async (taskText) => {
    if (!taskText.trim()) {
      toast.error("Task cannot be empty!", { autoClose: 2000 });
      return;
    }

    try {
      const res = await axios.post("https://dummyjson.com/todos/add", {
        todo: taskText,
        completed: false,
        userId: 5,
      });

      console.log("Added:", res.data);

      toast.success("Task added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add task!", { autoClose: 2000 });
    }
  };

  return (
    <header className="header" id="task-form">
      <div className="container">
        <p className={style.typewriter}>
          <CiBoxList className={style.taskIcon} /> What do you want to achieve
          today ...
        </p>
        <form
          onSubmit={handleSubmit((data) => addTask(data.taskText))}
          className={style.taskBox}
        >
          <input
            {...register("taskText", { required: "Task is required" })}
            className={style.taskInput}
            placeholder="Add your task . . ."
          />
          <button
            className={`${style.addBtn} ${darkMode ? style.dark : ""}`}
            type="submit"
          >
            ADD <IoMdAdd />
          </button>
        </form>
        {errors.taskText && (
          <p className={style.error}>{errors.taskText.message}</p>
        )}
      </div>
    </header>
  );
}
