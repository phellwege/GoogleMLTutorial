import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home';



function App() {
  return (
    <>
      <React.Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </React.Fragment>
    </>
  );
}

export default App;
