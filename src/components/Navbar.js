import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <span style={{ margin: '0 10px' }}>|</span>
      <Link to="/add" style={linkStyle}>Add Question</Link>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'flex-end', // Align items to the right
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'transparent',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '6px 12px',
  borderRadius: '5px',
  backgroundColor: '#007bff',
};

export default Navbar;
