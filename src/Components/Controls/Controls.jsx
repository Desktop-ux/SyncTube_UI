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

    setUrl("")
  }

  return (

    <div className="controls">

      <button className="play-btn" onClick={play}>
        ▶
      </button>

      <button className="pause-btn" onClick={pause}>
        ⏸
      </button>

      <input
        className="url-input"
        placeholder="YouTube URL or video ID..."
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
      />

      <button
        className="load-btn"
        onClick={changeVideo}
      >
        Load Video
      </button>

    </div>

  )
}

export default Controls