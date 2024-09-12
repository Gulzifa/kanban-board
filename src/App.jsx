import "./App.css";
import { useState, useEffect } from "react";
import Column from "./Components/column/Column";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskPage from "./Components/taskPage/TaskPage";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";

const taskStatuses = ["Backlog", "Ready", "In Progress", "Finished"];
const initialTasks = []
function App() {
  //если есть задачи в localstorage, то восстанавливаем их
  const savedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(
    savedTasks ? JSON.parse(savedTasks) : initialTasks
  );

  //сохранить в localStorage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  //добавление новой задачи
  const onClickSubmit = (task) => {
    const newId = Math.floor(Math.random() * 100000);
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...task, id: newId, title: task.title, status: "Backlog" },
    ]);
  };

  //перенос задачи
  const handleSelectChange = (movedTaskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === movedTaskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // обновить существующую задачу
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="layout">
          <Header />
          <Routes>
            <Route
              index
              element={
                <div className="main">
                  <div className="main__columns">
                    {taskStatuses.map((status) => (
                      <Column
                        key={status}
                        tasks={tasks.filter((task) => task.status === status)}
                        taskId={tasks.id}
                        status={status}
                        allTasks={tasks}
                        statuses={taskStatuses}
                        onSubmit={onClickSubmit}
                        onSelectChange={handleSelectChange}
                      />
                    ))}
                  </div>
                </div>
              }
            />
            {tasks.map((task) => (
              <Route
                key={task.id}
                path={`/tasks/${task.id}`}
                element={<TaskPage task={task} updateTask={updateTask} />}
              />
            ))}
          </Routes>
          <Footer tasks={tasks} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
