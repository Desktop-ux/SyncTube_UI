import { useEffect, useState } from "react"
import socket from "../../socket"
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer"
import Controls from "../../Components/Controls/Controls"
import "./Room.css"

function Room({ roomId, username }) {

  const [participants, setParticipants] = useState([])
  const [role, setRole] = useState(null)

  useEffect(() => {

    socket.on("participants_update", (users) => {

      setParticipants(users)

      const currentUser = users.find(
        (user) => user.username === username
      )

      if (currentUser) {
        setRole(currentUser.role)
      }

    })

  }, [])

  return (
    <div className="room-container">

      <div className="video-section">

        <VideoPlayer roomId={roomId} />

        {(role === "host" || role === "moderator") && (
          <Controls roomId={roomId} />
        )}

      </div>

      <div className="participants-section">

        <h3>Participants</h3>

        <ul>
          {participants.map((p) => (
            <li key={p.id}>
              {p.role === "host" ? <strong>{p.username}</strong> : p.username} ({p.role})
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}

export default Room