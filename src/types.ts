import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from "twilio-video";

export type Callback = (...args: any[]) => void;
export type ErrorCallback = (error: TwilioError) => void;
export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;
