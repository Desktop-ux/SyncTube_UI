import { useState } from "react"
import socket from "../../socket"
import "./Controls.css"

function Controls({ roomId }) {

  const [url, setUrl] = useState("")

  const extractVideoId = (url) => {
    const regExp = /(?:v=|\/)([0-9A-Za-z_-]{11})/
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  const handleChangeVideo = () => {

    const videoId = extractVideoId(url)

    if (!videoId) return

    socket.emit("change_video", {
      roomId,
      videoId
    })

    setUrl("")
  }

  const handlePlay = () => {
    socket.emit("play", { roomId })
  }

  const handlePause = () => {
    socket.emit("pause", { roomId })
  }

  return (
    <div className="controls">

      <button onClick={handlePlay}>
        Play
      </button>

      <button onClick={handlePause}>
        Pause
      </button>

      <input
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={handleChangeVideo}>
        Change Video
      </button>

    </div>
  )
}

export default Controls