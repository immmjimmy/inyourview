import React from "react";
import Participant from "./Participant";

import useParticipants from "../../hooks/useParticipants";
import useVideoContext from "../../hooks/useVideoContext";
import useSelectedParticipant from "../VideoProvider/useSelectedParticipant";
import { Container } from "react-bootstrap";

const ParticipantStrip = () => {
  const {
    room: { localParticipant }
  } = useVideoContext();

  const participants = useParticipants();
  const [
    selectedParticipant,
    setSelectedParticipant
  ] = useSelectedParticipant();

  return (
    <>
      <Participant
        participant={localParticipant}
        isSelected={selectedParticipant === localParticipant}
        onClick={() => setSelectedParticipant(localParticipant)}
      />
      {participants.map(participant => (
        <Participant
          key={participant.sid}
          participant={participant}
          isSelected={selectedParticipant === participant}
          onClick={() => setSelectedParticipant(participant)}
        />
      ))}
    </>
  );
};

export default ParticipantStrip;
