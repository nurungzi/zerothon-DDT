// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* "/" */}
        <Route path="friends" element={<Friends />} /> {/* "/friends" */}
        {/* <Route path="stats" element={<Stats />} /> 도 여기로 추가 가능 */}
      </Route>
    </Routes>
  );
}

export default App;
