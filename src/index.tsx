import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ConnectOptions } from "twilio-video";

import "bootstrap/dist/css/bootstrap.min.css";

// import App from "./App";
import Room from "./components/VideoComponents/VideoRoom";
import Landing from "./components/LandingComponents/Landing";
import Host from "./components/LandingComponents/Host";
import Join from "./components/LandingComponents/Join";
import Feedback from "./components/FeedbackComponents/Feedback";

import AppStateProvider, { useAppState } from "./state";
import VideoProvider from "./components/VideoProvider";

import Dictaphone from "./components/SpeechToTextComponents/Dictaphone";

const connectionOptions: ConnectOptions = {
  bandwidthProfile: {
    video: {
      mode: "collaboration"
    }
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: {
    local: 1,
    remote: 1
  },
  preferredVideoCodecs: [{ codec: "VP8" }]
};

const VideoAppWrapper = () => {
  const { setError } = useAppState();

  const [transcription, setTranscription] = useState<string>("");
  const [user, setUser] = useState<string>("user");

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <Dictaphone updateTranscript={setTranscription} user={user} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/host">
            <Host />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route
            exact
            path="/room/:room/:name/:username/:interviewee"
            children={
              <Room
                transcription={transcription}
                interviewerUsername={true}
                updateUser={setUser}
                updateTranscription={setTranscription}
              />
            }
          />
          <Route
            exact
            path="/room/:room/:name"
            children={
              <Room
                transcription={transcription}
                updateUser={setUser}
                updateTranscription={setTranscription}
              />
            }
          />
          <Route path="/feedback">
            <Feedback />
          </Route>
        </Switch>
      </Router>
    </VideoProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <VideoAppWrapper />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
