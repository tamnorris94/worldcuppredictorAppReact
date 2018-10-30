import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { connect } from 'react-redux';

const initialState = {
    aggPredictionResults: [],
    loading: false,
    error: false,
    redirectPath: '/',
}

const fetchPredictionResultsSuccess = (state, action) => {
    return updateObject(state, {
        aggPredictionResults: action.predictionResults,
        loading: false
    })
}



const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_PREDICTION_RESULTS_SUCCESS: return fetchPredictionResultsSuccess(state, action);
        default: return state;
    }
};


export default reducer;