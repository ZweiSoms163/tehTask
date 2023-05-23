import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    author: [],
    location: [],
  },
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});
export const { setAuthor, setLocation } = layoutSlice.actions;

export default layoutSlice.reducer;
