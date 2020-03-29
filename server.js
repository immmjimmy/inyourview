const express = require("express");
const app = express();
const path = require("path");

const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
require("dotenv").config();

// MongoDB stuff
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
const BodyParser = require("body-parser");

const mongoConnectUser = process.env.MONGO_CONNECT_USER;
const mongoConnectPass = process.env.MONGO_CONNECT_PASS;
const CONNECTION_URL = "mongodb+srv://" + mongoConnectUser + ':' + mongoConnectPass + "@lahacks2020-0apqi.azure.mongodb.net/test?retryWrites=true&w=majority";

const DATABASE_NAME = "inyourview";

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
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

app.listen(8081, () => {
    console.log("token server running on 8081");

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }

    database = client.db(DATABASE_NAME);
    collection = database.collection("interviews");
    console.log("Connected to '" + DATABASE_NAME + "'!");
  });
});
