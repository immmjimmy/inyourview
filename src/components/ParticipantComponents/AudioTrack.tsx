import React, { useEffect, useRef } from 'react';
import { AudioTrack as IAudioTrack } from 'twilio-video';

interface AudioTrackProps {
  track: IAudioTrack;
}

const AudioTrack = ({ track }: AudioTrackProps) => {
  const ref = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    const audioElement = ref.current;
    track.attach(audioElement);
    return () => {
      track.detach(audioElement);
    };
  }, [track]);
  
  return <audio ref={ref} />
};

export default AudioTrack;