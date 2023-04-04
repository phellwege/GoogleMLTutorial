import React, { useState, useEffect, useRef, useCallback } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import Webcam from "react-webcam";

const App = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = await cocoSsd.load();
      setModel(model);
    };

    loadModel();
  }, []);

  const detect = useCallback(async () => {
    if (model && webcamRef.current) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const img = new Image(videoWidth, videoHeight);
      img.src = webcamRef.current.getScreenshot();
      const tensor = cocoSsd.browser.fromPixels(img).reshape([1, videoHeight, videoWidth, 3]);
      const predictions = await model.detect(tensor);
      setPredictions(predictions);
    }
  }, [model]);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  useEffect(() => {
    const drawBoxes = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    drawBoxes();
  }, [predictions]);

  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user"
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <canvas ref={canvasRef} width="640" height="360"></canvas>
    </>
  );
};

export default App;
