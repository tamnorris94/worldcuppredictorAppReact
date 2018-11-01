import React from 'react';
import classes from './UserPredResultHistory.css';

const userPredResultsHistory = (props) => {
    console.log("userPredResults on userPredResultsHistoryPage "+ JSON.stringify(props.userPredResults));

    return (
        props.userPredResults.map((upr,index) => {
            let predictionResultStyle = null;

            // switch(toString(upr.points)){
            //     case ('0'): predictionResultStyle = classes.IncorrectWinner;
            //     case ('2'): predictionResultStyle = classes.CorrectWinnerOrDraw;
            //     case ('5'): predictionResultStyle = classes.ExactScoreMatch;
            //     default : predictionResultStyle = classes.CorrectWinnerOrDraw;
            // }
            if(upr.points == 2){
                predictionResultStyle = classes.CorrectWinnerOrDraw;
            }
            else if(upr.points == 5){
                predictionResultStyle = classes.ExactScoreMatch;
            }
            else {
                predictionResultStyle = classes.IncorrectWinner;
            }
            return <article key={index} className={predictionResultStyle} clicked={props.cancelDisplayUserPredResultsHandler}>
                <div>
                    <p> {upr.teamAName} vs {upr.teamBName}</p>
                    <p>Actual Score: {upr.actualTeamAScore} - {upr.actualTeamBScore}      Your predicted Score {upr.predictedTeamAScore} - {upr.predictedTeamBScore}</p>
                    <p>Points: {upr.points} </p>
                </div>
            </article>
        }));
}

export default userPredResultsHistory;