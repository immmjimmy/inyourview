import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ConnectOptions } from "twilio-video";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import Landing from "./components/LandingComponents/Landing";
import Host from "./components/LandingComponents/Host";
import Join from "./components/LandingComponents/Join";
import Feedback from "./components/FeedbackComponents/Feedback";

import AppStateProvider, { useAppState } from "./state";
import VideoProvider from "./components/VideoProvider";

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

  return (
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
        <Route path="/room">
          <VideoProvider options={connectionOptions} onError={setError}>
            <App />
          </VideoProvider>
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
      </Switch>
    </Router>
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
