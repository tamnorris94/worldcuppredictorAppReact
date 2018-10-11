import React from 'react';
import classes from './CompletedMatch.css';

const CompletedMatch = (props) => (
    <article className={classes.CompletedMatch} onClick={props.clicked}>
        <div>
            <p>{props.matchKickoff}  {props.teamAName} ({props.teamAScore}) vs {props.teamBName} ({props.teamBScore})</p>
        </div>
    </article>
);
export default CompletedMatch;