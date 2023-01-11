import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../components/budgetSlice';
import paginateReducer from '../components/paginateSlice';

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    paginate: paginateReducer,
  },
});