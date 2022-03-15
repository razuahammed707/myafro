import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  bookings: [],
  createBookingData: {},
};

export const createBooking = createAsyncThunk(
  "/create/booking",
  async (assets, thunkAPI) => {
    const { booking } = thunkAPI.getState();
    try {
      let response = await axiosClient.post(
        `/bookings`,
        JSON.stringify(booking.createBookingData),
        {
          headers: {
            authorization: `Bearer ${assets?.token}`,
          },
        }
      );
      console.log(response?.data);
      return response?.data?.booking;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getBookings = createAsyncThunk(
  "/get/bookings",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.get(`/bookings`, {
        headers: {
          authorization: `Bearer ${assets?.token}`,
        },
      });
      console.log(response?.data?.booking);
      return response?.data?.booking;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    getCreateBookingData: (state, { payload }) => {
      state.createBookingData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(createBooking.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(createBooking.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.message = payload.message;
        return state;
      })
      .addCase(getBookings.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getBookings.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.bookings = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(getBookings.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.bookings = payload;
        // state.message = payload.message;
        return state;
      });
  },
});

export const { getCreateBookingData } = bookingSlice.actions;
export const bookingSelector = (state) => state.booking;
export default bookingSlice.reducer;
