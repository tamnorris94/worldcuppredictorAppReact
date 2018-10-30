import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { connect } from 'react-redux';

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
        matchKickoff: null
    },
    inputtingResult: false
}

const fetchUpcomingAndPredictionsStart = ( state, action ) => {
    return updateObject( state, {
        loading: true,
        matchesPredictions: []
    } );
};

const fetchUpcomingAndPredictionsSuccess = ( state, action ) => {
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
    console.log("State of matchesPrediction in initAddMatchResultOrPrediction reducer is " + JSON.stringify(action.matchesPredictions));
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
    console.log("In initMatchResultInput Input action is " +JSON.stringify(action));
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
    console.log("In initPrediction Input action is " +JSON.stringify(action));
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
    return updateObject( state, {
        ...state,
        //upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.id !== action.match),
        inputtingResult: false
    } );
}


const addMatchResultOrPrediction = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchID,
            predictionID: action.predictionID,
            teamAName: action.teamAName,
            teamBName: action.teamBName,
            teamAScore: action.teamAScore,
            teamBScore: action.teamBScore,
            matchKickoff: action.matchKickoff,
            prediction: action.prediction
        },
        inputtingResult: false
    } );
}

const removeMatchFromUpcomingMatches = (state, action) => {
    return true;
}

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

const UpdatePredictionStart= ( state, action ) => {
    return updateObject( state, {
        inputtingResult: true
    } );
}

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
        case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_FAIL: return addMatchResultOrPredictionFail(state, action);
        case actionTypes.UPDATE_PREDICTION_SUCCESS: return updatePredictionSuccess(state, action);
        case actionTypes.DELETE_COMPLETED_PREDICTION_FAIL: return deleteCompletedPredictionFail(state, action);
        case actionTypes.DELETE_COMPLETED_PREDICTION_SUCCESS: return deleteCompletedPredictionSuccess(state, action);
        default: return state;
    }
};

export default reducer;