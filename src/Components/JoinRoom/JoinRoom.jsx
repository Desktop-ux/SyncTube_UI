import { useState } from "react"
import "./JoinRoom.css"

function JoinRoom({ onJoin }) {

  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")

  const handleJoin = () => {

    if (!username || !roomId) return

    onJoin({ username, roomId })
  }

  return (
    <div>

      <h2>Join Watch Party</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <button onClick={handleJoin}>
        Join Room
      </button>

    </div>
  )
}

export default JoinRoom