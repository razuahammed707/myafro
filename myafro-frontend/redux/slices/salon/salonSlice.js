import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  updateSalonData: {},
  hairDresserData: {},
  userData: {},
};

//create salon api call
export const createSalon = createAsyncThunk(
  "/create/salons",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.post(
        "/salons",
        JSON.stringify(assets.salonData),
        {
          headers: {
            authorization: `Bearer ${assets.token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//get logged in hair dresser salon api call
export const getSalon = createAsyncThunk(
  "/get/salon",
  async (token, thunkAPI) => {
    try {
      let response = await axiosClient.get("/salons", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data?.salons[0]);
      return response?.data?.salons[0];
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
      const { salon } = thunkAPI.getState();
      let response = await axiosClient.put(
        `/salons/${assets?.salonId}`,
        JSON.stringify(salon.updateSalonData),
        {
          headers: {
            authorization: `Bearer ${assets?.token}`,
          },
        }
      );
      console.log(response.data);
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
      state.userData = action.payload;
    },
    // getHairDresser: (state, action) => {
    //   state.hairDresserData = action.payload;
    // },
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
      .addCase(getSalon.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getSalon.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.hairDresserData = payload;
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(getSalon.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.hairDresserData = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(updateSalon.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(updateSalon.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.updateSalonData = {};
        // state.message = payload.message;
        return state;
      })
      .addCase(updateSalon.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.message = payload.message;
        return state;
      });
  },
});

export const { reset, getValues, getLoggedInUser } = salonSlice.actions;
export const salonSelector = (state) => state.salon;
export default salonSlice.reducer;
