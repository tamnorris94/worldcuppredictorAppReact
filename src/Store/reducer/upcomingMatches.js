import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { connect } from 'react-redux';

const initialState = {
    upcmgMatches: [],
    loading: false,
    redirectPath: '/',
    selectedMatchForUpd: {
        matchID: null,
        teamAName: null,
        teamBName: null,
        teamAScore: null,
        teamBScore: null
    },
    inputtingResult: false
}

const fetchUpcomingMatchesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchUpcomingMatchesSuccess = ( state, action ) => {
    return updateObject(state, {
        upcmgMatches: action.upcmgMatches,
        //selectedMatchResult: null,
        loading: false,
        error: false
    })
};

const fetchUpcomingMatchesFailed = ( state, action ) => {
    return updateObject( state, { loading: false, error: true } );
};

const initAddMatchResult = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchID,
            teamAName: action.teamAName,
            teamBName: action.teamBName,
            teamAScore: action.teamAScore,
            teamBScore: action.teamBScore
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
            teamBScore: action.teamBScore
        },
        inputtingResult: false
    } );
}

// const addMatchResultSuccess= ( state, action ) => {
//     return updateObject( state, {
//         inputtingResult: false
//     } );
// }

const addMatchResultSuccess= ( state, action ) => {
    console.log("addMatchResultSuccess executed");
    console.log("Match is (reducer)" +action.match);
    return updateObject( state, {
        ...state,
        upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.matchID !== action.match),
        inputtingResult: false
    } );
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_UPCOMING_MATCHES_START: return fetchUpcomingMatchesStart(state, action);
        case actionTypes.FETCH_UPCOMING_MATCHES_SUCCESS: return fetchUpcomingMatchesSuccess(state, action);
        case actionTypes.FETCH_UPCOMING_MATCHES_FAILED: return fetchUpcomingMatchesFailed(state, action);
        case actionTypes.INIT_MATCH_RESULT_INPUT: return initAddMatchResult(state, action);
        case actionTypes.ADD_MATCH_RESULT: return addMatchResult(state, action);
        case actionTypes.ADD_MATCH_RESULT_SUCCESS: return addMatchResultSuccess(state, action);
        default: return state;
    }
};

export default reducer;