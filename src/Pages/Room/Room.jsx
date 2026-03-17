import { useEffect, useState } from "react"
import socket from "../../socket"

import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer"
import Controls from "../../Components/Controls/Controls"
import Participants from "../../Components/Participants/Participants"

function Room({ roomId, username }) {

  const [participants, setParticipants] = useState([])
  const [role, setRole] = useState(null)

  useEffect(() => {

    socket.on("participants_update", (users) => {

      setParticipants(users)

      const currentUser = users.find(u => u.username === username)

      if (currentUser) {
        setRole(currentUser.role)
      }

    })

    socket.on("permission_denied", (data) => {
      alert(data.message)
    })

    socket.on("removed_from_room", () => {
      alert("You were removed from the room")
      window.location.reload()
    })

    return () => {
      socket.off("participants_update")
      socket.off("permission_denied")
      socket.off("removed_from_room")
    }

  }, [])

  return (

    <div>

      <h2>Room: {roomId}</h2>

      <VideoPlayer roomId={roomId} role={role} />

      {(role === "host" || role === "moderator") &&
        <Controls roomId={roomId} />
      }

      <Participants
        participants={participants}
        role={role}
        roomId={roomId}
      />

    </div>

  )
}

export default Room