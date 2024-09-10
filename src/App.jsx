import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const polygonRef = useRef(null);

  const TestSVG = useRef(null);

  const TestSVG2 = useRef(null);

  function Vertex(x, y, id, ...connections) {
    this.id = id
    this.x = x
    this.y = y
    this.connections = connections
  }

  function Letter(points, svgRef, averageDistance) {
    // points should be an array of {x,y} coordinates 
    this.points = points
    this.conections = []
    this.svg = svgRef
    this.averageDistance = averageDistance

    this.createConnections = () => {
      // gets nearest points in directions (hor, vert, diagonal) and creates a connection 
      this.points.forEach((point) => {
        this.points.forEach((adjacentPoint) => {
          if (
            (((point.x === adjacentPoint.x + this.averageDistance) || (point.x === adjacentPoint.x - this.averageDistance)) && (point.y === adjacentPoint.y )) ||
            (((point.y === adjacentPoint.y + this.averageDistance) || (point.y === adjacentPoint.y - this.averageDistance)) && (point.x === adjacentPoint.x )) ||
            (((point.y === adjacentPoint.y + this.averageDistance) || (point.y === adjacentPoint.y - this.averageDistance)) && ((point.x === adjacentPoint.x + this.averageDistance) || (point.x === adjacentPoint.x - this.averageDistance)))
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

        this.svg.current.appendChild(newLine);
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

  const [testLetter, setTestLetter] = useState(new Letter([{ x: 25, y: 25 }, { x: 50, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 50, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 50, y: 75 }, { x: 75, y: 75 }], TestSVG, 25))

  const [fOne, setFOne] = useState(new Letter([
    {x: 20, y: 20}, {x: 30, y: 20}, {x: 40, y: 20}, {x: 50, y: 20}, {x: 60, y: 20}, {x: 70, y: 20}, {x: 80, y: 20},
    {x: 80, y: 30}, {x: 80, y: 40}, {x: 70, y: 40}, {x: 60, y: 40}, {x: 50, y: 40}, {x: 40, y: 40}, {x: 40, y: 50}, 
    {x: 40, y: 60}, {x: 40, y: 70}, {x: 40, y: 80}, {x: 50, y: 80}, {x: 60, y: 80}, {x: 60, y: 90}, {x: 60, y: 100}, 
    {x: 50, y: 100}, {x: 40, y: 100}, {x: 40, y: 110}, {x: 40, y: 120}, {x: 40, y: 130}, {x: 40, y: 140}, {x: 40, y: 150}, 
    {x: 40, y: 160}, {x: 40, y: 170}, {x: 40, y: 180}, {x: 30, y: 180}, {x: 20, y: 180}, {x: 20, y: 170}, {x: 20, y: 160}, 
    {x: 20, y: 150}, {x: 20, y: 140}, {x: 20, y: 130}, {x: 20, y: 120}, {x: 20, y: 110}, {x: 20, y: 100}, {x: 20, y: 90}, 
    {x: 20, y: 80}, {x: 20, y: 70}, {x: 20, y: 60}, {x: 20, y: 50}, {x: 20, y: 40}, {x: 20, y: 30}
], TestSVG2, 20))

  useEffect(() => {
    testLetter.createConnections()
    fOne.createConnections()

  }, [testLetter, fOne])


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
          <svg ref={TestSVG2} width="100" height="200">
          </svg>
        </div>
      </header>

    </>
  )
}

export default App
