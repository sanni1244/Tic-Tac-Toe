// Game.js
import React from 'react';
import Board from './Board';

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* Game status or history can be displayed here */}</div>
      <ol>{/* List of moves or game history can be displayed here */}</ol>
    </div>
  </div>
);

export default Game;
