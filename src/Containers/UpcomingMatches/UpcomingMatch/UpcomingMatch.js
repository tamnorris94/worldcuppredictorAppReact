import React from 'react';
import classes from './UpcomingMatch.css';

const UpcomingMatch = (props) => {
    if(props.prediction){
        return (
            <article className={classes.UpcomingMatch} onClick={props.addMatchPrediction}>
                <div>
                    <p>{props.matchKickoff}: {props.teamAName} @ {props.teamBName}</p>
                    <p>Predicted Margin {props.teamAScore} vs {props.teamBScore}</p>
                </div>
            </article>
        );
    }
    else{
         return (<article className={classes.UpcomingMatch} onClick={props.addMatchPrediction}>
            <div>
                <p>{props.matchKickoff}: {props.teamAName} @ {props.teamBName}</p>
            </div>
        </article>);
    }
}

export default UpcomingMatch;