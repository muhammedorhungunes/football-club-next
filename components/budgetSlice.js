import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 100,
  status: 'idle',
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    set: (state, action) => {
        state.value = action.payload;
      },
  },
  extraReducers: (builder) => {
  },
});

export const {  set } = budgetSlice.actions;

export const getBudget = (state) => state.budget.value;

export default budgetSlice.reducer;