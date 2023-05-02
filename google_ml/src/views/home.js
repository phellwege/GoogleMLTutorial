import React, {useState, useEffect, useRef, Suspense} from 'react';
import './main.css';
import { Link } from 'react-router-dom';

export default (props) => {

    return (
        <div className="PageWrap">
            <div className="mainPageDiv">
                <Link to='/Webcam'>Webcam</Link>
                <br/>
                <p>In order for this demo to work. You will need to allow access to your webcam, were the tensorflow model will then analyze the video in near real-time from the browser. This will use some local resources on your computer to identify objects.</p>
            </div>
        </div>
    )
}