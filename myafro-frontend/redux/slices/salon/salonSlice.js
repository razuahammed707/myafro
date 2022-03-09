import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  token: null,
  getSalonData: {},
  createdSalon: {},
  data: {},
};

//create salon api call
export const createSalon = createAsyncThunk(
  "/salons",
  async (token, values, thunkAPI) => {
    try {
      let response = await axiosClient.post("/salons", JSON.stringify(values), {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(values)
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
  "/salons",
  async (token, values, thunkAPI) => {
    try {
      let response = await axiosClient.post(`/salons/${cred }`, JSON.stringify(values), {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(values)
      // console.log(response.data)
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// get salon by user
export const getSalon = createAsyncThunk("/salon", async (token, thunkAPI) => {
  try {
    let response = await axiosClient.get("/salon", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data);
  }
});

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
      state.getSalonData = action.payload;
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
        state.createdSalon = payload
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(createSalon.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.createdSalon = payload
        // state.message = payload.message;
        return state;
      })
      .addCase(getSalon.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getSalon.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.data = payload;
        state.message = payload.message;
        return state;
      })
      .addCase(getSalon.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.data = payload;
        state.message = payload.message;
        return state;
      });
  },
});

export const { reset, getValues } = salonSlice.actions;
export const salonSelector = (state) => state.salon;
export default salonSlice.reducer;
