import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';

export const fetchCompletedMatches = () => {
    return dispatch => {
        dispatch(fetchCompletedMatchesStart());
        axios.get('https://react-my-burger-tam.firebaseio.com/matchResults.json')
            .then(res => {
                const fetchedCompletedMatches = [];
                for ( let key in res.data ) {
                    fetchedCompletedMatches.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchCompletedMatchesSuccess(fetchedCompletedMatches));
            })
            .catch(err => {
                dispatch(fetchCompletedMatchesFailed());
            });
    }
}

export const fetchCompletedMatchesSuccess = (completedMatches) => {
    return {
        type: actionTypes.FETCH_COMPLETED_MATCHES_SUCCESS,
        completedMatches: completedMatches
    };
};

export const fetchCompletedMatchesStart = () => {
    return {
        type: actionTypes.FETCH_COMPLETED_MATCHES_START
    };
};

export const fetchCompletedMatchesFailed = () => {
    return {
        type: actionTypes.FETCH_COMPLETED_MATCHES_FAIL
    };
};