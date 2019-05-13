import * as actionTypes from './actionTypes';
import { matchResultsFBRef } from '../../Config/firebase';
import { matchPredictionResultsFBRef } from '../../Config/firebase';
import { matchPredictionsFBRef } from '../../Config/firebase';
import { updateObject } from '../../shared/utility';


// export const setWinningTeam = ( winningTeam ) => {
//     return {
//         type: actionTypes.SET_WINNING_TEAM,
//         winningTeam: winningTeam
//     };
// };

export const setWinningMargin = ( winningMargin ) => {
    return {
        type: actionTypes.SET_WINNING_MARGIN,
        winningMargin: winningMargin
    };
};

export const addResultOrPredictionStart = () => {
    return {
        type: actionTypes.ADD_RESULT_OR_PREDICTION_START
    };
};

export const addResultOrPredictionSuccess = () => {
    return {
        type: actionTypes.ADD_RESULT_OR_PREDICTION_SUCCESS
    };
};

export const addResultOrPredictionFail = () => {
    return {
        type: actionTypes.ADD_RESULT_OR_PREDICTION_FAIL
    };
};

export const submitMatchResultOrPrediction = (resultPredictionData, admin, prediction) => {
    console.log("submitMatchResultOrPrediction state of admin is " +admin);
    console.log("submitMatchResultOrPrediction : jsonPayload looks like " + JSON.stringify(resultPredictionData));
    return dispatch => {
        dispatch(addResultOrPredictionStart());
        if (admin === true) {
            matchResultsFBRef.push({
                matchID: resultPredictionData.matchID,
                teamAName: resultPredictionData.teamAName,
                teamBName: resultPredictionData.teamBName,
                predictedWinningTeam: resultPredictionData.winningTeam,
                predictedWinningMargin: resultPredictionData.winningMargin

            })
        }
        else{
                if(!resultPredictionData.predictionID == ""){
                    delete resultPredictionData["prediction"];
                    //matchPredictionsFBRef.child('matchPredictions/' + resultPredictionData.predictionID).set({
                    matchPredictionsFBRef.child(resultPredictionData.predictionID).set({
                        matchID: resultPredictionData.matchID,
                        matchKickoff: resultPredictionData.matchKickoff,
                        teamAName: resultPredictionData.teamAName,
                        teamBName: resultPredictionData.teamBName,
                        userId: resultPredictionData.userId,
                        userName: resultPredictionData.userName,
                        predictedWinningTeam: resultPredictionData.winningTeam,
                        predictedWinningMargin: resultPredictionData.winningMargin
                    })
                    .then(response => {
                            console.log("response is " + JSON.stringify(response));
                            dispatch(addResultOrPredictionSuccess(response));
                    })
                    .catch(error => {
                        console.log("Is this error that is getting thrown?" +error);
                        dispatch(addResultOrPredictionFail(error));
                    })
                }
                else{
                    delete resultPredictionData["prediction"];
                    //axios.post( 'https://react-my-burger-tam.firebaseio.com/matchPredictions.json?auth=' + token, matchResultData)
                    matchPredictionsFBRef.push({
                        matchID: resultPredictionData.matchID,
                        matchKickoff: resultPredictionData.matchKickoff,
                        teamAName: resultPredictionData.teamAName,
                        teamBName: resultPredictionData.teamBName,
                        userId: resultPredictionData.userId,
                        userName: resultPredictionData.userName,
                        predictedWinningTeam: resultPredictionData.winningTeam,
                        predictedWinningMargin: resultPredictionData.winningMargin
                    })
                        .then(response => {
                            dispatch(addResultOrPredictionSuccess());
                        })
                        .catch(error => {dispatch(addResultOrPredictionFail(error))})
                }
            }
    }
}