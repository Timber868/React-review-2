export default function GameBoard({ onSelectSquare, board}){

    return (
    <ol id="game-board">
        {board.map((row, rowIndex) => (
        <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => (
                    <li key={colIndex}>
                        <button onClick={!playerSymbol ? () => onSelectSquare(rowIndex, colIndex) : null}>{playerSymbol}</button>
                    </li>
                ))}
            </ol>
        </li>
    ))}
    </ol>)
}