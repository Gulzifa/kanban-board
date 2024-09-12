import { useRef, useState, useEffect } from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import "./column.css";

function Column(props) {
  const refInput = useRef(null);
  const [addBtn, setAddBtn] = useState(true);

  const onClickAddBtn = () => {
    setAddBtn((addBtnValue) => !addBtnValue);
  };

  const onClickSubmitBtn = () => {
    if (refInput.current.value) {
      props.onSubmit({ title: refInput.current.value });
    }
    setAddBtn((addBtnValue) => !addBtnValue);
  };

  useEffect(() => {
    if (addBtn && refInput.current) {
      refInput.current.focus();
    }
  }, [addBtn]);

  //определяем предыдущий статус
  const indexOfStatuses = props.statuses.indexOf(props.status);
  const previousStatus = props.statuses[indexOfStatuses - 1] || null;

  //предыдущие задачи
  const previousTasks = previousStatus
    ? props.allTasks.filter((task) => task.status === previousStatus)
    : [];

  return (
    <div className="column__wrapper">
      <h3 className="column__title">{props.status}</h3>

      {props.tasks.map((task) => (
        <div className="column__task" key={task.id}>
          <div className="task-content">
            <Link className="task__title" to={`/tasks/${task.id}`}>
              {task.title}
            </Link>
          </div>
        </div>
      ))}

      {/* для backlog */}
      {!addBtn && props.status === "Backlog" && (
        <input
          type="text"
          ref={refInput}
          placeholder="Enter task"
          className="task__input"
        />
      )}

      {props.status === "Backlog" && (
        <Button
          btnName={addBtn ? "+Add card" : "Submit"}
          btnStyle={addBtn ? "btn btn-add" : "btn btn-submit"}
          onClick={addBtn ? onClickAddBtn : onClickSubmitBtn}
        />
      )}

      {/* для следующих статусов */}
      {addBtn && props.status !== "Backlog" && (
        <Button
          btnName="+Add card"
          btnStyle="btn btn-add"
          onClick={onClickAddBtn}
          disabled={previousTasks.length === 0 ? true : false}
        />
      )}

      {!addBtn && indexOfStatuses > 0 && (
        <select
          key={props.status}
          className="task__select"
          onChange={(e) => {
            const movingTaskId = Number(e.target.value);
            props.onSelectChange(movingTaskId, props.status);
            setAddBtn((addBtnValue) => !addBtnValue);
          }}
        >
          <option className="task__default-option">Click to choose</option>
          {previousTasks.map((task) => (
            <option value={task.id} key={task.id} className="task__option" >
              {task.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default Column;
