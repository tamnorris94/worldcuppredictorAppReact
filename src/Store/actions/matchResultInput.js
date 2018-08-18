import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';

export const initAddMatchResult = ( matchID, teamAName, teamBName  ) => {
    return {
        type: actionTypes.INIT_MATCH_RESULT_INPUT,
        matchId: matchID,
        teamAName: teamAName,
        teamBName: teamBName
    };
}

export const addMatchResult = (teamAScore, teamBScore) => {
    return {
        type: actionTypes.ADD_MATCH_RESULT,
        teamAScore: teamAScore,
        teamBScore: teamBScore
    }
}