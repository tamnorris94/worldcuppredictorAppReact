import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';
import 'firebase/database';
import { upcomingMatchesFBRef } from '../../Config/firebase';
import { predictionsFBRef } from '../../Config/firebase';
import { matchPredictionsFBRef } from '../../Config/firebase';


export const initAddMatchResultOrPrediction = ( matchPred  ) => {
    console.log("MatchPred in initAddMatchResult " + JSON.stringify(matchPred));
    return {
        type: actionTypes.INIT_MATCH_RESULT_OR_PREDICTION_INPUT,
        matchID: matchPred.matchID,
        predictionID: matchPred.predictionID,
        teamAName: matchPred.teamAName,
        teamBName: matchPred.teamBName,
        teamAScore: matchPred.teamAScore,
        teamBScore: matchPred.teamBScore,
        matchKickoff: matchPred.matchKickoff,
        prediction: matchPred.prediction
    };
}

export const addMatchResultOrPrediction = (matchResultData, admin, token, prediction) => {
    console.log("State of prediction received by addMatchResult" +prediction);
    console.log("matchResultData looks like " +JSON.stringify(matchResultData));
    let match = "";
    for(let key in matchResultData){
        if(key = "matchID"){
            match = matchResultData[key]
        }
    }
    return dispatch => {
        dispatch( addMatchResultOrPredictionStart() );
        if(admin===true){
            axios.post( 'https://react-my-burger-tam.firebaseio.com/matchResults.json', matchResultData)
                .then(matchResultData => {
                    dispatch(deleteMatchFromUpcomingMatches(match));
                })
                .catch(error => {dispatch(addMatchResultOrPredictionFail(error))})
        }
        else{
            if(matchResultData.prediction===true){
                console.log("What is match id " + match.id);
                const matchID = matchResultData.predictionID;
                console.log("Match is id " + matchID);
                console.log("matchResultData looks like " + JSON.stringify(matchResultData));
                axios.put('https://react-my-burger-tam.firebaseio.com/matchPredictions/' + matchResultData.predictionID + '.json',{
                    teamAScore: matchResultData.teamAScore,
                    teamBScore: matchResultData.teamBScore
                })
                .then(response => {
                    dispatch(addMatchResultOrPredictionSuccess(match))
                })
                .catch(error => {
                    console.log(error);
                })
            }
            else{
                console.log("Do we get in here?");
                console.log("matchResultData looks like " + JSON.stringify(matchResultData));
                axios.post( 'https://react-my-burger-tam.firebaseio.com/matchPredictions.json?auth=' + token, matchResultData)
                    .then(matchResultData => {
                        dispatch(addMatchResultOrPredictionSuccess());
                    })
                    .catch(error => {dispatch(addMatchResultOrPredictionFail(error))})
            }
        }
    };
}

export const deleteMatchFromUpcomingMatches = (match) => {
    //const upcomingMatchesRef = fb.database().ref().child('upcomingmatches')
    const deleteRequest =  upcomingMatchesFBRef.child(match).remove()
    return dispatch => {
        deleteRequest.then(
            response => dispatch(addMatchResultOrPredictionSuccess(match))
        )
            .catch(
                err => dispatch(addMatchResultOrPredictionFail(err))
            )
    }
}

export const addMatchResultOrPredictionStart = () => {
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_START
    };
};

export const addMatchResultOrPredictionFail = (err) => {
    console.log("The error is " + err);
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_FAIL
    };
};

export const addMatchResultOrPredictionSuccess = (match) => {
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_SUCCESS,
        match: match
    };
};


export const updatePredictionSuccess = () => {
    return {
        type: actionTypes.UPDATE_PREDICTION_SUCCESS
    };
};

export const updatePredictionFail= () => {
    return {
        type: actionTypes.UPDATE_PREDICTION_FAIL
    };
};

export const initUpdatePrediction = ( matchPred  ) => {
    return {
        type: actionTypes.INIT_UPDATE_PREDICTION,
        matchID: matchPred.matchID,
        predictionID: matchPred.id,
        teamAName: matchPred.teamAName,
        teamBName: matchPred.teamBName,
        teamAScore: matchPred.teamAScore,
        teamBScore: matchPred.teamBScore,
        matchKickoff: matchPred.matchKickoff,
        prediction: matchPred.prediction
    };
}

export const updatePrediction = (matchResultData, token) => {
    return dispatch => {
        console.log("Got here. To updatePrediction");
    }
}

