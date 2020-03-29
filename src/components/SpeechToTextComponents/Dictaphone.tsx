import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
//@ts-ignore
import SpeechRecognition from "react-speech-recognition";

interface DictaphoneProps {
  transcript: string,
  user: string
}

const socket = socketIOClient('http://localhost:8081');

const Dictaphone = ({ transcript, user="user" }: DictaphoneProps) => {
  const [textToDisplay, setTextToDisplay] = useState("");

  // constantly emit transcribed speech
  useEffect(() => {
    socket.emit(user, transcript);
  }, [transcript]);

  // control where transcript is sent based on host or user
  useEffect(() => {
    if (user === "host") {
      //@ts-ignore
      socket.on("user", data => setTextToDisplay(data));
    } else {
      //@ts-ignore
      socket.on("host", data => setTextToDisplay(data));
    }
  }, []);

  return <>{textToDisplay}</>;
};

export default SpeechRecognition(Dictaphone);
