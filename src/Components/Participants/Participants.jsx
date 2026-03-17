import socket from "../../socket"
import "./Participants.css"

function Participants({ participants = [], role, roomId }) {

  const makeModerator = (userId) => {

    socket.emit("assign_role", {
      roomId,
      userId,
      role: "moderator"
    })

  }

  const removeUser = (userId) => {

    socket.emit("remove_participant", {
      roomId,
      userId
    })

  }

  return (

    <div className="participants">

      <div className="participants-header">
        Participants
        <span className="count">{participants.length}</span>
      </div>

      <div className="participants-list">

        {participants.map(p => (

          <div className="participant" key={p.id}>

            <div className="avatar">
              {p.username.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">

              <div className="username">
                {p.username}
              </div>

              <div className="role">
                {p.role}
              </div>

            </div>


            {role === "host" && p.role === "participant" && (

              <div className="actions">

                <button
                  onClick={() => makeModerator(p.id)}
                  className="mod-btn"
                >
                  Mod
                </button>

                <button
                  onClick={() => removeUser(p.id)}
                  className="remove-btn"
                >
                  Kick
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  )
}

export default Participants