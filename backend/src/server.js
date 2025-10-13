import http from "http"
import app from "./app.js";
import { initSocket } from "./socket.js";

const port = process.env.PORT || 5001;

const server = http.createServer(app);

initSocket(server);

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})