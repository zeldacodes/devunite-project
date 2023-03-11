import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk(
  "singleUser/fetchSingleUser",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      console.log("--->", data.user);
      return data.user;
    } catch (error) {
      throw error;
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
  },
});

export default userSlice.reducer;
