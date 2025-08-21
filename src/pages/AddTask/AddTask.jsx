import React, { useContext } from "react";
import { CiBoxList } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import style from "./AddTask.module.css";
import { ThemeContext } from "../../components/context/ThemeContext";
import { toast } from "react-toastify";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function AddTask() {
  const { darkMode } = useContext(ThemeContext);

  const validationSchema = Yup.object({
    taskText: Yup.string().required("Task is required"),
  });

  const addTask = async (taskText, resetForm) => {
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

      resetForm();
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
      

        <Formik
          initialValues={{ taskText: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            addTask(values.taskText, resetForm);
          }}
        >
          <Form className={style.taskBox}>
            <Field
              name="taskText"
              className={style.taskInput}
              placeholder="Add your task . . ."
            />
            <ErrorMessage
              name="taskText"
              component="p"
              className={style.error}
            />

            <button
              className={`${style.addBtn} ${darkMode ? style.dark : ""}`}
              type="submit"
            >
              ADD <IoMdAdd />
            </button>
          </Form>
        </Formik>


      </div>
    </header>
  );
}
