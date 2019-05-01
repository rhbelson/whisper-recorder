import React from 'react';
import logo from './location.svg';
import './App.css';
// import Speech from 'speech';
import SpeechRecognition from './SpeechRecognition';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WhisperSpace</h1>
        <img src={logo} className="App-logo" alt="logo" />  
          <SpeechRecognition/>
      </header>
      

    </div>
  );
}

export default App;
