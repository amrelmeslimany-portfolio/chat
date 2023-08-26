import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("darkmode") ? true : false,
  isSiderOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      // Save to local storage
      if (state.darkMode == false) localStorage.removeItem("darkmode");
      else localStorage.setItem("darkmode", true);
    },
    toggleSider: (state) => {
      state.isSiderOpen = !state.isSiderOpen;
    },
  },
});

export const { changeMode, toggleSider } = globalSlice.actions;

export default globalSlice.reducer;
