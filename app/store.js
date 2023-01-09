import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../components/budgetSlice';

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
  },
});