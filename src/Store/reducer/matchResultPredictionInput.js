// import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../../shared/utility';
//
// const initialState = {
//     selectedMatchForUpd: {
//         matchID: null,
//         predictionID: null,
//         teamAName: null,
//         teamBName: null,
//         teamAScore: null,
//         teamBScore: null,
//         matchKickoff: null,
//         prediction: null
//     },
//     inputtingResult: false,
//     error: true
// }

// const initAddMatchResultOrPrediction = ( state, action ) => {
//     console.log("State of predictionID in reducer initAddMatchResult " +action.predictionID);
//     return updateObject( state, {
//         selectedMatchForUpd: {
//             matchID: action.matchID,
//             predictionID: action.predictionID,
//             teamAName: action.teamAName,
//             teamBName: action.teamBName,
//             teamAScore: action.teamAScore,
//             teamBScore: action.teamBScore,
//             matchKickoff: action.matchKickoff,
//             prediction: action.prediction
//         },
//         inputtingResult: true
//     } );
// }

// const addMatchResultOrPrediction = ( state, action ) => {
//     return updateObject( state, {
//         selectedMatchForUpd: {
//             matchID: action.matchID,
//             predictionID: action.predictionID,
//             teamAName: action.teamAName,
//             teamBName: action.teamBName,
//             teamAScore: action.teamAScore,
//             teamBScore: action.teamBScore,
//             matchKickoff: action.matchKickoff,
//             prediction: action.prediction
//         },
//         inputtingResult: false
//     } );
// }

// const removeMatchFromUpcomingMatches = (state, action) => {
//     return true;
// }
//
// const addMatchResultOrPredictionStart= ( state, action ) => {
//     return updateObject( state, {
//         inputtingResult: true
//     } );
// }
//
// const addMatchResultOrPredictionSuccess= ( state, action ) => {
//     return updateObject( state, {
//         inputtingResult: false
//     } );
// }
//
// const addMatchResultOrPredictionFail= ( state, action ) => {
//     return updateObject( state, {
//         error: true
//     } );
// }
//
// const updatePredictionSuccess = (state, action) => {
//     return updateObject(state, {
//         userPredictions: action.userPredictions,
//         loading: false,
//         error: false
//     })
// }
//
// const UpdatePredictionStart= ( state, action ) => {
//     return updateObject( state, {
//         inputtingResult: true
//     } );
// }
//
// const reducer = (state = initialState, action) => {
//     switch (action.type){
//         case actionTypes.INIT_MATCH_RESULT_OR_PREDICTION_INPUT: return initAddMatchResultOrPrediction(state, action);
//         case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION: return addMatchResultOrPrediction(state, action);
//         case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_START: return addMatchResultOrPredictionStart(state, action);
//         case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_SUCCESS: return addMatchResultOrPredictionSuccess(state, action);
//         case actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_FAIL: return addMatchResultOrPredictionFail(state, action);
//         case actionTypes.UPDATE_PREDICTION_SUCCESS: return updatePredictionSuccess(state, action);
//         default: return state;
//     }
// };

//export default reducer;