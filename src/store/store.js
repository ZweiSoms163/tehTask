import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './FiltersSlice';
import layoutReducer from './layoutSlice';
import PaginationUiSlice from './PaginationUiSlice';
import themeReducer from './ThemeSlice';

export default configureStore({
  reducer: {
    filters: filtersReducer,
    layout: layoutReducer,
    pagination: PaginationUiSlice,
    theme: themeReducer,
  },
});
