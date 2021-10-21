import React, { useEffect } from "react";

function Alert({ color, msg, showAlert, tasks }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [tasks]);
  return (
    <div
      class={`alert alert-${color} p-1 px-5`}
      role="alert"
      style={{ position: "absolute", top: "40px" }}
    >
      {msg}
    </div>
  );
}

export default Alert;
