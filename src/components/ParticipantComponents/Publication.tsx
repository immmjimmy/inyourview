import React from "react";
import useTrack from "../../hooks/useTrack";
import AudioTrack from "./AudioTrack";
import VideoTrack from "../VideoComponents/VideoTrack";

import { IVideoTrack } from "../../types";
import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  RemoteTrackPublication,
  Track
} from "twilio-video";


// Removed participant from props interface because it wasn't used - we'll see if it's an issue
interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  isLocal: boolean;
  disableAudio?: boolean;
  videoPriority?: Track.Priority | null;
}

const Publication = ({
  publication,
  isLocal,
  disableAudio,
  videoPriority
}: PublicationProps) => {
  const track = useTrack(publication);

  if (!track) {
    return null;
  }

  switch (track.kind) {
    case "video":
      return (
        <VideoTrack
          track={track as IVideoTrack}
          priority={videoPriority}
          isLocal={track.name === "camera" && isLocal}
        />
      );
    case "audio":
      return disableAudio ? null : <AudioTrack track={track as IAudioTrack} />;
    default:
      return null;
  }
};

export default Publication;
