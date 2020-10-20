import React, { useState } from 'react';
import Square from '../square/Square';
import './Board.css';

const Board = ({squares, click}) => {

    function generatorBoard() {
        let board = []
        for (let i = 0; i < 9; i += 3) {
            board.push(<div key={i} className="board-row">{createRow(i)}</div>)
        }
        return board;
    }

    function createRow(i) {
        let row = []
        for (let j = i; j < i + 3; j++) {
            row.push(<Square key={j} value={squares[j]} click={() => click(j)} />);
        }
        return row;
    }
    return <>
        <div className="board"> {generatorBoard()} </div>
    </>
}

export default Board;
