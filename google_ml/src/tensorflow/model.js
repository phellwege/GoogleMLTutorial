import React, { useRef, useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import './model.css'; // Import CSS file

const ObjectDetection = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    tf.setBackend('webgl');
    const [model, setModel] = useState(null);
    const [objects, setObjects] = useState([]);

    const loadModel = async () => {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
    };

    const detectObjects = async () => {
        const video = webcamRef.current.video;
        const prediction = await model.detect(video);
        setObjects(prediction);
    };

    useEffect(() => {
        loadModel();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 640;
        canvas.height = 480;
        const context = canvas.getContext('2d');
        const video = webcamRef.current.video;
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        objects.forEach(obj => {
        const [x, y, width, height] = obj.bbox;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const scaleX = canvasWidth / videoWidth;
        const scaleY = canvasHeight / videoHeight;
        const offsetX = (canvasWidth - scaleX * videoWidth) / 2;
        const offsetY = (canvasHeight - scaleY * videoHeight) / 2;
        const drawX = (x * scaleX + offsetX);
        const drawY = (y * scaleY + offsetY);
        context.beginPath();
        context.rect(drawX, drawY, width * scaleX, height * scaleY);
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.stroke();
        context.font = "16px Arial";
        context.fillStyle = 'red';
        context.fillText(obj.class, drawX, drawY - 5);
        });
    }, [objects]);
    

    useEffect(() => {
        if (model && webcamRef.current) {
        setInterval(() => {
            detectObjects();
        }, 10);
        }
    }, [model, webcamRef]);

    return (
        <div className="container">
        <Webcam ref={webcamRef} className="webcam" />
        <canvas ref={canvasRef} className="canvas" width={640} height={480} />
        </div>
    );
};

export default ObjectDetection;
