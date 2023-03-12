import React, {useState, useEffect, useRef} from 'react';
import './main.css';
import { Button, Card, Form, Alert} from 'react-bootstrap';
import AIModel from '../tensorflow/model'

export default (props) => {

    return (
        <div className="PageWrap">
            <AIModel />
        </div>
    )
}