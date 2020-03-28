import EventEmitter from "events";
import { useCallback, useEffect, useRef, useState } from "react";
import Video, { ConnectOptions, LocalTrack, Room } from "twilio-video";
import { Callback } from "../../types";

const useRoom = (
  localTracks: LocalTrack[],
  onError: Callback,
  options?: ConnectOptions
) => {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const disconnectHandlerRef = useRef<() => void>(() => {});
  const localTracksRef = useRef<LocalTrack[]>([]);

  // Update reference to our localTracks if it changes (usually when user grants permission)
  useEffect(() => {
    localTracksRef.current = localTracks;
  }, [localTracks]);

  const connect = useCallback(
    token => {
      setIsConnecting(true);

      // Can replace tracks : [] with tracks : localTracksRef.current depending on use case
      return Video.connect(token, { ...options, tracks: [] }).then(
        newRoom => {
          setRoom(newRoom);

          newRoom.once("disconnected", () => {
            setTimeout(() => setRoom(new EventEmitter() as Room));
            window.removeEventListener(
              "beforeunload",
              disconnectHandlerRef.current
            );
          });

          // // @ts-ignore
          // window.twilioRoom = newRoom; // manually expose the newRoom to the window as a global var

          localTracksRef.current.forEach(track => {
            newRoom.localParticipant.publishTrack(track);
          });

          // Updates the disconnection reference
          disconnectHandlerRef.current = () => newRoom.disconnect();
          setIsConnecting(false);

          // Adds a listener to disconnect from the room when a user closes browser
          window.addEventListener("beforeunload", disconnectHandlerRef.current);
        },
        error => {
          onError(error);
          setIsConnecting(false);
        }
      );
    },
    [options, onError]
  );

  return { room, isConnecting, connect };
};

export default useRoom;
