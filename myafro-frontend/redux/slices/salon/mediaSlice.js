import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../config/base";

const initialState = {
  isFetchingMedia: false,
  isSuccessMedia: false,
  isError: false,
  mediaInfo: null,
  sharedMedia: null,
  message: "",
};

//create service api call
export const createMedia = createAsyncThunk(
  "/create/media",
  async (mediaInfo, thunkAPI) => {
    try {
      const { salonMedia, auth, salon } = thunkAPI.getState();
      let response = await axiosClient.post(
        `/salons/${salon?.hairDresserData?._id}/media`,
        mediaInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${auth?.token}`,
          },
          transformRequest: (data, headers) => {
            return mediaInfo;
          },
        }
      );
      if (response.data.success) {
        alert("Media uploaded successfully");
      }
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const uploadSharedImage = createAsyncThunk(
  "/upload/image",
  async (mediaInfo, thunkAPI) => {
    try {
      let response = await axiosClient.post(`/upload`, mediaInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return mediaInfo;
        },
      });
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//update service api call
export const deleteMedia = createAsyncThunk(
  "/update/service",
  async (assets, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      let response = await axiosClient.delete(
        `/salons/${assets.salonId}/media/${assets.mediaId}`,
        {
          headers: {
            authorization: `Bearer ${auth?.token}`,
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

export const mediaSlice = createSlice({
  name: "salonMedia",
  initialState,
  reducers: {
    getMediaInfo: (state, { payload }) => {
      state.mediaInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMedia.pending, (state) => {
        state.isFetchingMedia = true;
        return state;
      })
      .addCase(createMedia.fulfilled, (state, { payload }) => {
        state.isFetchingMedia = false;
        state.mediaInfo = null;
        state.isSuccessMedia = true;
        state.message = payload?.message;
        return state;
      })
      .addCase(createMedia.rejected, (state, { payload }) => {
        state.isFetchingMedia = false;
        state.isSuccessMedia = false;
        // state.createdSalon = payload;
        state.message = payload?.message;
        return state;
      })
      .addCase(uploadSharedImage.pending, (state) => {
        state.isFetchingMedia = true;
        return state;
      })
      .addCase(uploadSharedImage.fulfilled, (state, { payload }) => {
        state.isFetchingMedia = false;
        state.sharedMedia = payload;
        state.isSuccessMedia = true;
        return state;
      })
      .addCase(uploadSharedImage.rejected, (state, { payload }) => {
        state.isFetchingMedia = false;
        state.isSuccessMedia = false;
        return state;
      })
      .addCase(deleteMedia.pending, (state) => {
        state.isFetchingMedia = true;
        return state;
      })
      .addCase(deleteMedia.fulfilled, (state, { payload }) => {
        state.isFetchingMedia = false;
        // state.updatedSalon = payload;
        state.isSuccessMedia = true;
        state.message = payload?.message;
        return state;
      })
      .addCase(deleteMedia.rejected, (state, { payload }) => {
        state.isFetchingService = false;
        state.isSuccessService = false;
        // state.updatedSalon = payload;
        state.message = payload?.message;
        return state;
      });
  },
});

export const { getMediaInfo } = mediaSlice.actions;
export const mediaSelector = (state) => state.salonMedia;
export default mediaSlice.reducer;
