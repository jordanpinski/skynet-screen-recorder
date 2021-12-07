import { useState, useContext, useEffect } from "react";
import { Layout } from "./components/common/Layout";
import { RecordingList } from "./components/RecordingList";
import { ScreenRecorder } from "./components/ScreenRecorder";
import { MobileWarning } from "./components/common/MobileWarning";
import { LoadingOverlay } from "./components/common/LoadingOverlay";
import { IRecording } from "./lib/models";
import { useAppDispatch } from "./lib/hooks";
import { setLoggedIn } from "./lib/slices/user";
import { SkynetContext } from "src/lib/skynetContext";
import "./Global.css";

function App() {
    // Initialize Redux state
    const skynetState = useContext(SkynetContext);
    const loggedIn = skynetState?.loggedIn ? skynetState.loggedIn : false;
    const dispatch = useAppDispatch();
    dispatch(setLoggedIn(loggedIn));

    // Initialize Local state
    const [recordings, setRecordings] = useState<IRecording[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (skynetState?.mySky) {
            setLoading(false);
        }
    }, [skynetState]);

    return (
        <Layout>
            <ScreenRecorder
                recordings={recordings}
                setRecordings={setRecordings}
            />
            {/* <RecordingList recordings={recordings} /> */}
            <MobileWarning />
            {loading ? <LoadingOverlay /> : null}
        </Layout>
    );
}

export default App;
