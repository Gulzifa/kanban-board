import React from "react"
import { useEffect, useState } from "react"
import "./footer.css"

const Footer = ( {tasks}) => {
  const [activeTasks, setActiveTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)

  const autor = 'G.Akhmetova'
  const date = new Date().getFullYear()

  useEffect(() => {
    const activeTasks = tasks.filter((task) => task.status === 'Backlog')
    setActiveTasks(activeTasks.length)
    const finichedTasks = tasks.filter((task) => task.status === 'Finished')
    setCompletedTasks(finichedTasks.length)
  }, [tasks])


  return (
    <div className="footer">
      <div className="footer__line">
      <p className="footer__text">Active tasks: № {activeTasks}</p>
      <p className="footer__text">Finished tasks: № {completedTasks}</p>
      </div>
      <p>Kanban board by: {autor}, {date}</p>

    </div>
  )
}


export default Footer