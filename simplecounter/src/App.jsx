import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function increment(){
    setCount(count + 1)
  }
  function decrement(){
    if(count > 0) setCount(count - 1);
  }
  return (
    <>

      <div className="card">
        <p>Current Count: {count}</p>
        <button onClick={increment}>
          Increment 
        </button>
        <button onClick={decrement}>
          Decrement
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
        {count>=10 && <p>Goal Reached</p>}
      </div>

    </>
  )
}

export default App
