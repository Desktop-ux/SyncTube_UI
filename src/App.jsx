import { useState } from "react"
import socket from "./socket"
import JoinRoom from "./Components/JoinRoom/JoinRoom"
import Room from "./Pages/Room/Room"
  import { useEffect } from "react"

function App() {

  const [joined, setJoined] = useState(false)
  const [roomId, setRoomId] = useState("")
  const [username, setUsername] = useState("")

  const handleJoin = ({ username, roomId }) => {

    socket.emit("join_room", { username, roomId })

    localStorage.setItem("watchparty_username", username)
    localStorage.setItem("watchparty_roomId", roomId)

    setUsername(username)
    setRoomId(roomId)
    setJoined(true)
  }


useEffect(() => {

  const savedUsername = localStorage.getItem("watchparty_username")
  const savedRoom = localStorage.getItem("watchparty_roomId")

  if (savedUsername && savedRoom) {

    setUsername(savedUsername)
    setRoomId(savedRoom)

  }

}, [])

  if (!joined) {
    return <JoinRoom onJoin={handleJoin} />
  }

  return <Room roomId={roomId} username={username} />
}

export default App