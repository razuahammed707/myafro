import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  locationInfo: {},
  salonDistances: [],
  currentLocationInfo: {},
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
    getLocationInfo: (state, { payload }) => {
      state.locationInfo = payload;
    },
    getCurrentLocationInfo: (state, { payload }) => {
      state.currentLocationInfo = payload
    },
    getSalonDistances: (state, { payload }) => {
      state.salonDistances = payload
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

export const { reset,  getLocationInfo, getSalonDistances, getCurrentLocationInfo} = mapSlice.actions;
export const mapSelector = (state) => state.map;
export default mapSlice.reducer;
