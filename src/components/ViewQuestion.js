// src/components/ViewQuestion.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadQuestions, saveQuestionNotes } from '../redux/actions';

function ViewQuestion() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);
  const question = questions.find(q => q.id === id);

  const [notes, setNotes] = useState(question?.notes || '');

  
  useEffect(() => {
    dispatch(loadQuestions()); // Fetch all questions when component mounts
  }, [dispatch]);

  useEffect(() => {
    setNotes(question?.notes || '');
  }, [question]);

  const handleSaveNotes = () => {
    dispatch(saveQuestionNotes(id, notes));
  };

  return (
    <div>
      <h1>Question Details</h1>
      {question && (
        <div>
          <p>
            <strong>Question:</strong> {question.title}
          </p>
          <p>
            <strong>Answer:</strong> {question.answer}
          </p>
          <div>
            <label>
              Notes:
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>
          <div>
            <button onClick={handleSaveNotes}>Save Notes</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewQuestion;
