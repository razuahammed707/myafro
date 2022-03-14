import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  updateUserData: {},
  userInfo: {},
  message: "",
};

export const getUser = createAsyncThunk(
  "/get/user",
  async (assets, thunkAPI) => {
    try {
      let response = await axiosClient.get(`/user`, {
        headers: {
          authorization: `Bearer ${assets?.token}`,
        },
      });
      return response?.data?.user;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//update user
export const updateUser = createAsyncThunk(
    "/update/user",
    async (assets, thunkAPI) => {
      try {
        const {userProfile} = thunkAPI.getState()
        let response = await axiosClient.put(
          `/user`,
          JSON.stringify(userProfile.updateUserData),
          {
            headers: {
              authorization: `Bearer ${assets?.token}`,
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

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    getUserUpdateValues: (state, action) => {
      state.updateUserData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.userInfo = payload;
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.userInfo = payload;
        // state.message = payload.message;
        return state;
      })
      .addCase(updateUser.pending, (state) => {
        state.isFetching = true;
        return state;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        // state.message = payload.message;
        return state;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        // state.message = payload.message;
        return state;
      });
  },
});

export const { getUserUpdateValues } = userProfileSlice.actions;
export const userProfileSelector = (state) => state.userProfile;
export default userProfileSlice.reducer;
