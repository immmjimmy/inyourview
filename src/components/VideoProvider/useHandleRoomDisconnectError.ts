import { Room, TwilioError } from "twilio-video";
import { useEffect } from "react";

import { Callback } from "../../types";

const useHandleRoomDisconnectError = (room: Room, onError: Callback) => {
  useEffect(() => {
    const onDisconnected = (room: Room, error: TwilioError) => {
      if (error) {
        onError(error);
      }
    };

    room.on("disconnected", onDisconnected);
    return () => {
      room.off("disconnected", onDisconnected);
    };
  }, [room, onError]);
};

export default useHandleRoomDisconnectError;
