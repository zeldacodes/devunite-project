import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    try {
      const { data } = await axios.get("/api/users/my-profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("--->", data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profile) => {
    try {
      const { data } = await axios.put("/api/users", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("--->", data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  profile: {},
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.profile = { ...state.profile, ...action.payload };
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.profile = { ...state.profile, ...action.payload };
      console.log("state.profile ---->", state.profile);
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;
