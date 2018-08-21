import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { connect } from 'react-redux';

const initialState = {
    upcmgMatches: [],
    loading: false,
    redirectPath: '/'
}

const fetchUpcomingMatchesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchUpcomingMatchesSuccess = ( state, action ) => {
    return updateObject(state, {
        upcmgMatches: action.upcmgMatches,
        //selectedMatchResult: null,
        loading: false,
        error: false
    })
};

const fetchUpcomingMatchesFailed = ( state, action ) => {
    return updateObject( state, { loading: false, error: true } );
};



// const setUpcomingMatches = (state, action) => {
//     return updateObject(state, {
//         upcomingMatches: action.upcomingMatches,
//         loading: false
//     })
// }

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_UPCOMING_MATCHES_START: return fetchUpcomingMatchesStart(state, action);
        case actionTypes.FETCH_UPCOMING_MATCHES_SUCCESS: return fetchUpcomingMatchesSuccess(state, action);
        case actionTypes.FETCH_UPCOMING_MATCHES_FAILED: return fetchUpcomingMatchesFailed(state, action);
        default: return state;
    }
};

export default reducer;