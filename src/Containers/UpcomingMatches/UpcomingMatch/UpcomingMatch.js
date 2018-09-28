import React from 'react';
import classes from './UpcomingMatch.css';

const UpcomingMatch = (props) => (
        <article className={classes.UpcomingMatch} onClick={props.clicked}>
            <div>
                <p>{props.matchKickoff}: {props.teamA} vs {props.teamB}</p>
                {/*<p>TeamAScore: {props.teamAScore} : teamBScore {props.teamBScore}</p>*/}
            </div>
        </article>
);
export default UpcomingMatch;