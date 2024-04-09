import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuestion, loadQuestions } from '../redux/actions';
import { Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(loadQuestions());
  }, [dispatch]); // Include dispatch in the dependency array


  const handleEdit = (id) => {
    const updatedQuestion = { ...questions, title: 'Updated Title', answer: 'Updated Answer' }; // Update with your form values
    dispatch(editQuestion(id, updatedQuestion));
  };

  const handleDelete = (id) => {
    // Add delete logic here
    console.log('Delete question with ID:', id);
  };

  return (
    <div>
      <h1>Question List</h1>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.title}</td>
              <td>{question.answer}</td>
              <td>
                <Link to={`/question/${question.id}`}>View</Link>
                <button onClick={() => handleEdit(question.id)}>Edit</button>
                <button onClick={() => handleDelete(question.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
