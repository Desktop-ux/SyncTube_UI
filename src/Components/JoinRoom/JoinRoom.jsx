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

    <div className="landing">

      <div className="landing-center">

        <div className="logo">
          🎬
        </div>

        <h1 className="title">
          watch<span>party</span>
        </h1>

        <p className="subtitle">
          Watch YouTube videos in sync with friends
        </p>

        <div className="card">

          <label>YOUR NAME</label>

          <input
            placeholder="Enter username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <label>ROOM ID</label>

          <input
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e)=>setRoomId(e.target.value)}
          />

          <button
            className="join-btn"
            onClick={handleJoin}
          >
            Join Room
          </button>

        </div>

      </div>

    </div>

  )
}

export default JoinRoom