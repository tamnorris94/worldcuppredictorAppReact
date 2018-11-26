import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    aggPredictionResults: [],
    userPredResults: [],
    loading: false,
    error: false,
    redirectPath: '/',
    displayingUserPredResults: false
}

const fetchPredictionResultsSuccess = (state, action) => {
    return updateObject(state, {
        aggPredictionResults: action.predictionResults,
        loading: false,
        error: false
    })
}

const fetchUserPredResultsSuccess = (state, action) => {

    return updateObject(state, {
        userPredResults: action.fetchedUserPredResults,
        loading: false,
        error: false,
        displayingUserPredResults: true
    })
}

const fetchUserPredResultsFail = (state, action) => {
    return updateObject(state, {
        aggPredictionResults: null,
        loading: false,
        error: true
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_PREDICTION_RESULTS_SUCCESS: return fetchPredictionResultsSuccess(state, action);
        case actionTypes.FETCH_USER_PRED_RESULTS_SUCCESS: return fetchUserPredResultsSuccess(state, action);
        case actionTypes.FETCH_USER_PRED_RESULTS_FAIL: return fetchUserPredResultsFail(state, action);
        default: return state;
    }
};


export default reducer;