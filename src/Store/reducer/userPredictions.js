import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userPredictions: [],
    loading: false,
    error: false,
    redirectPath: '/'
}

const fetchUserPredictionsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchUserPredictionsSuccess = ( state, action ) => {
    return updateObject(state, {
        userPredictions: action.userPredictions,
        loading: false,
        error: false
    })
};

const fetchUserPredictionsFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: true } );
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_USER_PREDICTIONS_START: return fetchUserPredictionsStart(state, action);
        case actionTypes.FETCH_USER_PREDICTIONS_SUCCESS: return fetchUserPredictionsSuccess(state, action);
        case actionTypes.FETCH_USER_PREDICTIONS_FAIL: return fetchUserPredictionsFail(state, action);
        default: return state;
    }
};

export default reducer;