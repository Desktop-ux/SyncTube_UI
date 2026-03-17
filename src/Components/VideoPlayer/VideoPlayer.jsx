import { useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"
import socket from "../../socket"
import "./VideoPlayer.css"

function VideoPlayer({ roomId }) {

  const playerRef = useRef(null)
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ")

  const opts = {
    width: "900",
    height: "500",
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

    const handlePlay = () => {
      if (playerRef.current) {
        playerRef.current.playVideo()
      }
    }

    const handlePause = () => {
      if (playerRef.current) {
        playerRef.current.pauseVideo()
      }
    }

    const handleSeek = ({ time }) => {
      if (playerRef.current) {
        playerRef.current.seekTo(time)
      }
    }

    const handleChangeVideo = ({ videoId }) => {
      setVideoId(videoId)

      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId)
      }
    }

    const handleSyncState = ({ videoId, playState, currentTime }) => {

      if (!playerRef.current) return

      if (videoId) {
        setVideoId(videoId)
        playerRef.current.loadVideoById(videoId)
      }

      if (currentTime) {
        playerRef.current.seekTo(currentTime)
      }

      if (playState === "play") {
        playerRef.current.playVideo()
      }

      if (playState === "pause") {
        playerRef.current.pauseVideo()
      }
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

  return (
    <div className="video-container">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
      />
    </div>
  )
}

export default VideoPlayer