import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';
import firebase from 'firebase';
import 'firebase/database';

export const initAddMatchPrediction = ( matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId  ) => {
    return {
        type: actionTypes.INIT_MATCH_PREDICTION_INPUT,
        matchID: matchID,
        teamAName: teamAName,
        teamBName: teamBName,
        teamAScore: teamAScore,
        teamBScore: teamBScore,
        matchKickoff: matchKickoff,
        userId: userId
    };
}

// const config1 = {
//     apiKey: "AIzaSyC3qNB23YlGeE9CNLvBGOBdOHoQGYUT7Gc",
//     authDomain: "react-my-burger-tam.firebaseapp.com",
//     databaseURL: "https://react-my-burger-tam.firebaseio.com/"
// };
// const fb1 = firebase.initializeApp(config1)

export const addMatchPrediction = (matchPredictionData) => {
    let prediction = "";
    for(let key in matchPredictionData){
        if(key = "matchID"){
            prediction = matchPredictionData[key]
        }
        console.log("Match is " +prediction)
    }
    return dispatch => {
        dispatch( addMatchPredictionStart() )
            .then(matchPredictionData => {
                axios.post( 'https://react-my-burger-tam.firebaseio.com/matchPredictions.json', matchPredictionData)
            })
            .catch(error => {dispatch(addMatchPredictionFail(error))})
    };
}


export const addMatchPredictionStart = () => {
    return {
        type: actionTypes.ADD_MATCH_PREDICTION_START
    };
};

export const addMatchPredictionFail = (err) => {
    console.log("The error is " + err);
    return {
        type: actionTypes.ADD_MATCH_PREDICTION_FAIL
    };
};

export const addMatchPredictionSuccess = (match) => {
    console.log("The match is (actions) " + match);
    return {
        type: actionTypes.ADD_MATCH_PREDICTION_SUCCESS,
        match: match
    };
};

