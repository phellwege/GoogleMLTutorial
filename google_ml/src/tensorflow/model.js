import React, { useEffect, useState, useRef } from "react";
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

export default () => {

    const url = {
        model: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js',
        };
    
        async function loadModel(url) {
            try {
            // For layered model
            // const model = await tf.loadLayersModel(url.model);
            // For graph model
            // const model = await tf.loadGraphModel(url.model);
            setModel(model);
            console.log("Load model success")
            }
            catch (err) {
            console.log(err);
            }
            }
            //React Hook
            const [model, setModel] = useState();
            useEffect(()=>{
            tf.ready().then(()=>{
            loadModel(url)
            });
            },[])
    

    return (
        <>
            <div>
            </div>
        </>
    )
}