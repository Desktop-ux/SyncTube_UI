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

    const handlePlay = () => {
      playerRef.current?.playVideo()
    }

    const handlePause = () => {
      playerRef.current?.pauseVideo()
    }

    const handleSeek = ({ time }) => {
      playerRef.current?.seekTo(time, true)
    }

    const handleChangeVideo = ({ videoId }) => {

      console.log("video received:", videoId)

      setVideoId(videoId)

      setTimeout(() => {
        playerRef.current?.loadVideoById(videoId)
      }, 300)

    }

    const handleSyncState = ({ videoId, playState, currentTime }) => {

      if (!playerRef.current) return

      if (videoId) {

        setVideoId(videoId)

        setTimeout(() => {
          playerRef.current?.loadVideoById(videoId)
        }, 300)

      }

      setTimeout(() => {

        if (currentTime !== undefined) {
          playerRef.current?.seekTo(currentTime, true)
        }

        if (playState === "play") {
          playerRef.current?.playVideo()
        }

        if (playState === "pause") {
          playerRef.current?.pauseVideo()
        }

      }, 700)

    }

    socket.on("play", handlePlay)
    socket.on("pause", handlePause)
    socket.on("seek", handleSeek)
    socket.on("change_video", handleChangeVideo)
    socket.on("sync_state", handleSyncState)

    return () => {

      socket.off("play", handlePlay)
      socket.off("pause", handlePause)
      socket.off("seek", handleSeek)
      socket.off("change_video", handleChangeVideo)
      socket.off("sync_state", handleSyncState)

    }

  }, [])

  const onStateChange = (event) => {

    if (!playerRef.current) return

    const state = event.data

    if (role !== "host" && role !== "moderator") return

    if (state === 1) {

      socket.emit("play", { roomId })

    }

    if (state === 2) {

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