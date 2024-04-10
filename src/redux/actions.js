// src/redux/actions.js

import { ActionTypes } from './actionTypes';
import axios from 'axios';
import shortid from 'shortid';


const baseApiUrl = 'http://localhost:5000'

export const loadQuestions = () => {
  return async (dispatch) => {
    try {
      console.log("load questions")
      const response = await axios.get(baseApiUrl + '/api/questions');
      dispatch({
        type: ActionTypes.LOAD_QUESTIONS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };
};
export const saveQuestion = (question) => {
  return async (dispatch) => {
    try {
      // Generate a 6-digit hash as the question ID
      question.id = shortid.generate().substring(0, 6);

      // Send the question to the server
      await axios.post(baseApiUrl + '/api/questions', question);

      // Dispatch the ADD_QUESTION action with the question
      dispatch({
        type: ActionTypes.ADD_QUESTION,
        payload: question,
      });
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };
};

export const updateQuestion = (updatedQuestion) => {
  return async (dispatch) => {
    try {
      await axios.put(baseApiUrl + `/api/questions/${updatedQuestion.id}`, updatedQuestion);
      dispatch({
        type: ActionTypes.EDIT_QUESTION,
        payload: { id: updatedQuestion.id, updatedQuestion },
      });
    } catch (error) {
      console.error('Error editing question:', error);
    }
  };
};

export const deleteQuestion = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(baseApiUrl + `/api/questions/${id}`);
      dispatch({
        type: ActionTypes.DELETE_QUESTION,
        payload: id,
      });
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };
};
