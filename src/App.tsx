import { useState, useEffect } from 'react';
import './App.css';
import styled from "styled-components"

const TaskBoxContainer = styled.div`
  .taskbox-headers {
    display: flex;
    justify-content: space-evenly;

    .tab {
      text-transform: uppercase;

      :hover{
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
    deadline: Date.now(),
  },
]

function App() {

  const [taskInput, setTaskInput] = useState("")
  const [tasks, setTasks] = useState(defaultTasks)
  const [tab, setTab] = useState(0)

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


  const setBool = (index) => {
    console.log(tasks[index])
    tasks[index].done = !tasks[index].done
    // tasks[index]
  }

  const addTask = () => {
    const currTask = {
      title: taskInput,
      done: false,
      // deadline: new Date(2018, 11, 24, 10, 33, 30, 0),
      deadline: Date.now(),
    }

    // Add New Task
    tasks.push(currTask)

    // Clear input field
    setTaskInput("")
  };

  useEffect(() => {
    console.log("hello")
  }, [tasks])

  const Task = ({index, title, done, deadline}) => {
    return(
      <TaskBox>
        <input type="checkbox" defaultChecked={done} onChange={() => setBool(index)}/>
        <p>{title}</p>
        <p>{new Date(deadline).toLocaleString()}</p>
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
                index={index}
                title={task.title}
                done={task.done}
                deadline={task.deadline}
              />
            )
          })}
        </div>
      )
    } else {
      return (
        <h1>No Completed Tasks</h1>
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
                index={index}
                title={task.title}
                done={task.done}
                deadline={task.deadline}
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
