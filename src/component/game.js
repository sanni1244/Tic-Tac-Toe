import React from 'react';

const Game = ({ index, className, children, onClick, winner }) => {
    if (winner === "Yes") {
        return (<div className={className}>{children}</div>)
    }
    else {
        return (<div onClick={() => { onClick(index) }} className={className}>{children}</div>)
    }
};
export default Game;
