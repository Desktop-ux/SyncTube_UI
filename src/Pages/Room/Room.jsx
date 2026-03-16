import { useEffect, useState } from "react"
import socket from "../../socket"
import VideoPlayer from "./../../Components/VideoPlayer/VideoPlayer"

function Room({ roomId, username }) {

  const [participants, setParticipants] = useState([])

  useEffect(() => {

    socket.on("participants_update", (users) => {
      setParticipants(users)
    })

  }, [])

  return (
    <div>

      <h2>Room: {roomId}</h2>

      <VideoPlayer roomId={roomId} />

      <h3>Participants</h3>

      <ul>
        {participants.map((p) => (
          <li key={p.id}>
            {p.username} ({p.role})
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Room