import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import docFormReducer from "./features/documentFormSlice";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        form: docFormReducer,
    }
})