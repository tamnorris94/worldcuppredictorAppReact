import React from 'react';
import classes from './UpcomingRugbyMatch.css';

const UpcomingRugbyMatch = (props) => {
    if(props.prediction){
        return (
            <article className={classes.UpcomingRugbyMatch} onClick={props.addMatchPrediction}>
                <div>
                    <p>{props.matchKickoff}: {props.teamAName} vs {props.teamBName}</p>
                    <p>Predicted Score {props.teamAScore} vs {props.teamBScore}</p>
                </div>
            </article>
        );
    }
    else{
        return (<article className={classes.UpcomingRugbyMatch} onClick={props.addMatchPrediction}>
            <div>
                <p>{props.matchKickoff}: {props.teamAName} vs {props.teamBName}</p>
            </div>
        </article>);
    }
}

// const UpcomingMatch = (props) => (
//     <article className={classes.UpcomingMatch} onClick={props.clicked}>
//         <div>
//             <p>{props.matchKickoff}: {props.teamAName} vs {props.teamBName}</p>
//             <p>Predicted Score {props.teamAScore} vs {props.teamBScore}</p>
//             {/*<p>TeamAScore: {props.teamAScore} : teamBScore {props.teamBScore}</p>*/}
//         </div>
//     </article>
// )
export default UpcomingRugbyMatch;