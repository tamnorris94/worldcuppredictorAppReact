import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';
import { upcomingMatchesFBRef } from '../../Config/firebase';

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
                    dispatch(fetchUserPredictions(fetchedUpcomingMatches, token, userId));
                }
                else{
                    dispatch(fetchUpcomingAndPredictionsSuccess(fetchedUpcomingMatches));
                }
            })
            .catch(err => {
                console.log("The error is "+ err);
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
                //From here try to combine matches and prematcdictions
                console.log("At this point fetchedUpcomingMatches is " +JSON.stringify(fetchedUpcomingMatches));
                console.log("At this point fetchedUserPredictions is " +JSON.stringify(fetchedUserPredictions));
                let matchesPredictions = ['apples'];
                let combinedMatchesPredictions = [];
                fetchedUpcomingMatches.forEach(match => combineMatchesPredictions(match, fetchedUserPredictions));
                //console.log("combinedMatchesPredictions is stringy " + JSON.stringify(combinedMatchesPredictions));

                function combineMatchesPredictions(match, fetchedUserPredictions) {
                    console.log("We get into combineMatchesPredictions?");
                    let exists = false;
                    let i;
                    let matchID = match.id;
                    let predsMatchID;
                    for(i=0; i<fetchedUserPredictions.length; i++) {
                        predsMatchID = fetchedUserPredictions[i].matchID;
                        //console.log("predsMatchID : " + predsMatchID);
                        //console.log("match id : " + matchID);
                        if (matchID === predsMatchID) {
                            exists = true;
                            break;
                        }
                    }
                    if(exists){
                        combinedMatchesPredictions.push({
                            ...fetchedUserPredictions[i],
                            matchKickoff: match.matchKickoff,
                            predictionID: fetchedUserPredictions[i].id,
                            prediction: true
                        })
                    }
                    else {
                        console.log("Match looks like.." +JSON.stringify(match));
                        combinedMatchesPredictions.push({
                            ...match,
                            matchID: match.id,
                            prediction: false
                        })
                    }
                }
                dispatch(fetchUpcomingAndPredictionsSuccess(combinedMatchesPredictions));
            })
            .catch(err => {
                console.log("The error is "+ err);
                dispatch(fetchUpcomingAndPredictionsFail());
            });
    }
}

export const fetchUpcomingAndPredictionsSuccess = (matchesPredictions ) => {
    return {
        type: actionTypes.FETCH_UPCOMING_PREDICTIONS_SUCCESS,
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
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_SUCCESS
    };
};

export const fetchUpcomingAndPredictionsStart = () => {
    return {
        type: actionTypes.FETCH_UPCOMING_PREDICTIONS_START
    };
};

export const initAddMatchResultOrPrediction = ( matchPred  ) => {
    console.log("MatchPred in initAddMatchResult " + JSON.stringify(matchPred));
    return {
        type: actionTypes.INIT_MATCH_RESULT_OR_PREDICTION_INPUT,
        matchesPredictions: matchPred
    };
}

export const addMatchResultOrPrediction = (matchResultData, admin, token, prediction) => {
    console.log("State of prediction received by addMatchResult" +prediction);
    console.log("matchResultData looks like " +JSON.stringify(matchResultData));
    let match = "";
    for(let key in matchResultData){
        if(key = "matchID"){
            match = matchResultData[key]
        }
    }
    return dispatch => {
        dispatch( addMatchResultOrPredictionStart() );
        if(admin===true){
            axios.post( 'https://react-my-burger-tam.firebaseio.com/matchResults.json', matchResultData)
                .then(matchResultData => {
                    dispatch(deleteMatchFromUpcomingMatches(match));
                })
                .catch(error => {
                    dispatch(addMatchResultOrPredictionFail(error))
                })
        }
        else{
            if(matchResultData.prediction===true){
                delete matchResultData["prediction"];
                console.log("What is match id " + match.id);
                const matchID = matchResultData.predictionID;
                console.log("Match is id " + matchID);
                console.log("jsonPayload looks like " + JSON.stringify(matchResultData));
                axios.put('https://react-my-burger-tam.firebaseio.com/matchPredictions/' + matchResultData.predictionID + '.json',
                    matchResultData
                )
                .then(response => {
                    console.log("response is " + JSON.stringify(response))
                    dispatch(addMatchResultOrPredictionSuccess())
                })
                .catch(error => {
                    console.log("Is this error that is getting thrown?" +error);
                    dispatch(addMatchResultOrPredictionFail(error));
                })
            }
            else{
                delete matchResultData["prediction"];
                console.log("Do we get in here?");
                console.log("matchResultData looks like " + JSON.stringify(matchResultData));
                axios.post( 'https://react-my-burger-tam.firebaseio.com/matchPredictions.json?auth=' + token, matchResultData)
                    .then(matchResultData => {
                        dispatch(addMatchResultOrPredictionSuccess());
                    })
                    .catch(error => {dispatch(addMatchResultOrPredictionFail(error))})
            }
        }
    };
}

export const addMatchResultOrPredictionStart = () => {
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_START
    };
};

export const deleteMatchFromUpcomingMatches = (match) => {
    //const upcomingMatchesRef = fb.database().ref().child('upcomingmatches')
    const deleteRequest =  upcomingMatchesFBRef.child(match).remove()
    return dispatch => {
        deleteRequest.then(
            response => dispatch(addMatchResultOrPredictionSuccess(match))
        )
            .catch(
                err => dispatch(addMatchResultOrPredictionFail(err))
            )
    }
}

export const addMatchResultOrPredictionFail = (err) => {
    console.log("The error is " + err);
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_FAIL
    };
};

export const addMatchResultOrPredictionSuccess = () => {
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_SUCCESS
       // match: match
    };
};