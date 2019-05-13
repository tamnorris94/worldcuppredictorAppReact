import React from 'react';
import classes from './UserPredResultHistory.css';
import UserPredResult from './UserPredResult/UserPredResult';

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

            //  return <article key={index} className={predictionResultStyle} clicked={props.cancelDisplayUserPredResultsHandler}>
            //     <div className={classes.UserPredResultHistory}>
            //         <table>
            //             <tbody>
            //             <tr>
            //                 <td>Match</td>
            //                 <td>{upr.teamAName}</td>
            //                 <td>{upr.teamBName}</td>
            //             </tr>
            //             <tr>
            //                 <td>Winner: {upr.actualWinningTeam}</td>
            //                 <td>Predicted Winner: {upr.predictedWinningTeam} </td>
            //             </tr>
            //             <tr>
            //                 <td>Margin: {upr.actualWinningMargin}</td>
            //                 <td>Predicted Margin: {upr.predictedWinningMargin} </td>
            //             </tr>
            //             <tr>
            //                 <td>Points: {upr.points}</td>
            //             </tr>
            //             </tbody>
            //         </table>
            //     </div>
            // </article>

            return <UserPredResult className={predictionResultStyle}
                    matchKickoff={upr.matchKickoff}
                    teamAName={upr.teamAName}
                    teamBName={upr.teamBName}
                    actualWinningMargin={upr.actualWinningMargin}
                    actualWinningTeam={upr.actualWinningTeam}
                    predictedWinningMargin={upr.predictedWinningMargin}
                    predictedWinningTeam={upr.predictedWinningTeam}
                    points={upr.points}>Pants</UserPredResult>

        }));
}

export default userPredResultsHistory;