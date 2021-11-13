import { useState } from "react";
import { RecordingList } from './components/RecordingList';
import { ScreenRecorder } from './components/ScreenRecorder';
import { SkynetProvider } from "./lib/skynetContext";
import { IRecording } from "./lib/models";
import './Global.css';

function App() {
  const [recordings, setRecordings] = useState<IRecording[]>([]);

  return (
    <SkynetProvider>
      <div className="app">
        <ScreenRecorder recordings={recordings} setRecordings={setRecordings} />
        <RecordingList recordings={recordings} />
      </div>
    </SkynetProvider>
  );
}

export default App;
