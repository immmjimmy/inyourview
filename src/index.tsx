import React from "react";
import ReactDOM from "react-dom";

import { ConnectOptions } from "twilio-video";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

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
    <VideoProvider options={connectionOptions} onError={setError}>
      <App />
    </VideoProvider>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <VideoAppWrapper />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
