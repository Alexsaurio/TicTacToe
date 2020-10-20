import React, { useState, useEffect } from 'react';
import Board from '../board/Board';
import './Game.css';

const Game = () => {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [stepNumber, setStepNumber] = useState(0);
    const [history, setHistory] = useState([{ squares: squares }]);
    const [isNext, setIsNext] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const current = history[stepNumber];
        console.log(consultWinner(current))
        const winner = consultWinner(current.squares)

        if (winner) {
            setStatus('Ganador: ' + winner);
        } else {
            setStatus('Jugador activo: ' + (isNext ? 'X' : 'O'));
        }
    })

    function handleClick(i) {

        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const newSq = [...current.squares];

        if (consultWinner(newSq) || newSq[i]) {
            return;
        }
        console.log("mi tiro ", i);
        newSq[i] = isNext ? 'X' : 'O';
        setHistory(newHistory.concat([{
            squares: newSq,
        }]));
        setSquares(newSq);
        setStepNumber(newHistory.length);
        setIsNext(!isNext);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setIsNext((step % 2) === 0);
        setHistory(history.slice(0, step + 1));
        setSquares(history[step].squares);
    }

    function consultWinner(squares) {

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                // console.log("ya gano alguien", squares[a])
                return squares[a];
            }
        }
        return null;
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            'Ir moviento #' + move :
            'Comienzo del juego';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    })

    return <>
        <h1 className="game-title">Juego Tic Tac Toe</h1>
        <div className="game-status"> {status} </div>
        <div className="game-board">
            <Board squares={squares} click={(e) => handleClick(e)} />
            <div className="game-moves">
                <ul>{moves}</ul>
            </div>
        </div>
    </>
}
export default Game;
