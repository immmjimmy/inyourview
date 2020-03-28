import React from "react";
import { LocalParticipant, RemoteParticipant, Track } from "twilio-video";
import Publication from "./Publication";

import usePublications from "../../hooks/usePublications";
import useVideoContext from "../../hooks/useVideoContext";

interface ParticipantTracksProps {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  videoPriority?: Track.Priority | null;
}

const ParticipantTracks = ({
  participant,
  disableAudio,
  enableScreenShare,
  videoPriority
}: ParticipantTracksProps) => {
  const { room } = useVideoContext();
  const publications = usePublications(participant);
  const isLocal = participant === room.localParticipant;

  let filteredPublications;

  if(enableScreenShare && publications.some(p => p.trackName === 'screen')) {
    filteredPublications = publications.filter(p => p.trackName !== 'camera');
  } else {
    filteredPublications = publications.filter(p => p.trackName !== 'screen');
  }

  return (
    <>
      {filteredPublications.map(publication => (
        <Publication 
          key={publication.kind}
          publication={publication}
          isLocal={isLocal}
          disableAudio={disableAudio}
          videoPriority={videoPriority}
        />
      ))}
    </>
  )
};

export default ParticipantTracks;
