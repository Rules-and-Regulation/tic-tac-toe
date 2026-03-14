'use client'
import { useState } from "react";
import styles from "../styles/Home.module.css";

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);

  let winner = null;
  for (const [a, b, c] of WINNING_COMBO) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      break;
    }
  }

  const isDraw = !winner && board.every((cell) => cell !== "");
  const status = winner ? winner : isDraw ? "Draw" : null;


  const handleClick = (index:number) => {
    if (board[index] || status) return; 
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
  };

  return (
    <div className={styles.container}>
      <h1>Tic Tac Toe</h1>

      <div className={styles.status}>
        {status === "Draw"
          ? "It's a Draw!"
          : status
            ? `Player ${status} Wins!`
            : `Next: ${isXNext ? "X" : "O"}`}
      </div>

      <div className={styles.board}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={styles.cell}
            onClick={() => handleClick(idx)}
          >
            {cell}
          </button>
        ))}
      </div>

      {status && <button className={styles.playAgain} onClick={resetGame}>Play Again</button>}
    </div>
  );
}
