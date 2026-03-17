import { useState } from "react"
import socket from "../../socket"

function Controls({ roomId }) {

  const [url, setUrl] = useState("")

  const extractVideoId = (url) => {

    const regExp = /(?:v=|\/)([0-9A-Za-z_-]{11})/
    const match = url.match(regExp)

    return match ? match[1] : null
  }

  const play = () => {
    socket.emit("play", { roomId })
  }

  const pause = () => {
    socket.emit("pause", { roomId })
  }

  const changeVideo = () => {

    const videoId = extractVideoId(url)

    if (!videoId) return

    socket.emit("change_video", {
      roomId,
      videoId
    })

  }

  return (

    <div>

      <button onClick={play}>Play</button>

      <button onClick={pause}>Pause</button>

      <input
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={changeVideo}>
        Load Video
      </button>

    </div>

  )
}

export default Controls