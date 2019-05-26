import React from 'react';
import classes from '../UserPredResultHistory.css';

const userPredResult = (props) => {

    const moment = require('moment');
    const lDate = moment(props.matchKickoff).format("ddd, MMMM Do, h:mm a");

    let predictionResultStyle = null;

    if(props.points === 2){
        predictionResultStyle = classes.CorrectWinnerOrDraw;
    }
    else if(props.points === 5){
        predictionResultStyle = classes.ExactScoreMatch;
    }
    else {
        predictionResultStyle = classes.IncorrectWinner;
    }

    console.log("In userPredResult : predictionResultStyle " +predictionResultStyle);

    return (
        <article key={props.index} className={predictionResultStyle} >
            <div className={classes.UserPredResultHistory}>
                <table>
                    <tbody>
                    <tr>
                        <td>{lDate}</td>
                    </tr>
                    <tr>
                        <td>Match: {props.teamAName} vs {props.teamBName}</td>
                    </tr>
                    <tr>
                        <td>Your Prediction: {props.predictedWinningTeam} {props.predictedWinningMargin}</td>
                    </tr>
                    <tr>
                        <td>Actual Result: {props.actualWinningTeam} {props.actualWinningMargin}</td>
                    </tr>
                    <tr>
                        <td>Points: {props.points}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </article>
    );


    // return (
    //     <article>
    //         <div>
    //             <p>{props.matchKickoff}: {props.teamAName} vs {props.teamBName}</p>
    //             <p>Actual Score: {props.teamAActualScore} vs {props.teamBActualScore}</p>
    //             <p>Predicted Score {props.teamAPredictedScore} vs {props.teamBPredictedScore}</p>
    //             <p>Points: {props.points} </p>
    //         </div>
    //     </article>
    // );
}

export default userPredResult;