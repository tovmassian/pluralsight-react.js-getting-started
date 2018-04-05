import React from 'react';

const DoneFrame = props => {
    return (
        <div className="col-12">
            <h1>{props.doneStatus}</h1>
            <button className="btn btn-default m-auto" onClick={() => props.playAgain()}>Play Again</button>
        </div>
    );
};

export default DoneFrame;