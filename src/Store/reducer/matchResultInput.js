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

const initAddMatchResult = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchID,
            teamAName: action.teamAName,
            teamBName: action.teamBName,
            teamAScore: action.teamAScore,
            teamBScore: action.teamBScore,
            matchKickoff: action.matchKickoff
        },
        inputtingResult: true
    } );
}

const addMatchResult = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchID,
            teamAName: action.teamAName,
            teamBName: action.teamBName,
            teamAScore: action.teamAScore,
            teamBScore: action.teamBScore,
            matchKickoff: action.matchKickoff
        },
        inputtingResult: false
    } );
}

const removeMatchFromUpcomingMatches = (state, action) => {
    return true;
}

const addMatchResultStart= ( state, action ) => {
    return updateObject( state, {
        inputtingResult: true
    } );
}

const addMatchResultSuccess= ( state, action ) => {
    return updateObject( state, {
        inputtingResult: false
    } );
}

const addMatchResultFail= ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.INIT_MATCH_RESULT_INPUT: return initAddMatchResult(state, action);
        case actionTypes.ADD_MATCH_RESULT: return addMatchResult(state, action);
        case actionTypes.ADD_MATCH_RESULT_START: return addMatchResultStart(state, action);
        case actionTypes.ADD_MATCH_RESULT_SUCCESS: return addMatchResultSuccess(state, action);
        case actionTypes.ADD_MATCH_RESULT_FAIL: return addMatchResultFail(state, action);
        default: return state;
    }
};

export default reducer;