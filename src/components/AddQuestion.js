import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadQuestions, saveQuestion } from '../redux/actions';

function AddQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveQuestion = () => {
    dispatch(saveQuestion({ title, answer, notes })).then(() => {
      navigate('/');
      dispatch(loadQuestions());
    });
  };

  const handleReset = () => {
    setTitle('');
    setAnswer('');
    setNotes('');
    navigate('/');
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Add Question</h1>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <label>Answer:</label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={textareaStyle}
      />
      <label>Notes:</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={textareaStyle}
      />
      <div style={buttonContainerStyle}>
        <button onClick={handleSaveQuestion} style={buttonStyle}>Save</button>
        <button onClick={handleReset} style={buttonStyle}>Reset</button>
      </div>
    </div>
  );
}



const containerStyle = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '20px', // Add some top margin
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  boxSizing: 'border-box',
};

const textareaStyle = {
  width: '100%',
  height: '100px',
  padding: '8px',
  marginBottom: '10px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  display: 'block',
  width: '30%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};


export default AddQuestion;
