type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="border border-black w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-300"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
