import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';

export const fetchUserPredictions = (token, userId) => {
    return dispatch => {
        dispatch(fetchUserPredictionsStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://react-my-burger-tam.firebaseio.com/matchPredictions.json' +queryParams)
            .then(res => {
                const fetchedUserPredictions = [];
                for ( let key in res.data ) {
                    fetchedUserPredictions.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchUserPredictionsSuccess(fetchedUserPredictions));
            })
            .catch(err => {
                dispatch(fetchUserPredictionsFailed());
            });
    }
}

export const fetchUserPredictionsSuccess = (userPredictions) => {
    return {
        type: actionTypes.FETCH_USER_PREDICTIONS_SUCCESS,
        userPredictions: userPredictions
    };
};

export const fetchUserPredictionsStart = () => {
    return {
        type: actionTypes.FETCH_USER_PREDICTIONS_START
    };
};

export const fetchUserPredictionsFailed = () => {
    return {
        type: actionTypes.FETCH_USER_PREDICTIONS_FAIL
    };
};