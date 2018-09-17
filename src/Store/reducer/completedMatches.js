import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    completedMatches: [],
    loading: false,
    error: false,
    redirectPath: '/'
}

const fetchCompletedMatchesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchCompletedMatchesSuccess = ( state, action ) => {
    return updateObject(state, {
        completedMatches: action.completedMatches,
        loading: false,
        error: false
    })
};

const fetchCompletedMatchesFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: true } );
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_COMPLETED_MATCHES_START: return fetchCompletedMatchesStart(state, action);
        case actionTypes.FETCH_COMPLETED_MATCHES_SUCCESS: return fetchCompletedMatchesSuccess(state, action);
        case actionTypes.FETCH_COMPLETED_MATCHES_FAIL: return fetchCompletedMatchesFail(state, action);
        default: return state;
    }
};

export default reducer;