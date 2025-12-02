import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(["Buy milk", "Study React"])
  const [input, setInput] = useState("")

  function addTask(value){
    if(!value.trim()) return;
    setTasks([...tasks,value]);
    setInput("");
  }
  function clearTasks(){
    setTasks([]);
    setInput("");
  }
  return (
    <>
      <p>Basic ToDo List</p>
      {tasks.length === 0 && <p style={{ color: "#888", fontStyle: "italic" }}>No tasks available</p> }
      <ul>
        {tasks.map((item,i)=>(
          <li key={i}>{item}</li>
        ))}
      </ul>

      <div>
        <input value={input} onChange={(e)=> setInput(e.target.value)} 
          placeholder='Add a task'/>
        <button disabled={!input.trim()}  onClick={() => addTask(input)}>Add Task</button>
        <button onClick={()=>clearTasks()}>Clear All</button>
      </div>
    </>
  )
}

export default App
