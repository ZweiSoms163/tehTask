import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedAuthor: [],
    selectedLocation: [],
    inputFrom: '',
    inputBefore: '',
  },
  reducers: {
    setSelectedAuthor: (state, action) => {
      state.selectedAuthor = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setInputFrom: (state, action) => {
      state.inputFrom = action.payload;
    },
    setInputBefore: (state, action) => {
      state.inputBefore = action.payload;
    },
  },
});

export const { setSelectedAuthor, setSelectedLocation, setInputFrom, setInputBefore } =
  filtersSlice.actions;

export default filtersSlice.reducer;
