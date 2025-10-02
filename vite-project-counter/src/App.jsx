import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    (count < 10) ? setCount(count + 1) : alert("Count can't be greater than 10");
  }

  const decrement = () => {
    (count > 0) ? setCount(count - 1) : alert("Count can't be less than 0");
  }

  return (
    <>
      <h1>React Counter</h1>
      <h3>{count}</h3>
      <div className="card">
        <button onClick={increment}>
          Increase Count
        </button>

        <button onClick={decrement}>
          Decrease Count
        </button>

      </div>
    </>
  )
}

export default App
