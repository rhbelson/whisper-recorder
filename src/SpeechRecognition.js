import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import { AwesomeButton } from "react-awesome-button";
// import AwesomeButtonProgress from 'react-awesome-button/src/components/AwesomeButtonProgress';
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import Say from 'react-say';


const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

let options=false;

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  function doSomethingThenCall() {
    return getAnswer();
  }

  function speak() {
    if (options==true) {
     return (<Say
          pitch={ 1.1 }
          rate={ 1.0 }
          speak="This is your answer"
          volume={ .8 }
        />);
    }
  }

  function getAnswer() {
    console.log("Calling endpoint");
    fetch("http://hinckley.cs.northwestern.edu/~rbi054/whisper/update_answer.php",
      {
  method: 'POST',
  headers: new Headers({
             'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
    }),
  body: `param1=${transcript}` // <-- Post parameters
})
    .then(function (response) {
                    return response.text()
                }).then(function (data){
                    console.log(data);
                    options=true;
                    speak();
                    options=false;
                }).catch(function (error) {
                    console.log('Request failed', error);
                });

  }

  return (
    <div>
      
      <p>Your Question: {transcript}</p> 
          <AwesomeButton
            size="large"
            type="primary"
            action={(element, next) => doSomethingThenCall()}>
            Ask Question!
          </AwesomeButton> 
              <AwesomeButton
            size="large"
            type="secondary">
            <span onClick={resetTranscript}>Clear Question</span>
          </AwesomeButton> 
          {speak()}
          
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);