import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./notes/notes-slice";
import { authSlice } from "./auth/auth-slice";
import { authReducer } from "./auth/auth-slice";

export const store = configureStore({
  reducer: {
    noteSlice: noteReducer,
    authSlice: authReducer,
  },
});
