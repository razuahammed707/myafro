import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  token: null,
  updateSalonData: {},
  loggedInUserData: {},
};

//create salon api call
export const createSalon = createAsyncThunk(
  "/create/salons",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.post("/salons", JSON.stringify(assets.salonData), {
        headers: {
          authorization: `Bearer ${assets.token}`,
        },
      });
      console.log(values);
      // console.log(response.data)
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//create salon api call
export const updateSalon = createAsyncThunk(
  "/update/salons",
  async (assets, thunkAPI) => {
    try {
      console.log(assets)
      let response = await axiosClient.put(
        `/salons/${assets.salonId}`,
        JSON.stringify(assets.salonData),
        {
          headers: {
            authorization: `Bearer ${assets.token}`,
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isFetching = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
    getValues: (state, action) => {
      state.updateSalonData = action.payload;
    },
    getLoggedInUser: (state, action) => {
      state.loggedInUserData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSalon.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(createSalon.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.createdSalon = payload;
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(createSalon.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.createdSalon = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(updateSalon.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(updateSalon.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.updatedSalon = payload;
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(updateSalon.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.updatedSalon = payload;
        // state.message = payload.message;
        return state;
      });
  },
});

export const { reset, getValues, getLoggedInUser } = salonSlice.actions;
export const salonSelector = (state) => state.salon;
export default salonSlice.reducer;
