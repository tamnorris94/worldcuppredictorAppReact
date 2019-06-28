import React from 'react';
import classes from './UpcomingRugbyMatch.css';

const UpcomingRugbyMatch = (props) => {

    const moment = require('moment');
    const timezone = require('moment-timezone');
    moment.parseZone('2016-05-03T22:15:01+02:00').local().format();

    const lDate = moment.utc(props.matchKickoff).local().format("ddd, MMMM Do YYYY, h:mm a");

    if(props.prediction){
        return (
            <article className={classes.UpcomingMatchCurrentPrediction} onClick={props.addMatchPrediction}>
                <div>
                    <p>{props.teamBName} @{props.teamAName}</p>
                    <p>{lDate}</p>
                    <p>Current Prediction: {props.predictedWinningTeam} {props.predictedWinningMargin}</p>
                </div>
            </article>
        );
    }
    else{
        return (<article className={classes.UpcomingMatchNoCurrentPrediction} onClick={props.addMatchPrediction}>
            <div>
                <p>{props.teamBName} @ {props.teamAName}</p>
                <p>{lDate}</p>
                <p>You have not entered a prediction for this match yet.</p>
            </div>
        </article>);
    }
}

export default UpcomingRugbyMatch;