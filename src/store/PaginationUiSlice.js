import { createSlice } from '@reduxjs/toolkit';

const PaginationUiSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const { setPage } = PaginationUiSlice.actions;

export default PaginationUiSlice.reducer;
