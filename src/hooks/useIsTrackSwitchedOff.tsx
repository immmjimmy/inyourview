import { useState, useEffect } from "react";
import { LocalVideoTrack, RemoteVideoTrack } from "twilio-video";

type TrackType = RemoteVideoTrack | LocalVideoTrack | undefined | null;

const useIsTrackSwitchedOff = (track: TrackType) => {
  const [isSwitchedOff, setIsSwitchedOff] = useState(
    // @ts-ignore
    track && track.isSwitchedOff
  );

  useEffect(() => {
    // Reset the value if track changes
    // @ts-ignore
    setIsSwitchedOff(track && track.isSwitchedOff);

    if (track) {
      const handleSwitchedOff = () => setIsSwitchedOff(true);
      const handleSwitchedOn = () => setIsSwitchedOff(false);

      track.on("switchedOff", handleSwitchedOff);
      track.on("switchedOn", handleSwitchedOn);

      return () => {
        track.off("switchedOff", handleSwitchedOff);
        track.off("switchedOn", handleSwitchedOn);
      };
    }
  }, [track]);

  return !!isSwitchedOff; // bang bang :)
};

export default useIsTrackSwitchedOff;
