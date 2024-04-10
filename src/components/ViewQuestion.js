// src/components/ViewQuestion.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuestions, updateQuestion } from '../redux/actions';
import  '../css/ViewQuestion.css'

function ViewQuestion() {
  const { id } = useParams();
  const navigate = useNavigate()
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const [question, setQuestion] = useState(null);
  const [editMode, setEditMode] = useState(false)
  const [editedTitle, setEditedTitle] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [editedNotes, setEditedNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadQuestions())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch])

  useEffect(() => {
    if (window.location.pathname.includes('/edit')) {
      setEditMode(true);
    }
  }, []);
  useEffect(() => {
    if (!loading) {
      const foundQuestion = questions.find(q => q.id === id);
      console.log(foundQuestion, questions)
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setEditedTitle(foundQuestion.title);
        setEditedAnswer(foundQuestion.answer);
        setEditedNotes(foundQuestion.notes);
      }
    }
  }, [id, questions, loading]);

 
  const handleSave = () => {
    dispatch(updateQuestion({
      id: question.id,
      title: editedTitle,
      answer: editedAnswer,
      notes: editedNotes
    })).then(() => {
      navigate('/'); 
      dispatch(loadQuestions()); 
    });
  };

  return (
    <div className="view-question-container">
      {loading && <div>Loading...</div>}
      {!loading && question && (
        <div>
          <h1>{editMode ? 'Edit Question' : 'View Question'}</h1>
          <div className="field">
            <label>Title:</label>
            {editMode ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <span>{editedTitle}</span>
            )}
          </div>
          <div className="field">
            <label>Answer:</label>
            {editMode ? (
              <textarea
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
              ></textarea>
            ) : (
              <span>{editedAnswer}</span>
            )}
          </div>
          <div className="field">
            <label>Notes:</label>
            {editMode ? (
              <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
              ></textarea>
            ) : (
              <span>{editedNotes}</span>
            )}
          </div>
          {editMode && <button onClick={handleSave}>Save</button>}
        </div>
      )}
    </div>
  );
}

export default ViewQuestion;
