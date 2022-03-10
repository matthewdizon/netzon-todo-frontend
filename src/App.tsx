import { useState } from 'react';
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

  const saveInput = (e) => {
    setTaskInput(e.target.value)
  };

  // const setBool = (index) => {
  //   console.log(tasks[index])
  //   tasks[index].done = !tasks[index].done
  //   // tasks[index]
  // }

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

  return (
    <div className="App">
      <Navbar />
      <h1>To-Do List</h1>
      <div>
        <input type="text" value={taskInput} onChange={e => saveInput(e)}/>
        <button onClick={() => addTask()}>Add Task</button>
      </div>
      <TaskBoxContainer>
        {tasks.map((task, index) => {
          console.log(task)
          return(
            <TaskBox key={index}>
              <p>{index + 1}</p>
              <p>{task.title}</p>
              <input type="checkbox" defaultChecked={task.done} onChange={() => task.done = !task.done}/>
              <p>{task.deadline.toDateString()}</p>
            </TaskBox>
          )
        })}
      </TaskBoxContainer>
    </div>
  );
}

export default App;
