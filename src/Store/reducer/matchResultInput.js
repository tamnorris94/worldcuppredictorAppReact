import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    selectedMatchForUpd: {
        matchID: null,
        teamAName: null,
        teamBName: null,
        teamAScore: null,
        teamBScore: null
    }
}

const initAddMatchResult = ( state, action ) => {
    return updateObject( state, {
        selectedMatchForUpd: {
            matchID: action.matchID,
            teamAName: action.teamAName,
            teamBName: action.teamBName,
            teamAScore: action.teamAScore,
            teamBScore: action.teamBScore
        }
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
        }
    } );
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.INIT_MATCH_RESULT_INPUT: return initAddMatchResult(state, action);
        case actionTypes.ADD_MATCH_RESULT: return addMatchResult(state, action);
        default: return state;
    }
};

export default reducer;