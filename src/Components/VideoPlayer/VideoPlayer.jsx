import { useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"
import socket from "../../socket"
import "./VideoPlayer.css"

function VideoPlayer({ roomId, role }) {

  const playerRef = useRef(null)
  const [videoId, setVideoId] = useState("")

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0
    }
  }

  const onReady = (event) => {
    playerRef.current = event.target
  }

  useEffect(() => {

    socket.on("play", () => {
      playerRef.current?.playVideo()
    })

    socket.on("pause", () => {
      playerRef.current?.pauseVideo()
    })

    socket.on("seek", ({ time }) => {
      playerRef.current?.seekTo(time)
    })

    socket.on("change_video", ({ videoId }) => {

      console.log("video received:", videoId)

      setVideoId(videoId)

      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId)
      }

    })

    socket.on("sync_state", ({ videoId, playState, currentTime }) => {

      if (videoId) {
        setVideoId(videoId)
        playerRef.current?.loadVideoById(videoId)
      }

      if (currentTime) {
        playerRef.current?.seekTo(currentTime)
      }

      if (playState === "play") {
        playerRef.current?.playVideo()
      }

      if (playState === "pause") {
        playerRef.current?.pauseVideo()
      }

    })

  }, [])
  const onStateChange = (event) => {

  if (!playerRef.current) return

  const state = event.data

  if (role !== "host" && role !== "moderator") return

  if (state === 1) { // playing
    socket.emit("play", { roomId })
  }

  if (state === 2) { // paused
    socket.emit("pause", { roomId })
  }

}

  return (

    <div
      className="video-container"
      style={{
        pointerEvents:
          role === "host" || role === "moderator"
            ? "auto"
            : "none"
      }}
    >
      {videoId ? (

        <YouTube
          className="youtube-player"
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />

      ) : (

        <p>No video loaded</p>

      )}

    </div>

  )
}

export default VideoPlayer