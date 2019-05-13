import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    matchesPredictions: [],
    loading: false,
    error: false,
    redirectPath: '/',
    selectedMatchForUpd: {
        matchID: null,
        teamAName: null,
        teamBName: null,
        teamAScore: null,
        teamBScore: null,
        matchKickoff: null,
        prediction: null
    },
    inputtingResult: false,
    winningTeam: null,
    winningMargin: null
}

const fetchUpcomingAndPredictionsStart = ( state, action ) => {
    return updateObject( state, {
        loading: true,
        matchesPredictions: []
    } );
};

const fetchUpcomingAndPredictionsSuccess = ( state, action ) => {
    console.log("In reducer fetchUpcomingAndPredictionsSuccess matchesPredictions " + JSON.stringify(action.matchesPredictions));
    return updateObject(state, {
        loading: false,
        matchesPredictions: action.matchesPredictions,
        error: false
    })
};

const fetchUpcomingAndPredictionsFailed = ( state, action ) => {
    return updateObject( state, { loading: false, error: true } );
};

const initAddMatchResultOrPrediction = ( state, action ) => {
    //console.log("State of predictionID in reducer initAddMatchResult " +action.matchesPredictions.predictionID);
    //console.log("State of matchId in reducer initAddMatchResultOrPrediction " +action.matchesPredictions.matchID);

    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchesPredictions.matchID,
            predictionID: action.matchesPredictions.predictionID,
            teamAName: action.matchesPredictions.teamAName,
            teamBName: action.matchesPredictions.teamBName,
            teamAScore: action.matchesPredictions.teamAScore,
            teamBScore: action.matchesPredictions.teamBScore,
            matchKickoff: action.matchesPredictions.matchKickoff,
            prediction: action.matchesPredictions.prediction
        },
        inputtingResult: true
    } );
}

const initMatchResultInput = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchesPredictions.id,
            predictionID: action.predictionID,
            teamAName: action.matchesPredictions.teamAName,
            teamBName: action.matchesPredictions.teamBName,
            teamAScore: action.matchesPredictions.teamAScore,
            teamBScore: action.matchesPredictions.teamBScore,
            matchKickoff: action.matchesPredictions.matchKickoff,
            prediction: action.matchesPredictions.prediction
        },
        inputtingResult: true
    } );
}

const initPredictionInput = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchesPredictions.matchID,
            predictionID: action.matchesPredictions.predictionID,
            teamAName: action.matchesPredictions.teamAName,
            teamBName: action.matchesPredictions.teamBName,
            teamAScore: action.matchesPredictions.teamAScore,
            teamBScore: action.matchesPredictions.teamBScore,
            matchKickoff: action.matchesPredictions.matchKickoff,
            prediction: action.matchesPredictions.prediction
        },
        inputtingResult: true
    } );
}


const addMatchResultOrPredictionSuccess = ( state, action ) => {
    //Below needs to get the id for the match to delete, refer to BurgerBuilder order success
    //const matchToDelete = updateObject( action.matchesPredictions, { id: action.orderId } );
    console.log("addResultOrPredictionSuccess : state upcominng matches " + JSON.stringify(state.matchesPredictions))
    return updateObject( state, {
        ...state,
        //upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.id !== action.match),
        inputtingResult: false
    } );
}




// const addMatchResultOrPrediction = ( state, action ) => {
//     return updateObject( state, {
//         selectedMatchForUpd: {
//             matchID: action.matchID,
//             predictionID: action.predictionID,
//             teamAName: action.teamAName,
//             teamBName: action.teamBName,
//             teamAScore: action.teamAScore,
//             teamBScore: action.teamBScore,
//             matchKickoff: action.matchKickoff,
//             prediction: action.prediction
//         },
//         inputtingResult: false
//     } );
// }

// const removeMatchFromUpcomingMatches = (state, action) => {
//     return true;
// }

const addMatchResultOrPredictionStart= ( state, action ) => {
    return updateObject( state, {
        inputtingResult: true
    } );
}


const addMatchResultOrPredictionFail= ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const addMatchPredictionResultsFail= ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const updatePredictionSuccess = (state, action) => {
    return updateObject(state, {
        userPredictions: action.userPredictions,
        loading: false,
        error: false
    })
}

// const UpdatePredictionStart= ( state, action ) => {
//     return updateObject( state, {
//         inputtingResult: true
//     } );
// }

const deleteCompletedPredictionFail = (state, action) => {
    return updateObject( state, {
        error: true
    } );
}

const deleteCompletedPredictionSuccess = (state, action) => {
    return updateObject( state, {
        error: false
    } );
}

const addUpcomingMatchSuccess = (state, action) => {
    return updateObject( state, {
        error: false,
        loading: false,
        redirectPath: '/',
    })
}

const addUpcomingMatchFail = (state, action) => {
    return updateObject( state, {
        error: true,
        loading: false
    })
}

const setWinningTeam = ( state, action ) => {
    const updatedWinningTeam = action.winningTeam
    const updatedState = {
        winningTeam: updatedWinningTeam
    }

    return updateObject(state, updatedState);
};

const setWinningMargin = ( state, action ) => {
    //console.log("Reducer : The winning margin is " + action.winningMargin)
    const updatedWinningMargin = action.winningMargin
    const updatedState = {
        winningMargin: updatedWinningMargin
    }

    return updateObject(state, updatedState);
};

const addResultOrPredictionSuccess = (state, action) => {
    return updateObject( state, {
        ...state,
        //upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.id !== action.match),
        inputtingResult: false
    } );
}

//Get index of match for which result is being added and remove it from matchesPredictions, so that it does not appear
//on screen.
const addMatchResultSuccess = (state, action) => {
    const updatedMatches = state.matchesPredictions;
    const indexOfMatchToRemove = updatedMatches.map(match => match.id).indexOf(action.matchId);
    updatedMatches.splice(indexOfMatchToRemove, 1);
    return updateObject( state, {
        ...state,
        //upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.id !== action.match),
        inputtingResult: false,
        matchesPredictions: updatedMatches
    } );
}

//Get index of match for which prediction being made and set prediction to true.
const addMatchPredictionSuccess = (state, action) => {
    const updatedMatches = state.matchesPredictions;
    const updatedSelectedMatchForUpdate = state.selectedMatchForUpd;
    //console.log("In addMatchPredictionSuccess reducer selectedMatchForUpdate is " + JSON.stringify(updatedSelectedMatchForUpdate));
    updatedSelectedMatchForUpdate.prediction = true;
    const indexOfMatchToUpdate = updatedMatches.map(match => match.matchID).indexOf(action.matchId);
    //console.log("Made it in to addMatchPredictionSuccess reducer");
    //console.log("In addMatchPredictionSuccess reducer updatedMatches are " + JSON.stringify(updatedMatches));
    //
    //console.log("In addMatchPredictionSuccess reducer matchId to update is " + action.matchId);
    //console.log("In addMatchPredictionSuccess reducer index of match being updated is " + indexOfMatchToUpdate);
    updatedMatches[indexOfMatchToUpdate].prediction = true;
    //console.log("In addMatchPredictionSuccess reducer updatedMatches after updating are " + JSON.stringify(updatedMatches));
    return updateObject(state, {
        matchesPredictions: updatedMatches,
        inputtingResult: false,
        selectedMatchForUpd: updatedSelectedMatchForUpdate
    })
}

const addNewMatchPredictionSuccess = (state, action) => {
    //In the reducer I need to newPredID just created; the matchID being updated
    //I think that might be it. The rest is held in selectedMatchToUpdate
    // console.log("Reducer matchPredictionData to update is " + JSON.stringify(action.matchPredictionData));
    // console.log("Reducer addNewMatchPredictionSuccess newPred is " + action.newPredID);
    // console.log("Reducer matchID to update is " + JSON.stringify(action.matchPredictionData.matchID));
    // console.log("Reducer matchesPredictions is matchesPredictions " + JSON.stringify(state.matchesPredictions));

    const newPredID = action.newPredID;
    const updatedMatches = state.matchesPredictions;
    const updatedSelectedMatchForUpdate = state.selectedMatchForUpd;
    const matchIDToUpdate = action.matchPredictionData.matchID;
    //console.log("Reducer addNewMatchPredictionSuccess MatchID of match to update " +matchIDToUpdate);
    //updatedSelectedMatchForUpdate.prediction = true;
    //updatedSelectedMatchForUpdate.matchID = action.newPredID;
    const indexOfMatchToUpdate = updatedMatches.map(match => match.matchID).indexOf(matchIDToUpdate);
    //console.log("In addNewMatchPredictionSuccess reducer updatedMatches are " + JSON.stringify(updatedMatches));
    //console.log("In addNewMatchPredictionSuccess reducer newPredID are " + JSON.stringify(action.newPredID));
    //console.log("In addMatchPredictionSuccess reducer selectedMatchForUpdate is " + JSON.stringify(updatedSelectedMatchForUpdate));
    //console.log("In addMatchPredictionSuccess reducer matchId to update is " + action.matchId);
    //console.log("In addMatchPredictionSuccess reducer index of match being updated is " + indexOfMatchToUpdate);
    updatedMatches[indexOfMatchToUpdate].predictionID = action.newPredID;
    updatedSelectedMatchForUpdate.predictionID = action.newPredID;
    //console.log("In addMatchPredictionSuccess reducer updatedMatches after updating are " + JSON.stringify(updatedMatches));
    return updateObject(state, {
        matchesPredictions: updatedMatches,
        inputtingResult: false,
        selectedMatchForUpd: updatedSelectedMatchForUpdate
    })
}

const cancelMatchResPredInput = (state, action) => {
    return updateObject( state, {
        ...state,
        //upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.id !== action.match),
        inputtingResult: false
    } );
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_UPCOMING_PREDICTIONS_START: return fetchUpcomingAndPredictionsStart(state, action);
        case actionTypes.FETCH_UPCOMING_PREDICTIONS_SUCCESS: return fetchUpcomingAndPredictionsSuccess(state, action);
        case actionTypes.FETCH_UPCOMING_PREDICTIONS_FAIL: return fetchUpcomingAndPredictionsFailed(state, action);
        case actionTypes.ADD_MATCH_PREDICTION_RESULTS_FAIL: return addMatchPredictionResultsFail(state, action);
        case actionTypes.INIT_MATCH_RESULT_OR_PREDICTION_INPUT: return initAddMatchResultOrPrediction(state, action);
        case actionTypes.INIT_MATCH_RESULT_INPUT: return initMatchResultInput(state, action);
        case actionTypes.INIT_MATCH_PREDICTION_INPUT: return initPredictionInput(state, action);
        case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_START: return addMatchResultOrPredictionStart(state, action);
        case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_SUCCESS: return addMatchResultOrPredictionSuccess(state, action);
        case actionTypes.ADD_MATCH_RESULT_SUCCESS: return addMatchResultSuccess(state, action);
        case actionTypes.ADD_MATCH_PREDICTION_SUCCESS: return addMatchPredictionSuccess(state, action);
        case actionTypes.ADD_NEW_MATCH_PREDICTION_SUCCESS: return addNewMatchPredictionSuccess(state, action);
        case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_FAIL: return addMatchResultOrPredictionFail(state, action);
        case actionTypes.UPDATE_PREDICTION_SUCCESS: return updatePredictionSuccess(state, action);
        case actionTypes.DELETE_COMPLETED_PREDICTION_FAIL: return deleteCompletedPredictionFail(state, action);
        case actionTypes.DELETE_COMPLETED_PREDICTION_SUCCESS: return deleteCompletedPredictionSuccess(state, action);
        case actionTypes.ADD_UPCOMING_MATCH_SUCCESS: return addUpcomingMatchSuccess(state, action);
        case actionTypes.ADD_UPCOMING_MATCH_FAIL: return addUpcomingMatchFail(state, action);
        case actionTypes.SET_WINNING_TEAM: return setWinningTeam(state, action);
        case actionTypes.SET_WINNING_MARGIN: return setWinningMargin(state, action);
        case actionTypes.ADD_RESULT_OR_PREDICTION_SUCCESS: return addResultOrPredictionSuccess(state, action);
        case actionTypes.CANCEL_MATCH_RES_OR_PRED_INPUT: return cancelMatchResPredInput(state, action);
        default: return state;
    }
};

export default reducer;