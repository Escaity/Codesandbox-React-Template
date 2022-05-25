import { Square } from "./square";
import { calculateWinner } from "./calculateWinner";
import { useState } from "react";

export const Board = () => {
  const [xIsNext, setTurn] = useState(true);
  const [place, setPlace] = useState(0);
  const [squares, setSquare] = useState(Array(9).fill(null));
  const RenderSquare = ({ i }) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };
  const handleClick = (i) => {
    setPlace(() => i);
    const updatedSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    updatedSquares[i] = xIsNext ? "X" : "O";
    setSquare(() => updatedSquares);
    setTurn((turn) => !turn);
  };

  const winner = calculateWinner(squares); //勝者が決まった時に勝者を返す。
  let statusMessage;
  if (winner) {
    statusMessage = "Winner: " + winner;
  } else if (squares.filter((block) => block === null).length === 0) {
    statusMessage = "Draw.";
  } else {
    statusMessage = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  let placedMassage;
  if (squares.filter((block) => block === null).length !== 9) {
    placedMassage = `${!xIsNext ? "X" : "O"} Placed [${place % 3},${Math.floor(
      place / 3
    )}]`;
  }
  return (
    <>
      <div className="status">{statusMessage}</div>
      <div className="board">
        <div className="board-row">
          <RenderSquare i={0} />
          <RenderSquare i={1} />
          <RenderSquare i={2} />
        </div>
        <div className="board-row">
          <RenderSquare i={3} />
          <RenderSquare i={4} />
          <RenderSquare i={5} />
        </div>
        <div className="board-row">
          <RenderSquare i={6} />
          <RenderSquare i={7} />
          <RenderSquare i={8} />
        </div>
      </div>
      <div className="status">{placedMassage}</div>
    </>
  );
};
