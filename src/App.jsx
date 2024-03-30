import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GamerOver";
import { winningComb } from "./winningComb";

//Initial players
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
//Initial GameBoard initialization
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
  ];

//Makes a helper function to avoid unnecessary state usage
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}
function deriveWinner(board, players){
  //Starts off with no winners
  let winner = null;

  //Checks for winner using our win conditions from another file
  for (const combination of winningComb){
    const firstSquareSymbol = board[combination[0].row][combination[0].col];
    const secondSquareSymbol = board[combination[1].row][combination[1].col];
    const thirdSquareSymbol = board[combination[2].row][combination[2].col];

    if(firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol &&
       firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
    }
  };
  
  return winner;  
}

function deriveGameBoard(gameTurns){
  //Deep copy so that initialGameBoard is not impacted on gameBoard Change
  let gameBoard = [...INITIAL_GAME_BOARD.map(array =>[...array])];

  //gameBoard is updated based on previous game actions
  for (const turn of gameTurns) {
    const { square, player} = turn;
    const { row, col } = square; 

    gameBoard[row][col]= player;  // Adds the player symbol to their respective spot
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);//State needed to access player updated name and not just original symbol/name
  const [gameTurns, setGameTurns] = useState([]); //State needed to track game progress
  
  //Calls helper functions
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  
  //If board is full we don't have a winner but still need the game to be over
  const hasDraw = gameTurns.length === 9 && !winner;

  //Function to define what happens to our game when a square is clicked
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [
        { square : { row: rowIndex, col: colIndex }, player: activePlayer},
        ...prevTurns,
      ];
      
      return updatedTurns;
    });
  }

  //Rematch clears all turns played and hence restarts the game
  function handleRematch(){
    setGameTurns([]);
  }

  //Helper function to derive the updated name of players to be reused in our victory page instead of symbols
  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName 
      }; {/*We only change one player and the other one still remains the same*/}
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onSave={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onSave={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelectButton={handleRematch}/>} {/*Finishes the game if needed*/}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} /> {/* Usage of lifting the state to update game actions */}
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App