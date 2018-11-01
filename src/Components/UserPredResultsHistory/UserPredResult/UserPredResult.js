import React from 'react';

const userPredResult = (props) => {
    return (
        <article>
            <div>
                <p>{props.matchKickoff}: {props.teamAName} vs {props.teamBName}</p>
                <p>Actual Score: {props.teamAActualScore} vs {props.teamBActualScore}</p>
                <p>Predicted Score {props.teamAPredictedScore} vs {props.teamBPredictedScore}</p>
                <p>Points: {props.points} </p>
            </div>
        </article>
    );
}

export default userPredResult;