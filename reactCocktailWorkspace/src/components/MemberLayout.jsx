import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './member/Join';
import Login from './member/Login';

const MemberLayout = () => {
    return (
        <div>
        <BrowserRouter>
        <Routes>
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
        </div>
    );
};

export default MemberLayout;