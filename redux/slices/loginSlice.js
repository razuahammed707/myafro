import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducer: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = loginSlice.actions;

// selector
export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;

export default loginSlice.reducer;
