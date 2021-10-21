import React from "react";

function List({ tasks, removeTask, editTask }) {
  return (
    <>
      {tasks.map((task) => {
        const { id, title } = task;
        return (
          <article
            key={id}
            className="task-list d-flex p-2 align-items-center justify-content-between shadow-sm mb-2 bg-body rounded"
          >
            <h6 className="mb-0">{title}</h6>
            <div className="btn-container ">
              <button
                className="btn btn-warning btn-sm ms-1 text-white"
                onClick={() => editTask(id)}
              >
                Editar
                {/* <FiEdit2 style={{ color: "white" }} /> */}
              </button>
              <button
                className="btn btn-danger btn-sm ms-1"
                onClick={() => removeTask(id)}
              >
                Eliminar
                {/* <RiDeleteBin7Line /> */}
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default List;
