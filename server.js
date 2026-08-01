const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", summaryRoutes);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {

    console.log("User Connected");

    socket.on("join-room", (roomId) => {

        socket.join(roomId);

        console.log("User joined room:", roomId);

        io.to(roomId).emit(
            "user-joined",
            "A user joined room " + roomId
        );

    });

});

server.listen(3000, () => {

    console.log("Server running on port 3000");

});