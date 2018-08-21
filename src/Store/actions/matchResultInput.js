import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';

export const initAddMatchResult = ( matchID, teamAName, teamBName, teamAScore, teamBScore  ) => {
    return {
        type: actionTypes.INIT_MATCH_RESULT_INPUT,
        matchID: matchID,
        teamAName: teamAName,
        teamBName: teamBName,
        teamAScore: teamAScore,
        teamBScore: teamBScore,
        addingMatchResult: true
    };
}

export const addMatchResult = (matchID, teamAName, teamBName, teamAScore, teamBScore) => {
    return {
        type: actionTypes.ADD_MATCH_RESULT,
        matchID: matchID,
        teamAName: teamAName,
        teamBName: teamBName,
        teamAScore: teamAScore,
        teamBScore: teamBScore,
        addingMatchResult: false
    }
}