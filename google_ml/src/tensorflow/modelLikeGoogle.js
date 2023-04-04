import React, { useRef, useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const App = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    const detect = async () => {
      if (model && videoRef.current) {
        const predictions = await model.detect(videoRef.current);
        // console.log(predictions);
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "18px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        predictions.forEach((prediction) => {
          ctx.beginPath();
          ctx.fillText(
            `${prediction.class} - ${Math.round(prediction.score * 100)}%`,
            prediction.bbox[0],
            prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
          );
          ctx.rect(...prediction.bbox);
          ctx.stroke();
          ctx.closePath();
        });
      }
      requestAnimationFrame(detect);
    };
    detect();
  }, [model]);

  return (
    <div className="App">
      <video
        className="app__video"
        autoPlay
        playsInline
        muted
        ref={videoRef}
      />
      <canvas className="app__canvas" ref={canvasRef} />
    </div>
  );
};

export default App;