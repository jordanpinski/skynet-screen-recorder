import { FC } from "react";

export interface IScreenRecorderOptions {
  recordSounds: boolean
  setRecordSounds: (action: boolean) => void
}

export const ScreenRecorderOptions: FC<IScreenRecorderOptions> = ({ recordSounds, setRecordSounds}) => {
  console.log({recordSounds})
  return (
    <>
      <h3>Options</h3>
      <div className="screen-recorder-options">
        <form>
          <div className="input-wrapper">
            <label htmlFor="sound-enabled">Record Sound?</label>
            <input type="checkbox" name="sound-enabled" id="sound-enabled" onChange={() => setRecordSounds(!recordSounds)} />
          </div>
        </form>
      </div>
    </>
  )
}