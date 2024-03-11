import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import {WINNING_COMBINATIONS}  from "./winning-combinations.js"
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]    
];
function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function App() {
  const [playerName, setPlayerName] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  const [hasWinner, setWinner] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameboard  = [...initialGameBoard.map(arrayItems => [...arrayItems])];
  for (const turn of gameTurns){
      const {square, player} = turn;
      const { row, col} = square;
      gameboard[row][col] = player;
  }
  let winner = null;
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =  gameboard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol)  {
      winner = playerName[firstSquareSymbol];
    }
    
  }  
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSquare(rowIndex, colIndex){
    //setActivePlayer((activePlayer)=> activePlayer === 'X' ? '0': 'X');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTruns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updateTruns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }
  function handlePlayerNameChanges(symbol, newName){
    console.log(symbol, newName);
    setPlayerName(prevPlayer => {
      return {...prevPlayer, 
        [symbol]:newName}
    })
  }
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="player1" symbol="X" isActive={activePlayer === 'X'} updatePlayer={handlePlayerNameChanges}></Player>
        <Player initialName="player2" symbol="O" isActive={activePlayer === 'O'} updatePlayer={handlePlayerNameChanges}></Player>
      </ol>
      {(winner || hasDraw) &&  <GameOver rematchClicked= {handleRematch} winner={winner}></GameOver>}
    <GameBoard onSelectSquare={handleSquare}
            board={gameboard}/>
           
    <Log turns={gameTurns}/>
    </div>
    </main>
}

export default App
