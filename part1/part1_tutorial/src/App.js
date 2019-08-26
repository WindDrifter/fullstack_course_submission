import React from 'react';
import logo from './logo.svg';
import './App.css';
const Hello = (props) => {
  return (<div>
          <p>Hello there, {props.name}</p>
          </div>  )
        };



function App() {
  return (
    <div className="App">
      <h1>Greeting</h1>
      <Hello name="Obi wan"/>
      <Hello name="John"/>

    </div>
  );
}

export default App;
