import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function Word() {
    // Container for the letters
    this.Letters = []

  }

  function Letter(points) {
    // points should be an array of {x,y} coordinates 
    this.points = [...points]
    this.conections = []

    this.createConnections(){
      // gets nearest points in directions (hor, vert, diagonal) and creates a connection 
    }
  }

  function Connection(start, end) {
    this.start = start
    this.end = end
    this.length = Math.sqrt((start.x-end.x)+(start.y-end.y))
    this.force = 0.5
  }

  return (
    <>
      <header>
        <h1>Felix McNeill Rutter</h1>
        <div className="SVGContainer">
        <svg width="100" height="200">
          <polygon points="20,20 80,20 80,40 40,40 40,80 60,80 60,100 40,100 40,180 20,180"/>
        </svg>
        <svg width="100" height="200">
        <polygon points="20,20 80,20 80,40 40,40"/>
          <polygon points="20,20 40,40 40,80 20,90"/>
          <polygon points="40,80 20,90 40,100 60,100 60,80"/>
          <polygon points="40,100 20,90 20,180 40,180"/>
        </svg>
        <svg width="100" height="200">
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
