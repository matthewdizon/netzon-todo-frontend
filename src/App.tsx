import { useState, useEffect } from 'react';
import './App.css';
import styled from "styled-components"
import { createNumericLiteral } from 'typescript';

const TaskBoxContainer = styled.div`
  .taskbox-headers {
    display: flex;
    justify-content: space-evenly;

    .tab {
      width: 50%;
      text-transform: uppercase;

      :hover{
        border-bottom: solid 3px white;
        cursor: pointer;
      }
    }

    .active-tab {
      color: white;
      border-bottom: solid 3px white;
    }
  }
`

const TaskBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  :hover {
    background: #14213d;
    cursor: pointer;
  }
`
const defaultTasks = [
  {
    title: "Work on Todo",
    done: false,
    // deadline: new Date(2018, 11, 24, 10, 33, 30, 0),
    deadline: new Date(Date.now()).toLocaleString(),
    date_finished: 0,
  },
]

function App() {


  const [taskInput, setTaskInput] = useState("")
  const [tasks, setTasks] = useState(defaultTasks)
  const [tab, setTab] = useState(0)
  console.log(tasks)

  const saveInput = (e) => {
    setTaskInput(e.target.value)
  };

  const handleKeypress = (e) => {
    console.log("keycode: ", e.keyCode)
    console.log("here:", e.code)
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      console.log("enter")
      if (taskInput !== ""){
        addTask();
      }
    }
  };


  const setBool = (title) => {
    const curr_task = tasks.find(e => {return( e.title === title )})
    if (curr_task) {
      curr_task.done = !curr_task.done
    }
  }

  const addTask = () => {
    const currTask = {
      title: taskInput,
      done: false,
      // deadline: new Date(2018, 11, 24, 10, 33, 30, 0),
      deadline: new Date(Date.now()).toLocaleString(),
      date_finished: Date.now(),
    }

    // Add New Task
    tasks.push(currTask)

    // Clear input field
    setTaskInput("")
  };

  useEffect(() => {
    console.log("hello")
  }, [tasks])

  const Task = ({index, title, done, deadline, date_finished}) => {
    return(
      <TaskBox>
        <input type="checkbox" defaultChecked={done} onChange={() => setBool(title)}/>
        <p>{title}</p>
        {/* <p>{new Date(deadline).toLocaleString()}</p> */}
        {/* <input type="datetime-local" defaultValue={Date.now()} onChange={e => console.log(e.target.value)}/> */}
        <input type="datetime-local" value={deadline} onChange={e => console.log(e.target.value)}/>
        {/* <input type="datetime-local" defaultValue={Date.now()} onChange={e => console.log()}/> */}
        {done ? (<p>{new Date(date_finished).toLocaleString()}</p>) : null}
      </TaskBox>
    )
  }

  const renderUncompletedTasks = () => {
    const uncompletedTasks = tasks.filter((task) => task.done === false)

    console.log(uncompletedTasks.length)
    if (uncompletedTasks.length !== 0){
      return(
        <div>
          {uncompletedTasks.map((task, index) => {
            return(
              <Task
                key={index}
                index={index}
                title={task.title}
                done={task.done}
                deadline={task.deadline}
                date_finished={task.date_finished}
              />
            )
          })}
        </div>
      )
    } else {
      return (
        <h1>No Tasks</h1>
      )
    }
  }

  const renderCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => task.done === true)

    console.log(completedTasks.length)
    if (completedTasks.length !== 0){
      return(
        <div>
          {completedTasks.map((task, index) => {
            return(
              <Task
                key={index}
                index={index}
                title={task.title}
                done={task.done}
                deadline={task.deadline}
                date_finished={task.date_finished}
              />
            )
          })}
        </div>
      )
    } else {
      return (
        <h1>No Cleared Tasks</h1>
      )
    }
  }

  return (
    <div className="App">
      <div>
        <h1>To-Do List</h1>
        <div>
          <input type="text" value={taskInput} onChange={e => saveInput(e)} onKeyPress={e => handleKeypress(e)} />
          <button onClick={() => addTask()}>Add Task</button>
        </div>
        <TaskBoxContainer>
          <div className="taskbox-headers">
            <p onClick={() => setTab(0)} className={tab === 0 ? "tab active-tab" : "tab"}>Tasks</p>
            <p onClick={() => setTab(1)} className={tab === 1 ? "tab active-tab" : "tab"}>Cleared</p>
          </div>
          {tab === 0 ? renderUncompletedTasks() : renderCompletedTasks()}
        </TaskBoxContainer>
      </div>
    </div>
  );
}

export default App;
