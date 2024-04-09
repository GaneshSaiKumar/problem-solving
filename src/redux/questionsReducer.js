import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
  },
});

export const { addQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
