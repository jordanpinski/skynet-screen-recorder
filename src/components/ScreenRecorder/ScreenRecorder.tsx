import { FC, useState } from "react";
import { IRecording } from "src/lib/models";
import useScreenRecorder from "use-screen-recorder";
import { ReactSVG } from "react-svg";
import { ScreenRecorderPreview } from "../ScreenRecorderPreview";
// import { ScreenRecorderOptions } from "../ScreenRecorderOptions";
import { Button } from "../common/Button";
import { ScreenRecorderScreenPreview } from "../ScreenRecorderScreenPreview";

export interface IScreenRecorder {
    recordings: IRecording[];
    setRecordings: (action: IRecording[]) => void;
}

export const ScreenRecorder: FC<IScreenRecorder> = ({
    recordings,
    setRecordings,
}) => {
    // const [recordSounds, setRecordSounds] = useState<boolean>(false);

    const {
        blobUrl,
        // pauseRecording,
        resetRecording,
        // resumeRecording,
        startRecording,
        status,
        stopRecording,
        streams,
    } = useScreenRecorder({
        audio: true,
    });

    return (
        <>
            <div className="screen-recorder">
                {/* <h1>Screen Recorder</h1>
        <p>Easily record and share your screen with the world. All files are uploaded to <a href="https://sia.tech/" title="Sia" target="_blank" rel="noreferrer">Sia</a> via <a href="https://siasky.net/" title="Skynet" target="_blank" rel="noreferrer">Skynet</a>. To start click <strong>REC</strong> below.</p> */}
                {/* <ScreenRecorderOptions recordSounds={recordSounds} setRecordSounds={setRecordSounds} /> */}
                <ScreenRecorderScreenPreview
                    streams={streams}
                    isActive={status === "recording"}
                />
                <div className="actions">
                    <Button
                        onClick={startRecording}
                        title="Record"
                        className="button button--primary"
                        disabled={status === "recording" ? true : false}
                    >
                        Record
                        <ReactSVG src="/svg/video-solid.svg" />
                    </Button>
                    <Button
                        onClick={() => stopRecording}
                        title="Stop"
                        className="button button--primary"
                    >
                        Stop
                        <ReactSVG src="/svg/stop-solid.svg" />
                    </Button>
                </div>
            </div>

            {blobUrl ? (
                <ScreenRecorderPreview
                    blobUrl={blobUrl}
                    recordings={recordings}
                    setRecordings={setRecordings}
                    resetRecording={resetRecording}
                />
            ) : null}
        </>
    );
};
