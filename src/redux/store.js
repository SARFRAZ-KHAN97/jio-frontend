const { configureStore } = require("@reduxjs/toolkit");
import userSlice from "./userSlice";

export const makeStore= () => {
    return configureStore({
        reducer: {
            user: userSlice.reducer
        }
    })
} 