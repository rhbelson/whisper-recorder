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
let speech_answer="";

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

  function speak(text) {
    console.log("Speak() Called! speaking mode is now"+options);
    if (options==true && text!="") {
      console.log("Time to speak answer!");
     return (<Say
          pitch={ 1.1 }
          rate={ 1.0 }
          speak={speech_answer}
          volume={ .8 }
        />);
    options=false;
    }
    if (options==true && text=="") {
      return (<Say
          pitch={ 1.1 }
          rate={ 1.0 }
          speak="Sorry, I didn't catch that. Please ask again"
          volume={ .8 }
        />);
      options=false;
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
                    speech_answer=data;
                    options=true;
                }).catch(function (error) {
                    console.log('Request failed', error);
                    speech_answer="";
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