import React, { lazy, Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ViewQuestion from './components/ViewQuestion';

const Home = lazy(() => import('./components/Home'));
const AddQuestion = lazy(() => import('./components/AddQuestion'));

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Question</Link>
        </li>
      </ul>
    </nav>
  );
}
function AppRoutes() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddQuestion />} />
          <Route path="/question/:id" element={<ViewQuestion />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default AppRoutes;
