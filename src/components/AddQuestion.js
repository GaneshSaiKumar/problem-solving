import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveQuestion } from '../redux/actions';

function AddQuestion() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(saveQuestion({ title, answer }));
    setTitle('');
    setAnswer('');
  };

  return (
    <div>
      <h1>Add Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Answer:
          <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddQuestion;
