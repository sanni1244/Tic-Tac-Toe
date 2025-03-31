import React, { useState } from 'react';
import Game from './game';

const Board = () => {
    const player_one = "X";
    const player_two = "O";

    const [initialValue, setValue] = useState(Array(9).fill(null));
    const [x, setX] = useState(true);
    const [name, setNames] = useState({
        Xname: "X",
        Oname: "O",
    });
    const [player, changePlayer] = useState({
        player1: true,
        playerTurn: name.Xname,
        winner: "No",
    });
    const XThename = () => {
        let secname = document.getElementById("Xname").value;
        if (secname !== null && secname !== "") {
            setNames({
                Oname: name.Oname,
                Xname: secname,
            });
            setX({
                x: false,
            });
        }
        gameReset();
    };
    const OThename = () => {
        let onename = document.getElementById("Oname").value;
        if (onename !== null && onename !== "") {
            setNames({
                Xname: name.Xname,
                Oname: onename,
            });
        }
        gameReset();
    };

    const [score, setScore] = useState({
        playX: 0,
        playO: 0,
    });

    const gameReset = () => {
        setValue(Array(9).fill(null));
        changePlayer({
            player1: true,
            playerTurn: name.Xname,
            winner: "No",
        });
        setX({
            x: true,
        });
    };
    const gamePlay = (index) => {
        if (initialValue[index] === null) {
            const newValue = [...initialValue];
            newValue[index] = player.player1 ? player_one : player_two;
            setValue(newValue);

            changePlayer((prevPlayer) => ({
                ...prevPlayer,
                playerTurn: player.player1 ? name.Oname : name.Xname,
                player1: !prevPlayer.player1,
            }));

            const checkWinner = (values) => {
                return (
                    (values[0] !== null &&
                        values[0] === values[1] &&
                        values[0] === values[2]) ||
                    (values[0] !== null &&
                        values[0] === values[3] &&
                        values[0] === values[6]) ||
                    (values[0] !== null &&
                        values[0] === values[4] &&
                        values[0] === values[8]) ||
                    (values[1] !== null &&
                        values[1] === values[4] &&
                        values[1] === values[7]) ||
                    (values[2] !== null &&
                        values[2] === values[5] &&
                        values[2] === values[8]) ||
                    (values[2] !== null &&
                        values[2] === values[4] &&
                        values[2] === values[6]) ||
                    (values[3] !== null &&
                        values[3] === values[4] &&
                        values[3] === values[5]) ||
                    (values[6] !== null &&
                        values[6] === values[7] &&
                        values[6] === values[8])
                );
            };

            if (checkWinner(newValue)) {
                changePlayer({
                    ...player,
                    winner: "Yes",
                });
                if (player.playerTurn === name.Xname) {
                    setScore({
                        ...score,
                        playX: score.playX + 1,
                    });
                } else {
                    setScore({
                        ...score,
                        playO: score.playO + 1,
                    });
                }
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 p-6">
        {/* Title */}
        <span className="text-5xl font-extrabold text-white mb-6 animate-fadeIn font-mono">
          🎮 Tic Tac Toe
        </span>

  
        <div className="flex flex-col md:flex-row gap-8">
          {/* Game Board Section */}
          <div className="bg-white p-12 rounded-lg shadow-2xl text-center w-full md:w-auto animate-pop">
            <div className="text-lg font-semibold mb-4 text-gray-700">
              Player Turn: <span className="text-blue-600 font-bold">{x === false ? name.Xname : player.playerTurn}</span>
            </div>
  
            {/* Game Grid */}
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => gamePlay(index)}
                  className="w-20 h-20 text-3xl font-bold flex items-center justify-center 
                  rounded-lg shadow-md hover:scale-105 transition-transform duration-200 ease-out 
                  hover:bg-blue-300"
                >
                  {initialValue[index]}
                </button>
              ))}
            </div>
  
            {/* Winner Announcement */}
            {player.winner === "Yes" && (
              <div id="winnerAnnouncement" className="mt-4 text-green-600 text-2xl font-bold animate-pop">
                🎉 {player.playerTurn} Wins! 🎉
              </div>
            )}
  
            {/* Reset Button */}
            <button
              onClick={gameReset}
              className="mt-4 px-8 py-3 bg-red-500 text-white text-lg font-semibold rounded-md 
              shadow-md hover:scale-105 hover:bg-red-600 transition-all duration-300"
            >
             Reset Game
            </button>
          </div>
  
          {/* Player Info & Scoreboard */}
          <div className="bg-white p-6 rounded-lg shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🏆 Scoreboard</h2>
            <table className="w-full text-center border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="py-3 px-6">{name.Xname}</th>
                  <th className="py-3 px-6">{name.Oname}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-lg">
                  <td className="py-3 px-6 border border-gray-300">{score.playX}</td>
                  <td className="py-3 px-6 border border-gray-300">{score.playO}</td>
                </tr>
              </tbody>
            </table>
  
            {/* Player Name Inputs */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">👤 Name for X:</span>
                <input
                  id="Xname"
                  type="text"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  onClick={XThename}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  Set
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">👤 Name for O:</span>
                <input
                  id="Oname"
                  type="text"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  onClick={OThename}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Board;
