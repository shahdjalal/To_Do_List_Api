import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./TaskList.module.css";
import {
  MdCheckBox,
  MdDeleteForever,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineChecklist,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BounceLoader, FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
export default function TaskList() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);

  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;
  const currentPost = data.slice(firstTaskIndex, lastTaskIndex);
  // get tasks
  const getTasks = async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/todos");
      setData(data.todos);
      console.log(data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = currentPost.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "notCompleted") return !task.completed;
  });

  // delete
  const deleteTask = async (id) => {
    const { data } = await axios.delete(`https://dummyjson.com/todos/${id}`);
    setData((prev) => prev.filter((task) => task.id !== id));
    toast.error("Task deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const toggleComplete = (id) => {
    setData((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // delete completed tasks
  const deleteCompleted = () => {
    const remainingTasks = data.filter((task) => !task.completed);
    setData(remainingTasks);
    toast.error("Completed Tasks has been deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  if (isLoading) {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FadeLoader />
      </div>
    );
  }

  return (
    <>
      <div className="container">
         {error? <div className={style.error}>{error}</div> : ' '  }
        <div className={style.title}>
          <h2>
            <MdOutlineChecklist /> all tasks
          </h2>
          <div className={style.tasksButtons}>
            <select
              className={style.filterSelect}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="notCompleted">Not Completed</option>
            </select>

            <button
              className={style.deleteCompletedBtn}
              onClick={() => deleteCompleted()}
            >
              <MdOutlineDeleteForever title="Delete task" /> delete Completed
              tasks
            </button>
          </div>
        </div>

        <div className="row">
          {filteredTasks.map((task, index) => (
            <div key={index} className={style.task}>
              <div className={style.taskRow}>
                <button
                  onClick={() => toggleComplete(task.id)}
                  aria-label={
                    task.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                  className={style.checkIcon}
                >
                  {task.completed ? (
                    <MdCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )}
                </button>

                <span
                  className={` ${
                    task.completed ? `${style.completedTask}` : ""
                  }`}
                >
                  {task.todo}
                </span>

                <div>
                  <button
                    className={style.edit}
                    onClick={() => startEdit(index)}
                    key={index}
                  >
                    <FaEdit title="edit task" />
                  </button>
                  <button
                    className={style.delete}
                    onClick={() => deleteTask(task.id)}
                    key={index}
                  >
                    <MdDeleteForever title="Delete task" />
                  </button>
                </div>
              </div>
              <Link to={`/details/${task.id}`} className={style.details}>Details</Link>
            </div>
          ))}
        </div>

        <Pagination
          totalTasks={data.length}
          tasksPerPage={tasksPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
