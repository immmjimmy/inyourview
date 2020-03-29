import React, { useRef, useEffect } from "react";
import { IVideoTrack } from "../../types";
import { Track } from "twilio-video";

import "./VideoTrack.css";

const videoStyles = {
  width: "100%",
  maxHeight: "100%"
};

interface VideoTrackProps {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority | null;
}

const VideoTrack = ({ track, isLocal, priority }: VideoTrackProps) => {
  const ref = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const videoElement = ref.current;
    videoElement.muted = true;

    // @ts-ignore
    if (track.setPriority && priority) {
      // @ts-ignore
      track.setPriority(priority);
    }

    track.attach(videoElement);

    return () => {
      track.detach(videoElement);

      // @ts-ignore
      if (track.setPriority && priority) {
        // @ts-ignore
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  const style: React.CSSProperties = isLocal
    ? { ...videoStyles, transform: "rotateY(180deg)" }
    : videoStyles;

  return <video ref={ref} style={style} />;
};

export default VideoTrack;
