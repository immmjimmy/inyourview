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

// ==================================== MongoDB Routes ======================//
// Saves a new interviewer
/**
Format:
{
	"username":"Interviewer name",
	"interviews":
	[
		{
			"name":"Interviewee name",
			"code":"big blobeeeeeeeee",
			"notes":"interviewer feedback"
		}
	]
}
*/
app.post("/post/interview", (request, response) => {
    collection.update(
      {"username":request.body["username"]},
      {$setOnInsert: request.body},
      {upsert: true},
      (error, result) => {
          if (error) {
              return response.status(500).send(error);
          }
          return response.send(result.result);
      });
});

// Saves a new interview under an interviewer
app.post("/post/interview/:interviewer", (request, response) => {
    // Find the interviewer to add under
    collection.find({"username" : request.params.interviewer}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        } else if (result.length <= 0) {
            return response.status(404).send("Interviewer not found!")
        }

        // Add it to the list of interviews
        result[0]["interviews"].push(request.body);

        // Save it to the database
        collection.updateOne(
          { "username" : request.params.interviewer},
          {$set: { "interviews": result[0]["interviews"]}},
          (error, result) => {
              if (error) {
                  return response.status(500).send(error);
              }

              return response.send(result.result);
          });
    });
});

// Gets all of an interviewer's interviews
app.get("/get/interview/:interviewer", (request, response) => {
    collection.find({"username":request.params.interviewer}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        } else if (result.length <= 0) {
            return response.status(404).send("Interviewer not found!")
        }
        return response.send(result[0]["interviews"]);
    });
});

// Gets a specific interview from the interviewer's interview
app.get("/get/interview/:interviewer/:interviewee", (request, response) => {
    collection.find({"username":request.params.interviewer}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        } else if (result.length <= 0) {
            return response.status(404).send("Interviewer not found!")
        }

        interviews = result[0]["interviews"];
        for (i = 0; i < interviews.length; i++) {
          if (interviews[i]["name"] == request.params.interviewee) {
              return response.send(interviews[i]);
          }
        }
        return response.status(404).send("interviewee not found!");
    });
});

/**
Deletes all of the interviewers specified by the post
*/
app.post("/delete/interviewers", (request, response) => {
    for (i = 0; i < request.body["names"].length; i++) {
      collection.deleteOne(
        { "username": request.body["names"][i] },
        (error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
        });
    }
    return response.status(200).send("deleasdated: " + request.body["names"]);
});

/**
Deletes the interviewee specified by name under the specified interviewer
*/
app.get("/delete/:interviewer/:interviewee", (request, response) => {
    // Get the interviewer's document
    collection.find({"username":request.params.interviewer}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        } else if (result.length <= 0) {
            return response.status(404).send("Interviewer not found!");
        }

        // Get the list of interviews and remove the interviewee
        interviews = result[0]["interviews"];
        interviewee = -1;
        for (i = 0; i < interviews.length; i++) {
            if (interviews[i]["name"] == request.params.interviewee) {
                interviewee = i;
                break;
            }
        }
        if (interviewee < 0) {
            return response.status(404).send("Interviewee " + interviewee + " not found!");
        }
        interviews.splice(interviewee, 1);

        // Now save it to the db
        collection.updateOne(
          {"username": request.params.interviewer},
          {$set: {"interviews": interviews}},
          (error, result) => {
              if (error) {
                  return response.status(500).send(err);
              }
              return response.send(result.result);
          });
    });
});

/**
Updates a specific interview
Takes a dictionary body.

Every parameter is optional
{
"name":"updated interviewee name",
"code":"updated code",
"notes":"updated feedback"
}
*/
app.post("/update/interview/:interviewer/:interviewee", (request, response) => {
  collection.find({"username":request.params.interviewer}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      } else if (result.length <= 0) {
          return response.status(404).send("Interviewer not found!")
      }

      // Find the interview we need to modify
      interviews = result[0]["interviews"];
      interviewee = -1;
      for (i = 0; i < interviews.length; i++) {
          if (interviews[i]["name"] == request.params.interviewee) {
              interviewee = i;
              break;
          }
      }

      // Check to see if it was found
      if (interviewee < 0) {
          return response.status(404).send("Interviewee not found!");
      }

      // Find and update fields specified by the request
      keys = Object.keys(request.body)
      for (i = 0; i < keys.length; i++) {
          interviews[interviewee][keys[i]] = request.body[keys[i]];
      }

      // Now we do another call to collection to update the db with our data
      collection.updateOne(
        {"username":request.params.interviewer},
        {$set: {"interviews":interviews}},
        (error, result) => {
          if (error) {
              return response.status(500).send(error);
          }
          return response.send(result.result);
      });
  });
});
