import React, { Component } from 'react';
import './App.css';
import MainBoard from './mainboard.js';

class App extends Component {
  render() {
    return (
      <div className="game">
        <div className="title">The Ultimate Tic-Tac-Toe!</div>
        <div className="rules">
          <a
          href="https://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/"
          target="_blank">
          Read the rules
          </a>
        </div>
        <div className="game-board">
          <MainBoard />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default App;
