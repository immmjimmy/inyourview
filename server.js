const express = require("express");
const path = require("path");
//const http = require("http");
const socketio = require("socket.io");

const app = express();
//const server = http.createServer(app);
//const io = socketio(server);

const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
require("dotenv").config();

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

app.use(express.static(path.join(__dirname, "build")));

app.get("/token", (req, res) => {
  const { identity, roomName } = req.query;

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKeySID,
    twilioApiKeySecret,
    {
      ttl: MAX_ALLOWED_SESSION_DURATION
    }
  );

  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);

  console.log(`issued token for ${identity} in room ${roomName}`);
  res.send(token.toJwt());
});

app.get("/", (_, res) => {
  console.log(res);
  res.sendFile(path.join(__dirname, "build/index.html"))}
);

const server = app.listen(8081, () => console.log("token server running on 8081"));
const io = socketio(server);

io.on("connection", socket => {
    socket.on("user", (data)=>{
      socket.broadcast.emit("user", data);
      console.log("user", data)
    });
    socket.on("host", (data)=>{
      socket.broadcast.emit("host", data);
      console.log("host", data)
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
});
