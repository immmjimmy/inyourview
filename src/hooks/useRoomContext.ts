import { useEffect, useState } from "react";
import useVideoContext from "./useVideoContext";

type RoomStateType = "disconnected" | "connected" | "reconnecting";

const useRoomState = () => {
  const { room } = useVideoContext();
  const [state, setState] = useState<RoomStateType>("disconnected");

  useEffect(() => {
    const setRoomState = () =>
      setState((room.state || "disconnected") as RoomStateType);
    setRoomState();

    room.on("disconnected", setRoomState);
    room.on("reconnected", setRoomState);
    room.on("reconnecting", setRoomState);

    return () => {
      room.off("disconnected", setRoomState);
      room.off("reconnected", setRoomState);
      room.off("reconnecting", setRoomState);
    };
  }, [room]);

  return state;
};

export default useRoomState;
