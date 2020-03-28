import { useCallback, useEffect, useState } from "react";
import Video, { LocalVideoTrack, LocalAudioTrack } from "twilio-video";

export const useLocalAudioTrack = () => {
  const [track, setTrack] = useState<LocalAudioTrack>();

  useEffect(() => {
    Video.createLocalAudioTrack()
      .then(newTrack => {
        setTrack(newTrack);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const handleStopped = () => setTrack(undefined);
    if (track) {
      track.on("stopped", handleStopped);
      return () => {
        track.off("stopped", handleStopped);
      };
    }
  }, [track]);

  return track;
};

export const useLocalVideoTrack = () => {
  const [track, setTrack] = useState<LocalVideoTrack>();

  const getLocalVideoTrack = useCallback(
    () =>
      Video.createLocalVideoTrack({
        frameRate: 24,
        height: 720,
        width: 1280, // modify settings later
        name: "camera"
      }).then(newTrack => {
        setTrack(newTrack);
        return newTrack;
      }).catch(err => {
        console.log(err);
        return track;
      }),
    []
  );

  useEffect(() => {
    getLocalVideoTrack();
  }, [getLocalVideoTrack]);

  useEffect(() => {
    const handleStopped = () => setTrack(undefined);
    if (track) {
      track.on("stopped", handleStopped);
      return () => {
        track.off("stopped", handleStopped);
      };
    }
  }, [track]);

  return [track, getLocalVideoTrack] as const;
};

const useLocalTracks = () => {
  const audioTrack = useLocalAudioTrack();
  const [videoTrack, getLocalVideoTrack] = useLocalVideoTrack();

  const localTracks = [audioTrack, videoTrack].filter(
    track => track !== undefined
  ) as (LocalAudioTrack | LocalVideoTrack)[];

  return { localTracks, getLocalVideoTrack };
};

export default useLocalTracks;
