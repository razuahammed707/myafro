import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  createReviewData: {},
  salonInfoForReview: {},
  profileReviewInfo: {},
  reviews: {},
};

export const createReview = createAsyncThunk(
  "/create/review",
  async (assets, thunkAPI) => {
    const { reviews } = thunkAPI.getState();
    try {
      let response = await axiosClient.post(
        `/reviews`,
        JSON.stringify(reviews?.createReviewData),
        {
          headers: {
            authorization: `Bearer ${assets?.token}`,
          },
        }
      );
      console.log(response?.data);
      return response?.data?.review;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//get logged in hair dresser salon api call
export const getReviews = createAsyncThunk(
  "/get/reviews",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.get(`/reviews/${assets?.salonId}`, {
        headers: {
          authorization: `Bearer ${assets?.token}`,
        },
      });
      console.log(response?.review);
      return response?.data?.review;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getCreateReviewData: (state, { payload }) => {
      state.createReviewData = payload;
    },
    getSalonInfoForReview: (state, { payload }) => {
      state.salonInfoForReview = payload
    },
    getProfileReviewInfo: (state, { payload }) => {
      state.profileReviewInfo = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.message = payload.message;
        return state;
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.message = payload.message;
        return state;
      })
      .addCase(getReviews.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.reviews = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(getReviews.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.reviews = payload;
        // state.message = payload.message;
        return state;
      });
  },
});

export const { getCreateReviewData, getSalonInfoForReview, getProfileReviewInfo } = reviewSlice.actions;
export const reviewSelector = (state) => state.reviews;
export default reviewSlice.reducer;
