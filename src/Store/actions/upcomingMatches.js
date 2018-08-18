import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';

export const fetchUpcomingMatches = () => {
    return dispatch => {
        dispatch(fetchUpcomingMatchesStart());
        axios.get('https://react-my-burger-tam.firebaseio.com/upcomingmatches.json')
            .then(res => {
                const fetchedUpcomingMatches = [];
                for ( let key in res.data ) {
                    fetchedUpcomingMatches.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchUpcomingMatchesSuccess(fetchedUpcomingMatches));
            })
            .catch(err => {
                dispatch(fetchUpcomingMatchesFailed());
            });
    }
}

export const fetchUpcomingMatchesSuccess = (upcmgMatches) => {
    return {
        type: actionTypes.FETCH_UPCOMING_MATCHES_SUCCESS,
        upcmgMatches: upcmgMatches
    };
};

export const fetchUpcomingMatchesFailed = () => {
    return {
        type: actionTypes.FETCH_UPCOMING_MATCHES_FAILED
    };
};

export const fetchUpcomingMatchesStart = () => {
    return {
        type: actionTypes.FETCH_UPCOMING_MATCHES_START
    };
};

