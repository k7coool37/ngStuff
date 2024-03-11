export default function GameOver({rematchClicked, winner}) {
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <h4>Winner - {winner}</h4> }
        {!winner && <h4> It is Drawn</h4>}
        <p><button onClick={rematchClicked}>Re-match!</button></p>
    </div>
}