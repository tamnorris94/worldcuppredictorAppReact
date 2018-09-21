import React from 'react';
import classes from './UserPrediction.css';

const UserPrediction = (props) => (
    <article className={classes.UserPrediction} onClick={props.clicked}>
        <div>
            <p>{props.matchKickoff}  {props.teamA} ({props.teamAResult}) vs {props.teamB} ({props.teamBResult})</p>
        </div>
    </article>
);
export default UserPrediction;