import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import teamReducer from "./slices/teamSlice";
import projectReducer from "./slices/projectSlice";
import reviewReducer from "./slices/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    team: teamReducer,
    project: projectReducer,
    review: reviewReducer,
  },
});

export default store;
