import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';
import firebase from 'firebase';
import 'firebase/database';

export const initAddMatchResult = ( matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff  ) => {
    return {
        type: actionTypes.INIT_MATCH_RESULT_INPUT,
        matchID: matchID,
        teamAName: teamAName,
        teamBName: teamBName,
        teamAScore: teamAScore,
        teamBScore: teamBScore,
        matchKickoff: matchKickoff
    };
}

const config = {
    apiKey: "AIzaSyC3qNB23YlGeE9CNLvBGOBdOHoQGYUT7Gc",
    authDomain: "react-my-burger-tam.firebaseapp.com",
    databaseURL: "https://react-my-burger-tam.firebaseio.com/"
};
const fb = firebase.initializeApp(config)

export const addMatchPrediction = (matchPredictionData) => {
    let prediction = "";
    for(let key in matchPredictionData){
        if(key = "matchID"){
            prediction = matchPredictionData[key]
        }
        console.log("Match is " +prediction)
    }
    return dispatch => {
        dispatch( addMatchPredictionStart() );
        axios.post( 'https://react-my-burger-tam.firebaseio.com/matchResults.json', matchResultData)
            .then(matchResultData => {
                dispatch(deleteMatchFromUpcomingMatches(match));
            })
            .catch(error => {dispatch(addMatchResultFail(error))})
    };
}

export const deleteMatchFromUpcomingMatches = (match) => {
    const upcomingMatchesRef = fb.database().ref().child('upcomingmatches')
    const deleteRequest =  upcomingMatchesRef.child(match).remove()
    return dispatch => {
        deleteRequest.then(
            response => dispatch(addMatchResultSuccess(match))
        )
            .catch(
                err => dispatch(addMatchResultFail(err))
            )
    }
}

export const addMatchResultStart = () => {
    return {
        type: actionTypes.ADD_MATCH_RESULT_START
    };
};

export const addMatchResultFail = (err) => {
    console.log("The error is " + err);
    return {
        type: actionTypes.ADD_MATCH_RESULT_FAIL
    };
};

export const addMatchResultSuccess = (match) => {
    console.log("The match is (actions) " + match);
    return {
        type: actionTypes.ADD_MATCH_RESULT_SUCCESS,
        match: match
    };
};

