import { useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"
import socket from "../../socket"

function VideoPlayer({ roomId, role }) {

  const playerRef = useRef(null)
  const [videoId, setVideoId] = useState("")

  const opts = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1
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
          videoId={videoId}
          opts={opts}
          onReady={onReady}
        />

      ) : (

        <p>No video loaded</p>

      )}

    </div>

  )
}

export default VideoPlayer