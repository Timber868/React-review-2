export default function GameOver ({winner, onSelectButton}) {

    return <div id = 'game-over'>
        <h2>Game Over!</h2>
        <p>{winner ? `Player ${winner} wins!` : "It's a tie!"}</p>
        <p><button onClick={onSelectButton}>Rematch!</button></p>
    </div>
}