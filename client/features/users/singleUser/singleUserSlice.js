import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const fetchSingleUser = createAsyncThunk(
  "singleUser/fetchSingleUser",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      // console.log("--->", data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  }
);

export const followUser = createAsyncThunk(
  "singleUser/followUser",
  async (username) => {
    try {
      const { data } = await axios.get(`/api/follow/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = { ...state.user, ...action.payload };
    });
    builder.addCase(fetchSingleUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(followUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = { ...state.user, ...action.payload };
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log("state.error---->", state.error);
    });
  },
});

export default userSlice.reducer;
