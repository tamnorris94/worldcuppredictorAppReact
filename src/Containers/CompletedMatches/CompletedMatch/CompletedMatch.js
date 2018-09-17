import React from 'react';
import classes from './CompletedMatch.css';

const CompletedMatch = (props) => (
    <article className={classes.CompletedMatch} onClick={props.clicked}>
        <div>
            <p>{props.matchKickoff}  {props.teamA} ({props.teamAResult}) vs {props.teamB} ({props.teamBResult})</p>
        </div>
    </article>
);
export default CompletedMatch;