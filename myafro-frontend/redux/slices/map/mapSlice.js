import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  times: {},
  message: "",
};


export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isFetching = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
    getDateTimes: (state, { payload }) => {
      state.times = payload;
    }
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getSalons.pending, (state) => {
//         state.isFetching = true;
//         return state;
//       })
//   },
});

export const { reset,  getDateTimes} = mapSlice.actions;
export const mapSelector = (state) => state.map;
export default mapSlice.reducer;
