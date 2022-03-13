import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  salons: {},
  singleSalonId: {},
  queries: {},
};

export const getSalons = createAsyncThunk(
  "/get/salons",
  async (assets, thunkAPI) => {
    const { userHome } = thunkAPI.getState();
    console.log(userHome.queries);
    try {
      let response = await axiosClient.get(
        `/salons?location=&salon_type=${
          userHome.queries?.salon_type || ""
        }&hair_type=${userHome.queries?.hair_type || ""}`,
        {
          headers: {
            authorization: `Bearer ${assets?.token}`,
          },
        }
      );
      return response?.data?.salons;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userHomeSlice = createSlice({
  name: "userHome",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isFetching = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
    getUserHomeAPIQueries: (state, { payload }) => {
      state.queries = payload;
    },
    getSingleSalonInfo: (state, {payload}) => {
      state.singleSalonId = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalons.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getSalons.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.salons = payload;
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(getSalons.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.salons = payload;
        // state.message = payload.message;
        return state;
      });
  },
});

export const { reset, getUserHomeAPIQueries, getSingleSalonInfo } = userHomeSlice.actions;
export const userHomeSelector = (state) => state.userHome;
export default userHomeSlice.reducer;
