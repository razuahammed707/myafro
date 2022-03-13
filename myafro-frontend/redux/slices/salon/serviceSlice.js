import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetchingService: false,
  isSuccessService: false,
  isError: false,
  message: "",
  serviceTitle: "",
  fetchedSingleTitle: {},
};

//create service api call
export const createSalonService = createAsyncThunk(
  "/create/service",
  async (assets, thunkAPI) => {
    try {
      // const state = thunkAPI.getState()
      // console.log(state)
      let response = await axiosClient.post(
        `/salons/${assets.salonId}/services`,
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
export const updateSalonService = createAsyncThunk(
  "/update/service",
  async (assets, thunkAPI) => {
    try {
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
  reducers: {
    getServiceTitle: (state, { payload }) => {
      state.serviceTitle = payload;
    },
    fetchedSingleService: (state, { payload }) => {
      state.fetchedSingleTitle = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSalonService.pending, (state) => {
        state.isFetchingService = true;
        return state;
      })
      .addCase(createSalonService.fulfilled, (state, { payload }) => {
        state.isFetchingService = false;
        // state.createdSalon = payload;
        state.isSuccessService = true;
        state.message = payload.message;
        return state;
      })
      .addCase(createSalonService.rejected, (state, { payload }) => {
        state.isFetchingService = false;
        state.isSuccessService = false;
        // state.createdSalon = payload;
        state.message = payload.message;
        return state;
      })
      .addCase(updateSalonService.pending, (state) => {
        state.isFetchingService = true;
        return state;
      })
      .addCase(updateSalonService.fulfilled, (state, { payload }) => {
        state.isFetchingService = false;
        // state.updatedSalon = payload;
        state.isSuccessService = true;
        state.message = payload.message;
        return state;
      })
      .addCase(updateSalonService.rejected, (state, { payload }) => {
        state.isFetchingService = false;
        state.isSuccessService = false;
        // state.updatedSalon = payload;
        state.message = payload.message;
        return state;
      })
      .addCase(deleteSalonService.pending, (state) => {
        state.isFetchingService = true;
        return state;
      })
      .addCase(deleteSalonService.fulfilled, (state, { payload }) => {
        state.isFetchingService = false;
        // state.updatedSalon = payload;
        state.isSuccessService = true;
        state.message = payload.message;
        return state;
      })
      .addCase(deleteSalonService.rejected, (state, { payload }) => {
        state.isFetchingService = false;
        state.isSuccessService = false;
        // state.updatedSalon = payload;
        state.message = payload.message;
        return state;
      });
  },
});

export const { getServiceTitle, fetchedSingleService } = serviceSlice.actions;
export const serviceSelector = (state) => state.salonService;
export default serviceSlice.reducer;
