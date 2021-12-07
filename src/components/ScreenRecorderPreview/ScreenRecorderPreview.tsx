import { FC, useState, useContext } from "react";
import { SkynetContext } from "src/lib/skynetContext";
import { IRecording } from "src/lib/models";

export interface IScreenRecorderPreview {
    blobUrl: string;
    recordings: IRecording[];
    resetRecording: () => void;
    setRecordings: (action: IRecording[]) => void;
}

export const ScreenRecorderPreview: FC<IScreenRecorderPreview> = ({
    blobUrl,
    recordings,
    resetRecording,
    setRecordings,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const skynetState = useContext(SkynetContext);
    const skynetClient = skynetState?.skynetClient;

    const handleSaveRecording = async () => {
        try {
            setLoading(true);
            const recordingLength = (recordings.length + 1).toString();

            // Get the actual blob.
            const mediaBlob = await fetch(blobUrl ? blobUrl : "").then(
                (response) => response.blob()
            );

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
            setRecordings([
                ...recordings,
                {
                    blobUrl: blobUrl ? blobUrl : "",
                    skylink: skylinkUrl ? skylinkUrl : "",
                    title: `Recording ${recordingLength}`,
                    dateCreated: new Date(),
                },
            ]);
        } catch (error: any) {
            console.log(error);
        }
        resetRecording();
        setLoading(false);
    };

    return (
        <div className="screen-recorder-preview">
            <div className="video-wrapper">
                <h3>Preview</h3>
                <div className="video">
                    <video
                        poster="/use-screen-recorder/poster.png"
                        controls={true}
                        autoPlay={true}
                        src={blobUrl ? blobUrl : ""}
                    ></video>
                </div>
                <div className="video-actions">
                    <button
                        className="button button--primary"
                        onClick={handleSaveRecording}
                        title="Save Video"
                    >
                        {loading ? "Saving, Please Wait.." : "Save Video"}
                    </button>
                    <button
                        className="button"
                        onClick={resetRecording}
                        title="Redo"
                    >
                        Redo
                    </button>
                </div>
            </div>
        </div>
    );
};
