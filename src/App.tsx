import { useState, useEffect } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import styled from "styled-components"

const TaskBoxContainer = styled.div`
  background: gray;
`

const TaskBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const defaultTasks = [
  {
    title: "Work on Todo",
    done: false,
    deadline: new Date(2018, 11, 24, 10, 33, 30, 0),
  },
]

function App() {

  const [taskInput, setTaskInput] = useState("")
  const [tasks, setTasks] = useState(defaultTasks)
  const [tab, setTab] = useState(0)

  const saveInput = (e) => {
    setTaskInput(e.target.value)
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
      deadline: new Date(2018, 11, 24, 10, 33, 30, 0),
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
        <p>{index + 1}</p>
        <p>{title}</p>
        <input type="checkbox" defaultChecked={done} onChange={() => setBool(index)}/>
        <p>{deadline}</p>
      </TaskBox>
    )
  }

  const renderUncompletedTasks = () => {
    const uncompletedTasks = tasks.filter((task) => task.done === false)

    console.log(uncompletedTasks.length)
    if (uncompletedTasks.length !== 0){
      return(
        uncompletedTasks.map((task, index) => {
          return(
            <Task 
              index={index}
              title={task.title}
              done={task.done}
              deadline={task.deadline.toDateString()}
            />
          )
        })
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
        completedTasks.map((task, index) => {
          return(
            <Task 
              index={index}
              title={task.title}
              done={task.done}
              deadline={task.deadline.toDateString()}
            />
          )
        })
      )
    } else {
      return (
        <h1>No Cleared Tasks</h1>
      )
    }
  }

  return (
    <div className="App">
      <Navbar />
      <h1>To-Do List</h1>
      <div>
        <input type="text" value={taskInput} onChange={e => saveInput(e)}/>
        <button onClick={() => addTask()}>Add Task</button>
      </div>
      <div>
        <button onClick={() => setTab(0)}>Tasks</button>
        <button onClick={() => setTab(1)}>Cleared</button>
      </div>
      <TaskBoxContainer>
        {tab === 0 ? renderUncompletedTasks() : renderCompletedTasks()}
      </TaskBoxContainer>
    </div>
  );
}

export default App;
