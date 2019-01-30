import React from 'react';

const userPredResult = (props) => {

    return (
        <article>
            <div>
                <table>
                    <tr>
                        <th>{props.matchKickoff}</th>
                        <th>{props.teamAName}</th>
                        <th>{props.teamBName}</th>
                    </tr>
                    <tr>
                        <th>Actual Score: </th>
                        <th>{props.teamAActualScore}</th>
                        <th>{props.teamBActualScore}</th>
                    </tr>
                    <tr>
                        <th>Your Predicted Score: </th>
                        <th>{props.teamAPredictedScore}</th>
                        <th>{props.teamBPredictedScore}</th>
                    </tr>
                    <tr>
                        <th>Points: </th>
                        <th>{props.points}</th>
                    </tr>
                </table>
            </div>
        </article>
    );


    // return (
    //     <article>
    //         <div>
    //             <p>{props.matchKickoff}: {props.teamAName} vs {props.teamBName}</p>
    //             <p>Actual Score: {props.teamAActualScore} vs {props.teamBActualScore}</p>
    //             <p>Predicted Score {props.teamAPredictedScore} vs {props.teamBPredictedScore}</p>
    //             <p>Points: {props.points} </p>
    //         </div>
    //     </article>
    // );
}

export default userPredResult;