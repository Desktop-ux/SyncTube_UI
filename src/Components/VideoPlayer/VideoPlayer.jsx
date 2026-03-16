import { useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"
import socket from "../../socket"
import "./VideoPlayer.css"

function VideoPlayer({ roomId }) {

  const playerRef = useRef(null)
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ")

  const opts = {
    width: "800",
    height: "450",
    playerVars: {
      autoplay: 0
    }
  }

  const onReady = (event) => {
    playerRef.current = event.target
  }

  const onPlay = () => {
    socket.emit("play", { roomId })
  }

  const onPause = () => {
    socket.emit("pause", { roomId })
  }

  const onSeek = () => {
    const time = playerRef.current.getCurrentTime()
    socket.emit("seek", { roomId, time })
  }

  useEffect(() => {

    socket.on("play", () => {
      playerRef.current.playVideo()
    })

    socket.on("pause", () => {
      playerRef.current.pauseVideo()
    })

    socket.on("seek", ({ time }) => {
      playerRef.current.seekTo(time)
    })

    socket.on("change_video", ({ videoId }) => {
      setVideoId(videoId)
    })

  }, [])

  return (
    <div className="video-container">

      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onStateChange={onSeek}
      />

    </div>
  )
}

export default VideoPlayer