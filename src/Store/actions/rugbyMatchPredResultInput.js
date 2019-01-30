import * as actionTypes from './actionTypes';


export const setWinningTeam = ( winningTeam ) => {
    return {
        type: actionTypes.SET_WINNING_TEAM,
        winningTeam: winningTeam
    };
};

export const setWinningMargin = ( winningMargin ) => {
    return {
        type: actionTypes.SET_WINNING_MARGIN,
        winningMargin: winningMargin
    };
};