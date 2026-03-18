import { io } from "socket.io-client"

const socket = io("https://synctube-t61e.onrender.com")

export default socket