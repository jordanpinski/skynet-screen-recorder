import { FC } from "react"
import { IRecording } from "src/lib/models"

export interface IRecordingList {
  recordings: IRecording[]
}

export const RecordingList: FC<IRecordingList> = ({ recordings }) => {
  return (
    <div className="recording-list">
      <h3>Recordings</h3>
      <ul>
        {recordings.length ? 
          recordings.map((recording: IRecording, index: number) => {
            const date = new Date(recording.dateCreated);
            return (
              <li key={index}>
                <a href={recording.skylink} target="_blank" title={recording.title} rel="noreferrer">
                  <video src={recording.blobUrl}></video>
                  <div className="description">
                    <strong>{recording.title}</strong> <p>{date.toLocaleDateString()}</p>
                  </div>
                </a>
              </li>
            )
          })
        :
          <li>Nothing here yet!</li>
        }
      </ul>
    </div>
  )
}