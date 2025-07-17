import { createSlice } from '@reduxjs/toolkit';

export const docFormSlice = createSlice({
  name: 'docform',
  initialState: {
    clauses: [''],
  },
  reducers: {
    setClause: (state, action) => {
      const { index, value } = action.payload;
      state.clauses[index] = value;
    },
    addClause: (state) => {
      state.clauses.push('');
    },
    removeClause: (state, action) => {
      state.clauses.splice(action.payload, 1);
    },
  },
});

export const { setClause, addClause, removeClause } = docFormSlice.actions;

export default docFormSlice.reducer;