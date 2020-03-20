import React from 'react';
import './App.css';

import Will from "./TTSWODWill.png";
import WillStill from "./TTSWODWill_still.png";
import AnimatedFigure from './components/AnimatedFigure';
import Bass from "./wodb.wav";

function App() {
  return (
    <div className="App">

      <header className="App-header">
      <AnimatedFigure
        animation={Will}
        stillFrame={WillStill}
        // width={"70%"}
        sample={Bass}
        loop={true}
        // playOnLoad={this.state.playing_bass}
      />
      
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>



            
    </div>
  );
}

export default App;
