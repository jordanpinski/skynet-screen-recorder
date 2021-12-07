import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    loggedIn: boolean;
    userProfile: any;
    userPreferences: any;
}

const initialState = {
    loggedIn: false,
    userProfile: null,
    userPreferences: null,
} as IUser;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setUserProfile: (state, action: PayloadAction<any>) => {
            state.userProfile = action.payload;
        },
        setUserPreferences: (state, action: PayloadAction<any>) => {
            state.userPreferences = action.payload;
        },
    },
});

export const { setLoggedIn, setUserProfile, setUserPreferences } =
    userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.skynet.value

export default userSlice.reducer;
