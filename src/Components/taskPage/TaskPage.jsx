import React, { useEffect, useState } from "react";
import "./taskpage.css";
const TaskPage = ({ task, updateTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
      setTitle(task.title);
      setDescription(task.description);
  }, [task.id]);

   //Сохранить в localstorage
   const saveToLocalStorage = () => {
    const updatedTask = {
      id: task.id,
      title: title,
      description: description,
    };
    localStorage.setItem(`task-${task.id}`, JSON.stringify(updatedTask));
  };

    useEffect(() => {
      saveToLocalStorage();

      const updatedTask = { ...task, title, description };
      updateTask(updatedTask);
    }, [title, description]); 


  return (
    <div key={task.id} className="task-page">
      <p className="task-page__param">Task name:</p>
      <textarea
        className="task-page__title textarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className="task-page__param">Task description:</p>
      <textarea
        className="task-page__description textarea"
        value={description ? description : "This task has no description"}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="exit-btn" onClick={() => window.history.back()}>
        X
      </button>
    </div>
  );
};

export default TaskPage;
