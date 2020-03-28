import { useEffect } from "react";
import { Room } from "twilio-video";
import { Callback } from "../../types";

const useHandleOnDisconnect = (room: Room, onDisconnect: Callback) => {
  useEffect(() => {
    room.on("disconnected", onDisconnect);
    return () => {
      room.off("disconnected", onDisconnect);
    };
  }, [room, onDisconnect]);
};

export default useHandleOnDisconnect;
