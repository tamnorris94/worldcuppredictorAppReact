import React from 'react';
import classes from './UpcomingRugbyMatch.css';

const UpcomingRugbyMatch = (props) => {

    const moment = require('moment');
    const local = moment.locale();
    const timezone = require('moment-timezone');
    moment.parseZone('2016-05-03T22:15:01+02:00').local().format();
    //const DeviceInfo = require('react-native-device-info');
    //const localDateTime = DeviceInfo.getDeviceLocale()
    //const lDate = new Date(props.matchKickoff,"ddd, MMMM Do YYYY, h:mm a");
    //const newLDate = new Date(props.matchKickoff);
    //console.log("newLDate is " +newLDate);

    const lDate = moment.utc(props.matchKickoff).local().format("ddd, MMMM Do YYYY, h:mm a");
    //const lDate = moment(props.matchKickoff).local(local).format("ddd, MMMM Do YYYY, h:mm a");
    //const lDate = moment.parseZone(props.matchKickoff).local(local).format("ddd, MMMM Do YYYY, h:mm a");

    if(props.prediction){
        return (
            <article className={classes.UpcomingRugbyMatch} onClick={props.addMatchPrediction}>
                <div>
                    <p>{props.teamBName} @{props.teamAName}</p>
                    <p>{lDate}</p>
                    <p>Predicted Team : {props.predictedWinningTeam}</p>
                    <p>Predicted Margin : {props.predictedWinningMargin}</p>
                </div>
            </article>
        );
    }
    else{
        return (<article className={classes.UpcomingRugbyMatch} onClick={props.addMatchPrediction}>
            <div>
                <p>{props.teamBName} @ {props.teamAName}</p>
                <p>{lDate}</p>
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