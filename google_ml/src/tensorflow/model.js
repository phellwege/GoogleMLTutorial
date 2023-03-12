import React, { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import '../views/main.css';

export default (props) => {
    const [model, setModel] = useState(null);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        async function loadModel() {
            const loadedModel = await cocoSsd.load();
            setModel(loadedModel);
        }

        loadModel();
    }, []);

    const webcamRef = useRef(null);

    const capture = async () => {
        if (model && webcamRef.current && webcamRef.current.video.readyState === 4) {
            const image = webcamRef.current.getScreenshot();
            const img = new Image();
            img.src = image;
            await img.decode();
            const tensor = tf.browser.fromPixels(img).expandDims().reshape([-1, 480, 640, 3]);
            console.log(tensor);
            const predictions = await model.detect(tensor);
            setPredictions(predictions);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            capture();
        }, 100);

        return () => clearInterval(interval);
    }, [capture]);

    return (
        <div>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
            <div>
                {predictions.map((prediction, index) => (
                    <div key={index}>
                        {prediction.class} - {prediction.score.toFixed(2)}
                    </div>
                ))}
            </div>
        </div>
    );
}
