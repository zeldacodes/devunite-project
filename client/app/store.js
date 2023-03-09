import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/userList/userListSlice";
import singleUserReducer from "../features/users/singleUser/singleUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    singleUser: singleUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
