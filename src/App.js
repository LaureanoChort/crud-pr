import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import { FcList } from "react-icons/fc";

const getLocalStorage = () => {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    return (tasks = JSON.parse(localStorage.getItem("tasks")));
  } else {
    return [];
  }
};

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ state: false, color: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      showAlert(true, "danger", "Ingrese una tarea por favor.");
    } else if (task && isEditing) {
      setTasks(
        tasks.map((item) => {
          if (item.id === editID) {
            return { ...item, title: task };
          }
          return item;
        })
      );
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "warning", "Se ha editado la tarea.");
      setTask("");
    } else {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      showAlert(true, "success", "Tarea agregada!");
      setTask("");
    }
  };

  const showAlert = (state, color, msg) => {
    setAlert({ state, color, msg });
  };

  const removeTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    showAlert(true, "danger", "Se ha eliminado la tarea.");
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditID(id);
    setIsEditing(true);
    setTask(taskToEdit.title);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="container d-flex flex-column align-items-center justify-content-start pt-5">
      {alert.state && <Alert tasks={tasks} showAlert={showAlert} {...alert} />}
      <section className="row col-sm-12 col-md-6 text-center mt-5 p-2 border shadow p-3 mb-5 bg-body rounded">
        <div className="container d-flex align-items-center justify-content-center mb-2">
          <h3 className="fw-bold mt-2">Lista de tareas</h3>
          <FcList className="fs-4 ms-2" />
        </div>
        <form className="d-flex gap-2" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Ej: Pasear al perro"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className={
              isEditing ? "btn btn-warning text-white" : "btn btn-primary"
            }
          >
            {isEditing ? "Guardar" : "Agregar"}
          </button>
        </form>
        <div className="mt-3">
          <List
            tasks={tasks}
            removeTask={removeTask}
            editTask={editTask}
            showAlert={showAlert}
          />
        </div>
        {tasks.length > 0 && (
          <button
            className="btn btn-outline-danger w-25 mx-auto my-3"
            onClick={() => {
              setTasks([]);
              showAlert(true, "danger", "Se eliminaron todas las tareas.");
            }}
          >
            Vaciar lista
          </button>
        )}
      </section>
    </main>
  );
}

export default App;
