import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const Gravity = 0.1

  const TestSVG = useRef(null);

  const TestSVG2 = useRef(null);

  const TestSVG3 = useRef(null);

  function Vertex(x, y, id, connections, locked = false) {
    this.id = id
    this.x = x
    this.y = y
    this.connections = connections
    this.velocity = { x: 0, y: 0 }
    this.locked = locked
  }

  function Letter(points, svgRef) {
    // points should be an array of {x,y} coordinates 
    this.points = points
    this.connections = []
    this.svg = svgRef
    this.svgWidth = 0
    this.svgHeight = 0

    this.createConnections = () => {
      this.svgWidth = this.svg.current.getAttribute("width")
      this.svgHeight = this.svg.current.getAttribute("height")
      // Creates connections based on the connections listed in the Vertex objects
      this.points.forEach((vertexStart) => {
        this.points.forEach((vertexEnd) => {
          if (vertexStart.connections.includes(vertexEnd.id)) {
            // console.log(vertexStart.connections, vertexEnd.id)
            this.connections.push(new Connection(vertexStart, vertexEnd))
          }
        })
      })
      this.connections.forEach((connection) => {
        this.svg.current.appendChild(connection.lineRef)
      })
    }

    this.updateConnections = () => {
      let i = 0
      this.points.forEach((vertexStart) => {
        this.points.forEach((vertexEnd) => {
          if (vertexStart.connections.includes(vertexEnd.id)) {
            // console.log(this.connections)
            this.connections[i].start.x = vertexStart.x
            this.connections[i].end.x = vertexEnd.x
            this.connections[i].start.y = vertexStart.y
            this.connections[i].end.y = vertexEnd.y
            i++
          }
        })
      })
    }

    this.render = () => {
      this.updateConnections()

      this.connections.forEach((connection) => {

        // Set the line's attributes
        const drawnLine = connection.lineRef
        // console.log(drawnLine)
        drawnLine.setAttribute("x1", connection.start.x);
        drawnLine.setAttribute("y1", connection.start.y);
        drawnLine.setAttribute("x2", connection.end.x);
        drawnLine.setAttribute("y2", connection.end.y);
        drawnLine.setAttribute("stroke", "black");
      })
    }

    this.accelerate = () => {
      this.points.forEach((point) => {
        point.velocity.y += Gravity
      })
    }

    this.calculateForce = () => {
      this.connections.forEach((connection) => {
        const newLength = Math.sqrt(((connection.start.x - connection.end.x) * (connection.start.x - connection.end.x)) + ((connection.start.y - connection.end.y) * (connection.start.y - connection.end.y)))
        const displacement = connection.length - newLength
        const repulsionForce = displacement * connection.coefficient
        // console.log(repulsionForce)
        const unitX = (connection.start.x - connection.end.x) / newLength
        const unitY = (connection.start.y - connection.end.y) / newLength
        if (!repulsionForce) return
        // console.log(unitX,unitY)

        // Adding Resistance To avoid Oscillation
        const damping = 0.1
        connection.start.velocity.x *= (1 - damping);
        connection.start.velocity.y *= (1 - damping);
        connection.end.velocity.x *= (1 - damping);
        connection.end.velocity.y *= (1 - damping);

        connection.start.velocity.x -= repulsionForce * unitX
        connection.end.velocity.x += repulsionForce * unitX
        connection.start.velocity.y -= repulsionForce * unitY
        connection.end.velocity.y += repulsionForce * unitY
      })
    }

    this.updatePosition = () => {
      this.points.forEach((point) => {
        
        point.y += point.velocity.y
        if (point.locked) return
        point.x += point.velocity.x
        if (point.x > this.svgWidth) {
          point.velocity.x = 0
          point.x = this.svgWidth
        }
        if (point.x < 0) {
          point.velocity.x = 0
          point.x = 0
        }
        if (point.y > this.svgHeight) {
          point.velocity.y = 0
          point.y = this.svgHeight
        }
      })
    }

  }


  function Connection(start, end, lineRef) {
    this.lineRef = document.createElementNS("http://www.w3.org/2000/svg", "line")
    this.start = start
    this.end = end
    this.length = Math.sqrt(((start.x - end.x) * (start.x - end.x)) + ((start.y - end.y) * (start.y - end.y)))
    this.coefficient = -0.6
  }

  // Create Letters 

  // const [testLetter, setTestLetter] = useState(new Letter([{ x: 25, y: 25 }, { x: 50, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 50, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 50, y: 75 }, { x: 75, y: 75 }], TestSVG, 25))

  const [fOne, setFOne] = useState(new Letter([
    // new Vertex(50, 60, 0, [1]),
    // new Vertex(50, 90, 1, [])
    new Vertex(0, 0, 0, [], false),
    new Vertex(20, 20, 1, [2, 7, 22], false),
    new Vertex(40, 20, 2, [3, 6, 7], false),
    new Vertex(60, 20, 3, [4, 5, 6], false),
    new Vertex(80, 20, 4, [5], false),
    new Vertex(80, 40, 5, [], false),
    new Vertex(60, 40, 6, [4, 5], false),
    new Vertex(40, 40, 7, [3, 6, 24, 4], false),
    new Vertex(40, 80, 8, [9, 10, 11], false),
    new Vertex(60, 80, 9, [10], false),
    new Vertex(60, 100, 10, [], false),
    new Vertex(40, 100, 11, [9, 10, 12], false),
    new Vertex(40, 120, 12, [13], false),
    new Vertex(40, 140, 13, [14], false),
    new Vertex(40, 160, 14, [15], false),
    new Vertex(40, 180, 15, [], true),
    new Vertex(20, 180, 16, [14, 15], true),
    new Vertex(20, 160, 17, [13, 14, 15, 16], false),
    new Vertex(20, 140, 18, [12, 13, 14, 17], false),
    new Vertex(20, 120, 19, [11, 12, 13, 18], false),
    new Vertex(20, 100, 20, [8, 11, 12, 19], false),
    new Vertex(20, 80, 21, [24, 8, 11, 20], false),
    new Vertex(20, 40, 22, [2, 7, 24, 23], false),
    new Vertex(20, 60, 23, [7, 24, 8, 21], false),
    new Vertex(40, 60, 24, [8], false),
  ], TestSVG2))

  const [fTwo, setFTwo] = useState(new Letter([
    new Vertex(0, 0, 0, [], false),
    new Vertex(40, 100, 1, [2,5,4], false),
    new Vertex(60, 100, 2, [6,5], false),
    new Vertex(20, 120, 3, [1,2,4,7,10], false),
    new Vertex(40, 110, 4, [2,5,7], false),
    new Vertex(60, 110, 5, [6,9,8], false),
    new Vertex(80, 120, 6, [9], false),
    new Vertex(40, 130, 7, [8,12,11], false),
    new Vertex(60, 130, 8, [6,9,12], false),
    new Vertex(80, 130, 9, [], false),
    new Vertex(20, 140, 10, [1,7,11,13,14], false),
    new Vertex(40, 140, 11, [8,12,13], false),
    new Vertex(70, 140, 12, [9], false),
    new Vertex(40, 150, 13, [15,18], false),
    new Vertex(20, 160, 14, [11,13,15,18], false),
    new Vertex(50, 160, 15, [16,17,19], false),
    new Vertex(70, 160, 16, [17], false),
    new Vertex(70, 170, 17, [], false),
    new Vertex(40, 180, 18, [15,19], false),
    new Vertex(60, 180, 19, [16,17], false),
  ], TestSVG3))

  useEffect(() => {
    const fps = 1000 / 40;

    if (fOne.connections.length === 0) fOne.createConnections()
    if (fTwo.connections.length === 0) fTwo.createConnections()

    const intervalId = setInterval(async () => {
      if (fOne) {
        fOne.accelerate();
        fOne.calculateForce()
        fOne.updatePosition();
        fOne.render();
      }
      if (fTwo) {
        fTwo.accelerate();
        fTwo.calculateForce()
        fTwo.updatePosition();
        fTwo.render();
      }
    }, fps);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [fOne]);

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
          <svg ref={TestSVG3} width="100" height="200">
          </svg>
        </div>
      </header>

    </>
  )
}

export default App
