// import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../../shared/utility';
//
// const initialState = {
//     winningTeam: null,
//     winningMargin: null,
//     error: false,
//     inputtingResPrediction: false
// };
//
// const setWinningTeam = ( state, action ) => {
//     const updatedWinningTeam = action.winningTeam
//     const updatedState = {
//         winningTeam: updatedWinningTeam
//     }
//
//     return updateObject(state, updatedState);
// };
//
// const setWinningMargin = ( state, action ) => {
//     console.log("Reducer : The winning margin is " + action.winningMargin)
//     const updatedWinningMargin = action.winningMargin
//     const updatedState = {
//         winningMargin: updatedWinningMargin
//     }
//
//     return updateObject(state, updatedState);
// };
//
// const addResultPredictionStart = (state, action) => {
//     return updateObject( state, {
//         inputtingResPrediction: true
//     } );
// }
//
// const addResultOrPredictionSuccess = (state, action) => {
//     return updateObject( state, {
//         ...state,
//         //upcmgMatches: state.upcmgMatches.filter(upcmgMatch => upcmgMatch.id !== action.match),
//         inputtingResult: false
//     } );
// }
//
// const addResultOrPredictionFail= ( state, action ) => {
//     return updateObject( state, {
//         error: true
//     } );
// }
//
//
// const reducer = (state = initialState, action) => {
//     switch (action.type){
//         //case actionTypes.SET_WINNING_TEAM: return setWinningTeam(state, action);
//         //case actionTypes.SET_WINNING_MARGIN: return setWinningMargin(state, action);
//         //case actionTypes.ADD_RESULT_OR_PREDICTION_SUCCESS: return addResultOrPredictionSuccess(state, action);
//         case actionTypes.ADD_RESULT_OR_PREDICTION_FAIL: return addResultOrPredictionFail(state, action);
//         case actionTypes.ADD_RESULT_OR_PREDICTION_START: return addResultPredictionStart(state, action);
//         default: return state;
//     }
// };
//
// export default reducer;