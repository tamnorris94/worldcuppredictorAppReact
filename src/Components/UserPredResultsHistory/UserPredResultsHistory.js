import React from 'react';
import classes from './UserPredResultHistory.css';

const userPredResultsHistory = (props) => {

    return (
        props.userPredResults.map((upr,index) => {
            let predictionResultStyle = null;

            // switch(toString(upr.points)){
            //     case ('0'): predictionResultStyle = classes.IncorrectWinner;
            //     case ('2'): predictionResultStyle = classes.CorrectWinnerOrDraw;
            //     case ('5'): predictionResultStyle = classes.ExactScoreMatch;
            //     default : predictionResultStyle = classes.CorrectWinnerOrDraw;
            // }
            if(upr.points === 2){
                predictionResultStyle = classes.CorrectWinnerOrDraw;
            }
            else if(upr.points === 5){
                predictionResultStyle = classes.ExactScoreMatch;
            }
            else {
                predictionResultStyle = classes.IncorrectWinner;
            }

            return <article key={index} className={predictionResultStyle} clicked={props.cancelDisplayUserPredResultsHandler}>
                <div className={classes.UserPredResultHistory}>
                    <table>
                        <tr>
                            <th>Match</th>
                            <th>{upr.teamAName}</th>
                            <th>{upr.teamBName}</th>
                        </tr>
                        <tr>
                            <th>Actual Score: </th>
                            <th>{upr.actualTeamAScore}</th>
                            <th>{upr.actualTeamBScore}</th>
                        </tr>
                        <tr>
                            <th>Your Predicted Score: </th>
                            <th>{upr.predictedTeamAScore}</th>
                            <th>{upr.predictedTeamBScore}</th>
                        </tr>
                        <tr>
                            <th>Points: {upr.points}</th>
                        </tr>
                    </table>
                </div>
            </article>
        }));
}

export default userPredResultsHistory;