import React from 'react';
import classes from './UserAggPredictionResult.css';


const userPredictionAggResults = (props) => {

    return (<article className={classes.UserAggPredictionResult} onClick={props.displayPredictionResultsForUser}>
            <div>
                <p>User: {props.userName}</p>
                <p>Points {props.points}</p>
                {/*<p>TeamAScore: {props.teamAScore} : teamBScore {props.teamBScore}</p>*/}
            </div>
        </article>
    )
}

export default userPredictionAggResults;