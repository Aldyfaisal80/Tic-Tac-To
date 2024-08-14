import Square from '../elements/Square';
import calculateWinner from '../../features/function/CalculateWinner';

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Pemenang: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = 'Draw!';
  } else {
    status = `Pemain selanjutnya: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className="status text-xl font-bold mb-4">{status}</div>
      {[0, 3, 6].map((rowStart) => (
        <div className="board-row flex" key={rowStart}>
          {[0, 1, 2].map((col) => (
            <Square
              key={rowStart + col}
              value={squares[rowStart + col]}
              onSquareClick={() => handleClick(rowStart + col)}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default Board;