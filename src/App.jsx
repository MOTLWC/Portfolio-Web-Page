import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const polygonRef = useRef(null);

  const TestSVG = useRef(null);

  function vertex(x, y, connections) {
    this.x = x
  }

  function Letter(points) {
    // points should be an array of {x,y} coordinates 
    this.points = points
    this.conections = []

    this.createConnections = () => {
      // gets nearest points in directions (hor, vert, diagonal) and creates a connection 
      this.points.forEach((point) => {
        this.points.forEach((adjacentPoint) => {
          if (
            (((point.x === adjacentPoint.x + 25) || (point.x === adjacentPoint.x - 25)) && (point.y === adjacentPoint.y )) ||
            (((point.y === adjacentPoint.y + 25) || (point.y === adjacentPoint.y - 25)) && (point.x === adjacentPoint.x )) ||
            (((point.y === adjacentPoint.y + 25) || (point.y === adjacentPoint.y - 25)) && ((point.x === adjacentPoint.x + 25) || (point.x === adjacentPoint.x - 25)))
          ){
            console.log(point, adjacentPoint)
            this.conections.push(new Connection(point, adjacentPoint))
          }
        })
      })
      // polygonRef.current.setAttribute("points", this.points.map((point) => {
      //   return(`${point.x},${point.y}`)
      // }).join(" "))
      console.log(this.conections)
      this.conections.forEach((connection) => {
        const newLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
        newLine.setAttribute("x1", connection.start.x)
        newLine.setAttribute("y1", connection.start.y)
        newLine.setAttribute("x2", connection.end.x)
        newLine.setAttribute("y2", connection.end.y)
        newLine.setAttribute("stroke", "black");

        TestSVG.current.appendChild(newLine);
      })
    }
  }

  function Connection(start, end) {
    this.start = start
    this.end = end
    this.length = Math.sqrt((start.x - end.x) + (start.y - end.y))
    this.force = 0.5
  }

  // Create Letters 

  const [testLetter, setTestLetter] = useState(new Letter([{ x: 25, y: 25 }, { x: 50, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 50, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 50, y: 75 }, { x: 75, y: 75 }]))

  useEffect(() => {
    testLetter.createConnections()


  }, [testLetter])


  return (
    <>
      <header>
        <h1>Felix McNeill Rutter</h1>
        <div id="TestSVGParent" className="SVGContainer">
          <svg width="100" height="200">
            <polygon points="20,20 80,20 80,40 40,40 40,80 60,80 60,100 40,100 40,180 20,180" />
          </svg>
          <svg width="100" height="200">
            <polygon points="20,20 80,20 80,40 40,40" />
            <polygon points="20,20 40,40 40,80 20,90" />
            <polygon points="40,80 20,90 40,100 60,100 60,80" />
            <polygon points="40,100 20,90 20,180 40,180" />
          </svg>
          <svg ref={TestSVG} width={100} height={200}>

          </svg>
        </div>
      </header>

    </>
  )
}

export default App
