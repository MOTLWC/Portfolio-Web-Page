import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Felix McNeill Rutter</h1>
        <div className="SVGContainer">
        <svg width="100" height="200">
          <polygon points="20,20 80,20 80,40 40,40 40,80 60,80 60,100 40,100 40,180 20,180"/>
        </svg>
        <svg width="100" height="200">
          <polygon points=""/>
        </svg>
        <svg width="100" height="200">
          <polygon points=""/>
        </svg>
        <svg width="100" height="200">
          <polygon points=""/>
        </svg>
        <svg width="100" height="200">
          <polygon points=""/>
        </svg>
        </div>
      </header>

    </>
  )
}

export default App
