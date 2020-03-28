import React, { createContext, ReactNode } from "react";
import {
  ConnectOptions,
  Room,
  TwilioError,
  LocalAudioTrack,
  LocalVideoTrack
} from "twilio-video";
import { Callback, ErrorCallback } from "../../types";
import { SelectedParticipantProvider } from "./useSelectedParticipant";

import useHandleRoomDisconnectError from "./useHandleRoomDisconnectError";
import useHandleOnDisconnect from "./useHandleOnDisconnect";
import useHandleTrackPublicationFailed from "./useHandleTrackPublicationFailed";
import useLocalTracks from "./useLocalTracks";
import useRoom from "./useRoom";

export interface IVideoContext {
  room: Room;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: ErrorCallback;
  onDisconnect: Callback;
  getLocalVideoTrack: () => Promise<LocalVideoTrack | undefined>;
}

// Non-null operator (!) used to let compiler know that this will never be null or undefined
export const VideoContext = createContext<IVideoContext>(null!);

interface VideoProviderProps {
  onError: ErrorCallback;
  children: ReactNode;
  options?: ConnectOptions;
  onDisconnect?: Callback;
}

const VideoProvider: React.FC<VideoProviderProps> = ({
  options,
  children,
  onError = () => {},
  onDisconnect = () => {}
}) => {
  // Callback to print out the TwilioError message
  const onErrorCallback = (error: TwilioError) => {
    console.log(`ERROR: ${error.message}`, error);
    onError(error);
  };

  const { localTracks, getLocalVideoTrack } = useLocalTracks();
  const { room, isConnecting, connect } = useRoom(
    localTracks,
    onErrorCallback,
    options
  );

  // Register onError and onDisconnect callback functions
  useHandleRoomDisconnectError(room, onError);
  useHandleTrackPublicationFailed(room, onError);
  useHandleOnDisconnect(room, onError);

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        connect,
        onError: onErrorCallback,
        onDisconnect,
        getLocalVideoTrack,
      }}
    >
      <SelectedParticipantProvider room={room}>
        {children}
      </SelectedParticipantProvider>
    </VideoContext.Provider>
  );
};

export default VideoProvider;
