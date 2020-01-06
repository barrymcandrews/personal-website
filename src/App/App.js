import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from './components/Button'
import Terminal from "./components/Terminal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>Barry</h1>
          <h1>McAndrews</h1>
          <h3>Software Engineer</h3>
        </div>
      </header>
      <div>
        <Button>Value</Button>
      </div>
        <div>
            {/*<Terminal></Terminal>*/}
        </div>
    </div>
  );
}

export default App;
