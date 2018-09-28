import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';

export const fetchUpcomingAndPredictions = (admin, token, userId) => {

    return dispatch => {
        dispatch(fetchUpcomingAndPredictionsStart());
        const fetchedUpcomingMatches = [];
        axios.get('https://react-my-burger-tam.firebaseio.com/upcomingmatches.json')
            .then(res => {
                for ( let key in res.data ) {
                    fetchedUpcomingMatches.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                fetchedUpcomingMatches.sort(function(a, b){
                    let dateA=new Date(a.matchKickoff), dateB=new Date(b.matchKickoff)
                    return dateA-dateB //sort by date ascending
                });
                if(userId && admin === false){
                    console.log("This didn't get run right?");
                    dispatch(fetchUserPredictions(fetchedUpcomingMatches, token, userId));
                }
                else{
                    dispatch(fetchUpcomingAndPredictionsSuccess(null, fetchedUpcomingMatches));
                }
            })
            .catch(err => {
                dispatch(fetchUpcomingAndPredictionsFail());
            });
    }
}

export const fetchUserPredictions = (fetchedUpcomingMatches, token, userId) => {
    return dispatch => {
        const fetchedUserPredictions = [];
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://react-my-burger-tam.firebaseio.com/matchPredictions.json' +queryParams)
            .then(res => {
                for ( let key in res.data ) {
                    fetchedUserPredictions.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchUpcomingAndPredictionsSuccess(fetchedUserPredictions, fetchedUpcomingMatches));
            })
            .catch(err => {
                dispatch(fetchUpcomingAndPredictionsFail());
            });
    }
}

export const fetchUpcomingAndPredictionsSuccess = (userPredictions, upcmgMatches) => {
    return {
        type: actionTypes.FETCH_UPCOMING_PREDICTIONS_SUCCESS,
        upcmgMatches: upcmgMatches,
        userPredictions: userPredictions
    };
}

export const createMatchesPredictionsArray = (matchesPredictions) => {
    return {
        type: actionTypes.CREATE_MATCHES_PREDICTIONS_ARRAY,
        matchesPredictions: matchesPredictions
    };
}

export const fetchUpcomingAndPredictionsFail = () => {
    return  {
        type: actionTypes.FETCH_UPCOMING_PREDICTIONS_FAIL
    };
};


export const addMatchResultSuccess = () => {
    return {
        type: actionTypes.ADD_MATCH_RESULT_SUCCESS
    };
};

export const fetchUpcomingAndPredictionsStart = () => {
    return {
        type: actionTypes.FETCH_UPCOMING_PREDICTIONS_START
    };
};

export const initAddMatchResult = ( matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff  ) => {
    return {
        type: actionTypes.INIT_MATCH_RESULT_INPUT,
        matchID: matchID,
        teamAName: teamAName,
        teamBName: teamBName,
        teamAScore: teamAScore,
        teamBScore: teamBScore,
        matchKickoff: matchKickoff
    };
}