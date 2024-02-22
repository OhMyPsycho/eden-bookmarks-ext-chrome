import React from 'react';
import './popup.scss';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';

const Popup = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </MemoryRouter>
  );
};

export default Popup;
