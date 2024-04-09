import { ActionTypes } from "./actionTypes";

const initialState = {
  questions: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    case ActionTypes.LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
      case ActionTypes.SAVE_QUESTION_NOTES:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.id ? { ...question, notes: action.payload.notes } : question
        ),
      };
    case ActionTypes.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter((question) => question.id !== action.payload),
      };
      case ActionTypes.EDIT_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.id ? action.payload.updatedQuestion : question
        ),
      };
    default:
      return state;
  }
};


export default rootReducer;

