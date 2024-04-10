import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion, loadQuestions } from '../redux/actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(loadQuestions());
  }, [dispatch]); // Include dispatch in the dependency array

  const handleDelete = (id) => {
    // if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id));
    // }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Question List</h1>
      <hr />
      <table className="table">
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
                <Link to={`/question/${question.id}`}>
                  <FontAwesomeIcon icon={faEye} style={iconStyle} />
                </Link>
                <Link to={`/question/${question.id}/edit`}>
                  <FontAwesomeIcon icon={faEdit} style={iconStyle} />
                </Link>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={iconStyle}
                  onClick={() => handleDelete(question.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const containerStyle = {
  maxWidth: '800px',
  margin: 'auto',
  padding: '20px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const iconStyle = {
  marginRight: '10px',
  cursor: 'pointer',
};

export default Home;
