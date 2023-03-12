import React, { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

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
    if (model && webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      const tensor = tf.browser.fromPixels(image).expandDims();
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

