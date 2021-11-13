import { FC, useContext, useState } from "react";
import { SkynetContext } from "src/lib/skynetContext";
import { IRecording } from "src/lib/models";
import useScreenRecorder from "use-screen-recorder";

export interface IScreenRecorder {
  recordings: IRecording[]
  setRecordings: (action: IRecording[]) => void;
}

export const ScreenRecorder: FC<IScreenRecorder> = ({ recordings, setRecordings }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    blobUrl,
    // pauseRecording,
    resetRecording,
    // resumeRecording,
    startRecording,
    status,
    stopRecording,
  } = useScreenRecorder({
    audio: true
  });

  const skynetClient = useContext(SkynetContext);

  const handleSaveRecording = async () => {
    try {
      setLoading(true);
      const recordingLength = (recordings.length + 1).toString();

      // Get the actual blob.
      const mediaBlob = await fetch(blobUrl ? blobUrl : "")
        .then(response => response.blob());

      // Convert the blob to an mp4 video file.
      const file = new File(
        [mediaBlob],
        `recording-${recordingLength}.mp4`,
        { type: "video/mp4" }
      );
      // @ts-ignore
      const { skylink } = await skynetClient.uploadFile(file);
      const skylinkUrl = await skynetClient?.getSkylinkUrl(skylink);

      // Merge new recording
      setRecordings([...recordings, {
        blobUrl: blobUrl ? blobUrl : "",
        skylink: skylinkUrl ? skylinkUrl : "",
        title: `Recording ${recordingLength}`,
        dateCreated: new Date()
      }]);
    } catch (error: any) {
      console.log(error);
    }
    resetRecording();
    setLoading(false);
  }

  return (
    <>
      <div className="screen-recorder">
        <h1>Screen Recorder</h1>
        <p>Easily record and share your screen with the world. All files are uploaded to <a href="https://sia.tech/" title="Sia" target="_blank" rel="noreferrer">Sia</a> via <a href="https://siasky.net/" title="Skynet" target="_blank" rel="noreferrer">Skynet</a>. To start click <strong>REC</strong> below.</p>
        <p><strong>Status: {status}</strong></p>
        <button onClick={startRecording} title="REC" className={status} disabled={status === "recording" ? true : false}>REC</button>
        <div className={`actions ${status}`}>
          <button className="button" onClick={stopRecording} title="Stop">Stop &#x025FC;</button>
        </div>
      </div>

      {blobUrl ?
        <div className="screen-recorder-preview">
          <div className="video-wrapper">
            <h3>Preview</h3>
            <div className="video">
              <video poster="/use-screen-recorder/poster.png" controls={true} autoPlay={true} src={blobUrl ? blobUrl : ""}></video>
            </div>
            <div className="video-actions">
              <button className="button button--primary" onClick={handleSaveRecording} title="Save Video">{loading ? "loading.." : "Save Video"}</button>
              <button className="button" onClick={resetRecording} title="Redo">Redo</button>
            </div>
          </div>
        </div>
      : null }
    </>
  )
}