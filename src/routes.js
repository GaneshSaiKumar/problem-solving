import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./components/Home'));
const AddQuestion = lazy(() => import('./components/AddQuestion'));
const ViewQuestion = lazy(() => import('./components/ViewQuestion'));

function AppRoutes() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddQuestion />} />
          <Route path="/question/:id" element={<ViewQuestion />} />
          <Route path="/question/:id/edit" element={<ViewQuestion />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default AppRoutes;
