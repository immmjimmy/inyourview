import React, { useEffect } from "react";
//@ts-ignore
import SpeechRecognition from "react-speech-recognition";

interface DictaphoneProps {
  transcript: string;
  user: string;
  updateTranscript: React.Dispatch<React.SetStateAction<string>>;
}


const Dictaphone = ({ transcript, user, updateTranscript }: DictaphoneProps) => {

  // constantly emit transcribed speech
  useEffect(() => {
    // socket.emit(user, transcript);
  }, [transcript]);

  // control where transcript is sent based on host or user
  useEffect(() => {
    if (user === "host") {
      //@ts-ignore
      // socket.on("user", data => updateTranscript(data));
    } else {
      //@ts-ignore
      // socket.on("host", data => updateTranscript(data));
    }
  }, []);

  return <></>;
};

export default SpeechRecognition(Dictaphone);
