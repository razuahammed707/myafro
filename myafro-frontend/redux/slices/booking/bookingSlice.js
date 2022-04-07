import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  sendMessage: "",
  bookings: [],
  getUpdateBookingData: {},
  singleBooking: {},
  singleBookedSalon: {},
  getMessagesData: [],
  userBookings: [],
  createBookingData: {},
  createdBooking: {}
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

export const createMessageToSend = createAsyncThunk(
  "/create/message",
  async (assets, thunkAPI) => {
    const { booking } = thunkAPI.getState();
    try {
      let response = await axiosClient.put(
        `/bookings/message/${assets?.bookingId}`,
        JSON.stringify(booking.sendMessage),
        {
          headers: {
            authorization: `Bearer ${assets?.token}`,
          },
        }
      );
      console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getMessages = createAsyncThunk(
  "/get/message",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.get(
        `/bookings/message/${assets?.bookingId}`,
        {
          headers: {
            authorization: `Bearer ${assets?.token}`,
          },
        }
      );
      console.log(response?.data?.messages);
      return response?.data?.messages;
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

export const getBookingsByUser = createAsyncThunk(
  "/get/bookings/user",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.get(`/bookings/user`, {
        headers: {
          authorization: `Bearer ${assets?.token}`,
        },
      });
      // console.log(response?.data);
      return response?.data?.bookings;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateBooking = createAsyncThunk(
  "/update/booking",
  async (assets, thunkAPI) => {
    const { booking } = thunkAPI.getState();
    try {
      let response = await axiosClient.put(
        `/bookings/${assets?.bookingId}`,
        JSON.stringify(booking?.getUpdateBookingData),
        {
          headers: {
            authorization: `Bearer ${assets?.token}`,
          },
        }
      );
      console.log(response?.data);
      return response?.data;
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
    getMessageToSend: (state, { payload }) => {
      state.sendMessage = payload;
    },
    getSingleBooking: (state, { payload }) => {
      state.singleBooking = payload;
    },
    getSingleBookedSalon: (state, { payload }) => {
      state.singleBookedSalon= payload
    },
    getUpdateBookingData: (state, { payload }) => {
      state.getUpdateBookingData = payload;
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
        state.createdBooking = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(createBooking.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.message = payload.message;
        return state;
      })
      .addCase(createMessageToSend.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(createMessageToSend.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.message = payload.message;
        return state;
      })
      .addCase(createMessageToSend.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.message = payload.message;
        return state;
      })
      .addCase(getMessages.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.getMessagesData = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(getMessages.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.getMessagesData = payload;
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
      })
      .addCase(updateBooking.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(updateBooking.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.bookings = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(updateBooking.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.bookings = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(getBookingsByUser.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getBookingsByUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.userBookings = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(getBookingsByUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.userBookings = payload;
        // state.message = payload.message;
        return state;
      });
  },
});

export const {
  getCreateBookingData,
  getMessageToSend,
  getSingleBooking,
  getUpdateBookingData,
  getSingleBookedSalon
} = bookingSlice.actions;
export const bookingSelector = (state) => state.booking;
export default bookingSlice.reducer;
