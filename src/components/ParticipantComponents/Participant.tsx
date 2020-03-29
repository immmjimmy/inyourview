import React from "react";
import ParticipantInfo from "./ParticipantInfo";
import ParticipantTracks from "./ParticipantTracks";
import { LocalParticipant, RemoteParticipant } from "twilio-video";

interface ParticipantProps {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
}

const Participant = ({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected
}: ParticipantProps) => {
  return (
    <ParticipantTracks
      participant={participant}
      disableAudio={disableAudio}
      enableScreenShare={enableScreenShare}
    />
  );
};

export default Participant;
