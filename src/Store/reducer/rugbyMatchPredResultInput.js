import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    winningTeam: null,
    winningMargin: null,
    error: false
};

const setWinningTeam = ( state, action ) => {
    //console.log("The winning Team is " + action.winningTeam)
    const updatedWinningTeam = action.winningTeam
    const updatedState = {
        winningTeam: updatedWinningTeam
    }

    return updateObject(state, updatedState);
};

const setWinningMargin = ( state, action ) => {
    console.log("The winning margin is " + action.winningMargin)
    const updatedWinningMargin = action.winningMargin
    const updatedState = {
        winningMargin: updatedWinningMargin
    }

    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_WINNING_TEAM: return setWinningTeam(state, action);
        case actionTypes.SET_WINNING_MARGIN: return setWinningMargin(state, action);
        default: return state;
    }
};

export default reducer;