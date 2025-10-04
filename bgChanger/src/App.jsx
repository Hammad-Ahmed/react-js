import { useState } from 'react'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState('green')

  const changeBgColor = () => {
    let colors = ['black', 'green', 'blue', 'red', 'yellow', 'purple', 'pink', 'gray'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }

  return (
    <>
      <div className="w-full h-screen duration-200" style={{ backgroundColor: bgColor }}>
        <h1 className='text-7xl capitalize font-extrabold text-center text-white'>{bgColor}</h1>
        <button className='px-4 
    py-2 
    bg-blue-600 
    text-white 
    rounded-lg 
    font-medium 
    shadow 
    hover:bg-blue-700 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-400 
    focus:ring-offset-2 
    transition 
    duration-200' onClick={changeBgColor}>Change</button>
      </div>
    </>
  )
}

export default App
