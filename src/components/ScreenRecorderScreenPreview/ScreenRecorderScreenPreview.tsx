import { FC, useEffect, useRef } from "react"

export interface IScreenRecorderScreenPreview {
  streams: {
    audio?: MediaStreamTrack | null | undefined
    screen?: MediaStreamTrack | null | undefined
  }
  isActive: boolean
}

export const ScreenRecorderScreenPreview: FC<IScreenRecorderScreenPreview> = ({ streams, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!streams.screen) return;
    const video: HTMLVideoElement = videoRef.current ? videoRef.current : document.createElement("video");
    const stream = new MediaStream([streams.screen]);
    video.srcObject = stream;
    video.play();
  }, [streams])

  return (
    <div className={`screen-recorder-screen-preview ${isActive ? "video-recording" : ""}`}>
      <video ref={videoRef}></video>
    </div>
  )
}