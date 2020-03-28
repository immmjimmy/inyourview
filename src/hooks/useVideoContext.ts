import { useContext } from "react";
import { VideoContext } from "../components/VideoProvider";

const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

export default useVideoContext;
