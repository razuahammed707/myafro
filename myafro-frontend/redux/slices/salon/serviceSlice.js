import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//create service api call
export const createSalonService = createAsyncThunk(
  "/create/service",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.post(
        `/salons/${assets.salonId}/services`,
        JSON.stringify(assets.serviceData),
        {
          headers: {
            authorization: `Bearer ${assets.token}`,
          },
        }
      );
      console.log(values);
      // console.log(response.data)
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//update service api call
export const updateSalonService = createAsyncThunk(
  "/update/service",
  async (assets, thunkAPI) => {
    try {
      console.log(assets);
      let response = await axiosClient.put(
        `/salons/${assets.salonId}/services/${assets.serviceId}`,
        JSON.stringify(assets.serviceData),
        {
          headers: {
            authorization: `Bearer ${assets.token}`,
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

//update service api call
export const deleteSalonService = createAsyncThunk(
  "/delete/service",
  async (assets, thunkAPI) => {
    try {
      console.log(assets);
      let response = await axiosClient.delete(
        `/salons/${assets.salonId}/services/${assets.serviceId}`,
        {
          headers: {
            authorization: `Bearer ${assets.token}`,
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

export const serviceSlice = createSlice({
  name: "salonService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSalonService.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(createSalonService.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        // state.createdSalon = payload;
        state.isSuccess = true;
        state.message = payload.message;
        return state;
      })
      .addCase(createSalonService.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.createdSalon = payload;
        state.message = payload.message;
        return state;
      })
      .addCase(updateSalonService.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(updateSalonService.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        // state.updatedSalon = payload;
        state.isSuccess = true;
        state.message = payload.message;
        return state;
      })
      .addCase(updateSalonService.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.updatedSalon = payload;
        state.message = payload.message;
        return state;
      })
      .addCase(deleteSalonService.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(deleteSalonService.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        // state.updatedSalon = payload;
        state.isSuccess = true;
        state.message = payload.message;
        return state;
      })
      .addCase(deleteSalonService.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.updatedSalon = payload;
        state.message = payload.message;
        return state;
      });
  },
});

export const serviceSelector = (state) => state.salonService;
export default serviceSlice.reducer;
