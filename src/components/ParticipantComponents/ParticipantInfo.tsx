import React, { ReactNode } from "react";
import {
  LocalParticipant,
  RemoteParticipant,
  RemoteVideoTrack,
  LocalVideoTrack
} from "twilio-video";

import usePublications from "../../hooks/usePublications";
import useIsTrackSwitchedOff from "../../hooks/useIsTrackSwitchedOff";
import usePublicationIsTrackEnabled from "../../hooks/usePublicationIsTrackEnabled";
import useTrack from "../../hooks/useTrack";

import { Container, Row, Col } from "react-bootstrap";

interface ParticipantInfoProps {
  participant: LocalParticipant | RemoteParticipant;
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
}

const ParticipantInfo = ({
  participant,
  onClick,
  isSelected,
  children
}: ParticipantInfoProps) => {
  const publications = usePublications(participant);

  const audioPublication = publications.find(p => p.kind === "audio");
  const videoPublication = publications.find(p => p.kind === "video");

  const isAudioEnabled = usePublicationIsTrackEnabled(audioPublication);
  const isVideoEnabled = Boolean(videoPublication);

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(
    videoTrack as LocalVideoTrack | RemoteVideoTrack
  );

  return (
    <Container>
      { children }
    </Container>
  );
};

export default ParticipantInfo;
