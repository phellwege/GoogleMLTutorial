import React, { useState, useEffect, useRef } from 'react';
import './main.css';
import Model from '../tensorflow/model';
import { Link } from 'react-router-dom';

export default () => {

    return (
        <div className="PageWrap">
        <h1>Webcam</h1>
        <div className="center">
            <Model />
        </div>
        <Link to="/">Return to Blank page</Link>
        </div>
    );
};