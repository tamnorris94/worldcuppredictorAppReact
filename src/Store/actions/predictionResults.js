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
    console.log("The error in fetchPredictionResultsFail is " +err)
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
        if (!c.has(v.userId)) c.set(v.userId, {"userId": v.userId,"points": 0});
        c.get(v.userId).points += +v.points;
        return c;
    }, new Map()).values()];
    console.log("Aggregated results are " +JSON.stringify(predictionResults));
    return dispatch => {
        dispatch(fetchPredictionResultsSuccess(predictionResults));
    }
}