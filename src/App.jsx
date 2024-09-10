import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const polygonRef = useRef(null);

  const TestSVG = useRef(null);

  const TestSVG2 = useRef(null);

  function Vertex(x, y, id, connections) {
    this.id = id
    this.x = x
    this.y = y
    this.connections = connections
  }

  function Letter(points, svgRef) {
    // points should be an array of {x,y} coordinates 
    this.points = points
    this.connections = []
    this.svg = svgRef

    this.createConnections = () => {
      // Creates connections based on the connections listed in the Vertex objects
      this.points.forEach((vertexStart) => {
        this.points.forEach((vertexEnd) => {
          if (vertexStart.connections.includes(vertexEnd.id)) {
            console.log(vertexStart.connections, vertexEnd.id)
            this.connections.push(new Connection({ x: vertexStart.x, y: vertexStart.y }, { x: vertexEnd.x, y: vertexEnd.y }))
          }
        })
      })
    }
    this.render = () => {
      this.connections.forEach((connection) => {
        //  Wipe Previous Render
        this.svg.current.innerHtml("")

        // Set the line's attributes
        const newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        newLine.setAttribute("x1", connection.start.x);
        newLine.setAttribute("y1", connection.start.y);
        newLine.setAttribute("x2", connection.end.x);
        newLine.setAttribute("y2", connection.end.y);
        newLine.setAttribute("stroke", "black");

        // Append the new line to the SVG element
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

  // const [testLetter, setTestLetter] = useState(new Letter([{ x: 25, y: 25 }, { x: 50, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 50, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 50, y: 75 }, { x: 75, y: 75 }], TestSVG, 25))

  const [fOne, setFOne] = useState(new Letter([
    new Vertex(20, 20, 1, [2, 7, 22]),
    new Vertex(40, 20, 2, [3, 6, 7]),
    new Vertex(60, 20, 3, [4, 5, 6]),
    new Vertex(80, 20, 4, [5]),
    new Vertex(80, 40, 5, []),
    new Vertex(60, 40, 6, [4, 5]),
    new Vertex(40, 40, 7, [3, 6, 24]),
    new Vertex(40, 80, 8, [9, 10, 11]),
    new Vertex(60, 80, 9, [10]),
    new Vertex(60, 100, 10, []),
    new Vertex(40, 100, 11, [9, 10, 12]),
    new Vertex(40, 120, 12, [13]),
    new Vertex(40, 140, 13, [14]),
    new Vertex(40, 160, 14, [15]),
    new Vertex(40, 180, 15, []),
    new Vertex(20, 180, 16, [14, 15]),
    new Vertex(20, 160, 17, [13, 14, 15, 16]),
    new Vertex(20, 140, 18, [12, 13, 14, 17]),
    new Vertex(20, 120, 19, [11, 12, 13, 18]),
    new Vertex(20, 100, 20, [8, 11, 12, 19]),
    new Vertex(20, 80, 21, [24, 8, 11, 20]),
    new Vertex(20, 40, 22, [2, 7, 24, 23]),
    new Vertex(20, 60, 23, [7, 24, 8, 21]),
    new Vertex(40, 60, 24, [8]),
  ], TestSVG2, 20))

  useEffect(() => {
    // testLetter.createConnections()
    fOne.createConnections()

  }, [fOne])


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
