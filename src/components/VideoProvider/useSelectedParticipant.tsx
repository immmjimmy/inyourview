import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { Participant, Room } from "twilio-video";

type selectedParticipantContextType = [
  Participant | null,
  (participant: Participant) => void
];

export const selectedParticipantContext = createContext<
  selectedParticipantContextType
>(null!);

const useSelectedParticipant = () => {
  const [selectedParticipant, setSelectedParticipant] = useContext(
    selectedParticipantContext
  );
  return [selectedParticipant, setSelectedParticipant] as const;
};
export default useSelectedParticipant;

type SelectedParticipantProviderProps = {
  room: Room;
  children: ReactNode;
};

export const SelectedParticipantProvider = ({
  room,
  children
}: SelectedParticipantProviderProps) => {
  const [
    selectedParticipant,
    _setSelectedParticipant
  ] = useState<Participant | null>(null);

  const setSelectedParticipant = (participant: Participant) => {
    _setSelectedParticipant(prevParticipant =>
      prevParticipant === participant ? null : participant
    );
  };

  useEffect(() => {
    const onDisconnect = () => _setSelectedParticipant(null);
    room.on('disconnected', onDisconnect);
    return () => {
      room.off('disconnected', onDisconnect);
    }
  }, [room]);

  return (
    <selectedParticipantContext.Provider value={[selectedParticipant, setSelectedParticipant]}>
      {children}
    </selectedParticipantContext.Provider>
  )
};
