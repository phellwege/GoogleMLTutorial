import React, { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

export default () => {
    const [model, setModel] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const canvasRef = useRef(null);
    const webcamRef = useRef(null);

    const children = [];

    // function predictWebcam(){
    //     model.detect(video).then(function(predictions)) {
    //         for(let i=0; i<children.length; i++){
    //             liveView.removeChild(children[i]);
    //         }
    //         children.splice(0)
    //     }
    // }


    useEffect(() => {
        async function loadModel() {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        }

        loadModel();
    }, []);

    const detect = async () => {
        if (
        model &&
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
        ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        const img = new Image();
        img.src = canvas.toDataURL("image/jpeg");
        await img.decode();
        const tensor = tf.browser.fromPixels(img).reshape([videoHeight, videoWidth, 3]);
        const predictions = await model.detect(tensor, { score: 0.5 });
        setPredictions(predictions);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
        detect();
        }, 100);

        return () => clearInterval(interval);
    }, [detect]);

    useEffect(() => {
        if (predictions.length > 0) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 3;
        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        predictions.forEach((prediction) => {
            if (prediction.score >= 0.5) {
            const [x, y, width, height] = prediction.bbox;
            const text = `${prediction.class} - ${prediction.score.toFixed(2)}`;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.stroke();
            ctx.fillText(text, x, y);
            }
        });
        }
    }, [predictions]);

    return (
<div style={{ position: 'relative' }}>
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                border: '2px solid red',
                display: 'block'
            }}
        />
    </div>
    );
};
