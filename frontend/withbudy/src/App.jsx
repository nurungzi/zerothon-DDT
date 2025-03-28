// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Stats from './pages/Stats';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* "/" */}
        <Route path="stats" element={<Stats />} /> 
        <Route path="friends" element={<Friends />} /> {/* "/friends" */}
      </Route>
    </Routes>
  );
}

export default App;
