import { useState } from "react"
import socket from "./socket"
import JoinRoom from "./Components/JoinRoom/JoinRoom"
import Room from "./Pages/Room/Room"


function App() {

  const [joined, setJoined] = useState(false)
  const [roomId, setRoomId] = useState("")
  const [username, setUsername] = useState("")

  const handleJoin = ({ username, roomId }) => {

    socket.emit("join_room", { username, roomId })

    setUsername(username)
    setRoomId(roomId)
    setJoined(true)
  }

  if (!joined) {
    return <JoinRoom onJoin={handleJoin} />
  }

  return <Room roomId={roomId} username={username} />
}

export default App