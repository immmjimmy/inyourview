import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

interface DictaphoneProps = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition
}: DictaphoneProps) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <textarea style={{
          width: "200px",
          height: "300px",
          overflowY: "auto"
        }}>{transcript}</textarea>
    </div>
  );
};

export default SpeechRecognition(Dictaphone);
