import { useEffect, useState } from "react"
import socket from "../../socket"

import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer"
import Controls from "../../Components/Controls/Controls"
import Participants from "../../Components/Participants/Participants"

import "./Room.css"

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

  const leaveRoom = () => {

  socket.disconnect()

  window.location.reload()

}


  return (

    <div className="room">

      {/* HEADER */}

      <div className="room-header">

        <div className="logo">
          watch<span>party</span>
        </div>

        <div className="room-code">
          ROOM {roomId}
        </div>

        <div className="room-actions">

          <span className="role-badge">
            👑 {role}
          </span>

          <button className="leave-btn" onClick={leaveRoom}>
            Leave
          </button>

        </div>

      </div>


      {/* MAIN AREA */}

      <div className="room-main">

        <div className="video-section">

          <VideoPlayer roomId={roomId} role={role} />

        </div>


        <div className="sidebar">

          <Participants
            participants={participants}
            role={role}
            roomId={roomId}
          />

        </div>

      </div>


      {/* CONTROLS */}

      {(role === "host" || role === "moderator") &&

        <div className="controls-bar">

          <Controls roomId={roomId} />

        </div>

      }

    </div>

  )
}

export default Room