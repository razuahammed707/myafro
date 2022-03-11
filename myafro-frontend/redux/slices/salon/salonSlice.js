import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const replaceSalonInfo = async (value) => {
  try {
      const replaceValue = JSON.stringify(value);
      await AsyncStorage.setItem("salon_info", replaceValue);
  } catch (e) {
    console.log(e);
  }
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
      console.log(response.data)
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
      if (response.data.status === true) {
        replaceSalonInfo(response.data?.salon);
      }
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
    getHairDresser: (state, action) => {
      state.hairDresserData = action.payload;
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

export const { reset, getValues, getLoggedInUser, getHairDresser } = salonSlice.actions;
export const salonSelector = (state) => state.salon;
export default salonSlice.reducer;
