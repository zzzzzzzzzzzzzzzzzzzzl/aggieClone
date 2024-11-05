import logo from './logo.svg';
import './App.css';
import Canvas from './Components/canvas/Canvas';
import UI from './Components/UI/UI';
import ColourSelector from './Components/colourSelectorUI/colourSelector';
import { useState } from 'react';
import CanvasObject from './Components/canvas/CanvasObject';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id='colourSelectorCursor'></div>

        <div id="custom-cursor"></div>


        <UI />
        <div id="canvasContainer">

          <Canvas id="canvas1" nm={true} />
          <Canvas id="canvas2" nm={true} />
        </div>


        <ColourSelector />
      </header>
    </div>
  );
}





export default App;
