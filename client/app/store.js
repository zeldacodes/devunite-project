import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/userList/userListSlice";
import singleUserReducer from "../features/users/singleUser/singleUserSlice";
import { persistMiddleware } from "./persist-middleware";
import profileReducer from "../features/users/profile/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    singleUser: singleUserReducer,
    myProfile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    persistMiddleware,
  ],
});

export default store;
export * from "../features/auth/authSlice";
