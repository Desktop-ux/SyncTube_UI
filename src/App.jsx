import { useEffect } from "react"
import socket from "./socket"

function App() {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id)
    })
  }, [])

  return (
    <div>
      <h1>YouTube Watch Party</h1>
    </div>
  )
}

export default App