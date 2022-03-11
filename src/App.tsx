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

  .column-headers {
    display: flex;

    * {
      flex: 1;
    }
  }
`

const TaskBox = styled.div`
  display: flex;
  align-items: center;

  * {
    flex: 1;
  }

  :hover {
    background: #14213d;
    cursor: pointer;
  }
`
const dummyTasks = [
  {
    title: "Create Todo List Page",
    done: false,
    deadline: new Date(Date.now()).toISOString().slice(0, 19),
    date_finished: 0,
  },
  {
    title: "Find Examples of Privacy Policy Page",
    done: false,
    deadline: new Date(Date.now()).toISOString().slice(0, 19),
    date_finished: 0,
  },
  {
    title: "Push TOS Page to Master",
    done: false,
    deadline: new Date(Date.now()).toISOString().slice(0, 19),
    date_finished: 0,
  },
  {
    title: "Contact groupmates for Philosophy",
    done: true,
    deadline: new Date(Date.now()).toISOString().slice(0, 19),
    date_finished: new Date(Date.now()).toISOString().slice(0, 19),
  },
  {
    title: "Create GitHub repository for dev exam",
    done: true,
    deadline: new Date(Date.now()).toISOString().slice(0, 19),
    date_finished: new Date(Date.now()).toISOString().slice(0, 19),
  },
]

const localTasks = localStorage.getItem("tasks") || "";

const defaultTasks = localTasks ? JSON.parse(localTasks) : dummyTasks

function App() {
  const [taskInput, setTaskInput] = useState("")
  const [tasks, setTasks] = useState(defaultTasks)
  const [tab, setTab] = useState(0)

  const saveInput = (e) => {
    setTaskInput(e.target.value)
  };

  const handleKeypress = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      if (taskInput !== ""){
        addTask();
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const setBool = (title) => {
    const curr_task = tasks.find(e => {return( e.title === title )})
    if (curr_task) {
      curr_task.done = !curr_task.done;
      curr_task.date_finished = Date.now();

      const newTasks = [...tasks]
      const new_curr_task = {
        title: curr_task.title,
        done: !curr_task.done,
        deadline: curr_task.deadline,
        date_finished: Date.now(),
      }
      newTasks[curr_task.index] = new_curr_task
      setTasks(newTasks)
  }

    setTimeout(() => {
      {tab === 0 ? renderUncompletedTasks() : renderCompletedTasks()}
    }, 5000);
  }

  const clearTasks = () => {
    setTasks([])
  }

  const setDummyTasks = () => {
    setTasks(dummyTasks)
  }

  const addTask = () => {
    const currTask = {
      title: taskInput,
      done: false,
      deadline: new Date(Date.now()).toISOString().slice(0, 19) ,
      date_finished: 0,
    }

    const checkTask = tasks.find(e => {return( e.title === currTask.title )})

    // Add New Task
    if (!checkTask && currTask.title !== "") {
      setTasks([...tasks, currTask])
      
      // Clear input field
      setTaskInput("")

      // Change tab to Tasks
      setTab(0)
    } else if (checkTask) {
      alert(`Task: '${checkTask.title}' is already in your list!`)
    }
  };

  const Task = ({index, title, done, deadline, date_finished}) => {
    return(
      <TaskBox>
        <input type="checkbox" defaultChecked={done} onChange={() => setBool(title)}/>
        <p>{title}</p>
        <input type="datetime-local" defaultValue={deadline} />
        {/* <p>{done ? new Date(date_finished).toLocaleString() : "Time Left"}</p> */}
        {done ? (<p>{new Date(date_finished).toLocaleString()}</p>) : null}
      </TaskBox>
    )
  }

  const renderUncompletedTasks = () => {
    const uncompletedTasks = tasks.filter((task) => task.done === false)

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
          <div>
            <button onClick={() => clearTasks()}>Delete All Tasks</button>
            <button onClick={() => setDummyTasks()}>Set Dummy Tasks</button>
          </div>
        </div>
        <TaskBoxContainer>
          <div className="taskbox-headers">
            <p onClick={() => setTab(0)} className={tab === 0 ? "tab active-tab" : "tab"}>Tasks</p>
            <p onClick={() => setTab(1)} className={tab === 1 ? "tab active-tab" : "tab"}>Cleared</p>
          </div>
          <div className="column-headers">
            <p>Status</p>
            <p>Title</p>
            <p>Deadline</p>
            {/* <p>{tab === 0 ? "Time Left" : "Accopmlished Time"}</p> */}
            {tab === 0 ? null : (<p>Accomplished Time</p>)}
          </div>
          {tab === 0 ? renderUncompletedTasks() : renderCompletedTasks()}
        </TaskBoxContainer>
      </div>
    </div>
  );
}

export default App;
