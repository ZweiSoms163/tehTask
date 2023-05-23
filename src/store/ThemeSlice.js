import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkTheme: true,
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
