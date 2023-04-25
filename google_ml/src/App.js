import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Webcam from './views/webcam';
import './App.css';


function App() {
  return (
    <div className='App'>
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/webcam' element={<Webcam/>} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
