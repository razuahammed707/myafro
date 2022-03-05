import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: {},
};

export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    let response = await axiosClient.post("/login", JSON.stringify(user));
    return response.data;
  } catch (e) {
    console.log("Error", e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    reset: (state) => {
      (state.isFetching = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data = payload;
      state.message = payload.message
      return state;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.data = payload;
      state.message = payload.message;
    },
  },
});

export const { reset } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;
