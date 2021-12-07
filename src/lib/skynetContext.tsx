import { FC, createContext, useEffect, useState } from "react";
import { SkynetClient, MySky } from "skynet-js";
import {
    UserProfileDAC,
    IUserProfile,
    IUserPreferences,
} from "@skynethub/userprofile-library";

const DATA_DOMAIN = window.location.hostname === "localhost" ? "localhost" : "";

interface ISkynetState {
    skynetClient: SkynetClient;
    mySky: MySky | null;
    userID: any | null;
    userProfile: IUserProfile | null;
    userPreferences: IUserPreferences | null;
    loggedIn: boolean;
}

export const SkynetProvider: FC = ({ children }) => {
    const userProfileRecord = new UserProfileDAC();
    const [handshakeAttempt, setHandshakeAttempt] = useState<number>(1);
    const [skynetState, setSkynetState] = useState<ISkynetState>({
        skynetClient: new SkynetClient("https://siasky.net"),
        mySky: null,
        userID: null,
        userProfile: null,
        userPreferences: null,
        loggedIn: false,
    });

    const initSkynet = async () => {
        try {
            // Initialize MySky
            const mySky = await skynetState.skynetClient.loadMySky(
                DATA_DOMAIN,
                {
                    // debug: DATA_DOMAIN === "localhost" ? true : false,
                    // dev: DATA_DOMAIN === "localhost" ? true : false,
                    // handshakeAttemptsInterval: 50,
                    // handshakeMaxAttempts: 300,
                }
            );

            // Logged In
            const loggedIn = await mySky.checkLogin();

            // Initialize DACs
            await mySky.loadDacs(userProfileRecord);

            // User Profile
            let userID = null;
            let userProfile = null;
            let userPreferences = null;
            if (await mySky.checkLogin()) {
                userID = await mySky.userID();
                // @ts-ignore
                userProfile = await mySky.getProfile(userID);
                // @ts-ignore
                userPreferences = await mySky.getPreferences(userID);
            }

            setSkynetState({
                ...skynetState,
                mySky,
                userID,
                userProfile,
                userPreferences,
                loggedIn,
            });
        } catch (error) {
            console.dir(error);

            // Retry connection if handshake fails. Maximum of 3 tries.
            if (handshakeAttempt <= 3) {
                initSkynet();
                setHandshakeAttempt(handshakeAttempt + 1);
            }
        }
    };

    useEffect(() => {
        if (!skynetState.mySky) {
            initSkynet();
        }
    }, [skynetState]);

    console.log(skynetState);

    return (
        <SkynetContext.Provider value={skynetState}>
            {children}
        </SkynetContext.Provider>
    );
};

export const SkynetContext = createContext<null | ISkynetState>(null);
