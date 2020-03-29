import React, { Component } from "react";
import PropTypes from "prop-types";
//@ts-ignore
import SpeechRecognition from "react-speech-recognition";

interface DictaphoneProps {
  transcript: String,
  browserSupportsSpeechRecognition: Boolean
}

const Dictaphone = ({
  transcript,
  browserSupportsSpeechRecognition
}: DictaphoneProps) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div style={{
          width: "200px",
          height: "300px",
          border: "1px solid #ccc",
          overflowY: "auto"
        }}>{transcript}</div>
  );
};

export default SpeechRecognition(Dictaphone);
