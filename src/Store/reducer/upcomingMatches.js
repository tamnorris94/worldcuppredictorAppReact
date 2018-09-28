import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { connect } from 'react-redux';

const initialState = {
    upcmgMatches: [],
    userPredictions: [],
    matchesPredictionsArray: [],
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
        upcmgMatches: [],
        userPredictions: []
    } );
};

const fetchUpcomingAndPredictionsSuccess = ( state, action ) => {
    return updateObject(state, {
        loading: false,
        upcmgMatches: action.upcmgMatches,
        userPredictions: action.userPredictions,
        error: false
    })
};

const fetchUpcomingAndPredictionsFailed = ( state, action ) => {
    return updateObject( state, { loading: false, error: true } );
};

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

const addMatchResultSuccess = ( state, action ) => {
    return updateObject( state, {
        ...state,
        upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.id !== action.match),
        inputtingResult: false
    } );
}

const createMatchesPredictionsArray = (state, action) => {
    return updateObject( state, {
        ...state,
        matchesPredictionsArray: state.matchesPredictionsArray
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_UPCOMING_PREDICTIONS_START: return fetchUpcomingAndPredictionsStart(state, action);
        //case actionTypes.FETCH_UPCOMING_MATCHES_SUCCESS: return fetchUpcomingAndPredictionsSuccess(state, action);
        case actionTypes.FETCH_UPCOMING_PREDICTIONS_SUCCESS: return fetchUpcomingAndPredictionsSuccess(state, action);
        case actionTypes.FETCH_UPCOMING_PREDICTIONS_FAIL: return fetchUpcomingAndPredictionsFailed(state, action);
        case actionTypes.INIT_MATCH_RESULT_INPUT: return initAddMatchResult(state, action);
        case actionTypes.ADD_MATCH_RESULT: return addMatchResult(state, action);
        case actionTypes.ADD_MATCH_RESULT_SUCCESS: return addMatchResultSuccess(state, action);
        default: return state;
    }
};

export default reducer;