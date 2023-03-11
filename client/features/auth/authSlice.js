import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";

/*
  THUNKS
*/

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const res = await axios.post("/api/users/login", { email, password });
      localStorage.setItem(TOKEN, res.data.token);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }) => {
    try {
      const res = await axios.post("/api/users/register", {
        username,
        email,
        password,
      });
      console.log("res.data", res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

/*
  SLICE
*/

const initialState = JSON.parse(localStorage.getItem("auth")) || {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = { ...state.user, ...action.payload };
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = { ...state.user, ...action.payload };
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

/*
  ACTIONS
*/

/*
  REDUCER
*/
export default authSlice.reducer;
