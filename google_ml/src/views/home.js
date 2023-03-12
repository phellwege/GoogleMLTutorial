import React, {useState, useEffect, useRef, Suspense} from 'react';
import './main.css';
// import { Button, Card, Form, Alert} from 'react-bootstrap';
import Model from '../tensorflow/model'

export default (props) => {

    return (
        <div className="PageWrap">
            <Suspense fallback={<div>Loading...</div>}>
                <Model/>
            </Suspense>
            does this work?
        </div>
    )
}