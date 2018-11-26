import * as actionTypes from './actionTypes';
import { matchPredictionResultsFBRef } from '../../Config/firebase';

export const fetchPredictionResults = () => {
    const fetchedPredictionResults = [];
    const retrievePredResults =  matchPredictionResultsFBRef.once("value",
        function(snapshot){
            snapshot.forEach(function(snapshotChild){
                const item = snapshotChild.val();
                item.key = snapshotChild.key;
                fetchedPredictionResults.push(item);
            })
        }
        );
    return dispatch => {

        retrievePredResults.then(
            response => dispatch(aggregatePredictionResults(fetchedPredictionResults))
        )
            .catch(
                err => dispatch(fetchPredictionResultsFail(err))
            )
    }
}

export const fetchPredictionResultsFail = (err) => {

    return  {
        type: actionTypes.FETCH_PREDICTION_RESULTS_FAIL
    };
};

export const fetchPredictionResultsSuccess = (predictionResults) => {

    return  {
        type: actionTypes.FETCH_PREDICTION_RESULTS_SUCCESS,
        predictionResults: predictionResults
    };
};

export const aggregatePredictionResults = (fetchedPredictionResults) => {
    let predictionResults = [...fetchedPredictionResults.reduce((c, v) => {
        if (!c.has(v.userId)) c.set(v.userId, {"userId": v.userId,"points": 0, "userName": v.userName});
        c.get(v.userId).points += +v.points;
        return c;
    }, new Map()).values()];
    predictionResults.sort(function(a, b){
        return b.points - a.points;
    });
    return dispatch => {
        dispatch(fetchPredictionResultsSuccess(predictionResults));
    }
}

export const fetchUserPredictionResults = (userId) => {
    const fetchedUserPredResults = [];
    const retrieveUserPredResults =  matchPredictionResultsFBRef.orderByChild("userId").equalTo(userId).once("value",
        function(snapshot){
            snapshot.forEach(function(snapshotChild){
                const item = snapshotChild.val();
                item.key = snapshotChild.key;
                fetchedUserPredResults.push(item);
            })
        }
    );
    return dispatch => {
        retrieveUserPredResults.then(
            response => dispatch(fetchedUserPredResultsSuccess(fetchedUserPredResults))
        )
            .catch(
                err => dispatch(fetchedUserPredResultsFail(err))
            )
    }
}

export const fetchedUserPredResultsSuccess = (fetchedUserPredResults) => {
    return  {
        type: actionTypes.FETCH_USER_PRED_RESULTS_SUCCESS,
        fetchedUserPredResults: fetchedUserPredResults
    };
}

export const fetchedUserPredResultsFail = (err) => {
    return  {
        type: actionTypes.FETCH_USER_PRED_RESULTS_FAIL,
        error: err
    };
}