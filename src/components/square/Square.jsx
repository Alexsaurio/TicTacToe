import React from 'react';
import './Square.css';

const Square = ({value, click}) => {
    return <button className={value === 'X' ? "square x" : "square o"} onClick={() => click() }>
        {value}
    </button>
}

export default Square;
