import socket from "../../socket"

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

    <div>

      <h3>Participants</h3>

      {participants.map(p => (

        <div key={p.id}>

          {p.username} ({p.role})

          {role === "host" && p.role === "participant" && (

            <>
              <button onClick={() => makeModerator(p.id)}>
                Make Moderator
              </button>

              <button onClick={() => removeUser(p.id)}>
                Remove
              </button>
            </>

          )}

        </div>

      ))}

    </div>

  )
}

export default Participants