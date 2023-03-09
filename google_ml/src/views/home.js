import React, {useState, useEffect, useRef} from 'react';
import './main.css';
import { Button, Card, Form, Alert} from 'react-bootstrap';
import Webcam from "react-webcam";

export default (props) => {

    const video = document.getElementById('webcam');
    const liveView = document.getElementById('liveView');
    const demosSection = document.getElementById('demos');
    const enableWebcamButton = document.getElementById('webcamButton');


    // Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  // If webcam supported, add event listener to button for when user
  // wants to activate it to call enableCam function which we will 
  // define in the next step.
  if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }
  
  // Placeholder function for next step. Paste over this in the next step.
  function enableCam(event) {
  }





// Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
      return;
    }
    
    // Hide the button once clicked.
    event.target.classList.add('removed');  
    
    // getUsermedia parameters to force video but not audio.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      video.srcObject = stream;
      video.addEventListener('loadeddata', predictWebcam);
    });
  }




  
// Placeholder function for next step.
function predictWebcam() {
}

// Pretend model has loaded so we can try out the webcam code.
var model = true;
demosSection.classList.remove('invisible');


    return (
        <div className="PageWrap">
            <div className="Body">
            <h1>Multiple object detection using pre trained model in TensorFlow.js</h1>
            <p>Wait for the model to load before clicking the button to enable the webcam - at which point it will become visible to use.</p>
                <section id="demos" class="invisible">
                    <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "enable webcam" below and accept access to the webcam when the browser asks (check the top left of your window)</p>
                    <div id="liveView" class="camView">
                        <button id="webcamButton">Enable Webcam</button>
                        <video id="webcam" autoplay muted width="640" height="480"></video>
                    </div>
                </section>
            </div>
        </div>
    )
}