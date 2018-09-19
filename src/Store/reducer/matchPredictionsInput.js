import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    selectedMatchForUpd: {
        matchID: null,
        teamAName: null,
        teamBName: null,
        teamAScore: null,
        teamBScore: null,
        matchKickoff: null
    },
    inputtingResult: false,
    error: true
}

const initAddMatchPrediction = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchID,
            teamAName: action.teamAName,
            teamBName: action.teamBName,
            teamAScore: action.teamAScore,
            teamBScore: action.teamBScore,
            matchKickoff: action.matchKickoff,
            userId: action.userId
        },
        inputtingResult: true
    } );
}

const addMatchPrediction = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchID,
            teamAName: action.teamAName,
            teamBName: action.teamBName,
            teamAScore: action.teamAScore,
            teamBScore: action.teamBScore,
            matchKickoff: action.matchKickoff,
            userId: action.userId
        },
        inputtingResult: false
    } );
}

const addMatchPredictionStart= ( state, action ) => {
    return true;
}

const addMatchPredictionSuccess= ( state, action ) => {
    return updateObject( state, {
        inputtingResult: false
    } );
}

const addMatchPredictionFail= ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.INIT_MATCH_PREDICTION_INPUT: return initAddMatchPrediction(state, action);
        case actionTypes.ADD_MATCH_PREDICTION: return addMatchPrediction(state, action);
        case actionTypes.ADD_MATCH_PREDICTION_START: return addMatchPredictionStart(state, action);
        case actionTypes.ADD_MATCH_PREDICTION_SUCCESS: return addMatchPredictionSuccess(state, action);
        case actionTypes.ADD_MATCH_PREDICTION_FAIL: return addMatchPredictionFail(state, action);
        default: return state;
    }
};

export default reducer;