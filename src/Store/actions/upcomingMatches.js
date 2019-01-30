import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';
import { upcomingMatchesFBRef } from '../../Config/firebase';
import { matchPredictionsFBRef } from '../../Config/firebase';
import { matchPredictionResultsFBRef } from '../../Config/firebase';
import { matchResultsFBRef } from '../../Config/firebase';
import { databaseRef } from '../../Config/firebase';

// export const fetchUpcomingAndPredictions = (admin, token, userId) => {
//     return dispatch => {
//         dispatch(fetchUpcomingAndPredictionsStart());
//         const fetchedUpcomingMatches = [];
//         axios.get('https://react-my-burger-tam.firebaseio.com/upcomingmatches.json')
//             .then(res => {
//                 console.log("Res here is " + JSON.stringify(res.data));
//                 for ( let key in res.data ) {
//                     fetchedUpcomingMatches.push( {
//                         ...res.data[key],
//                         id: key
//                     } );
//                 }
//                 fetchedUpcomingMatches.sort(function(a, b){
//                     let dateA=new Date(a.matchKickoff), dateB=new Date(b.matchKickoff)
//                     return dateA-dateB //sort by date ascending
//                 });
//                 if(userId && admin === false){
//                     dispatch(fetchUserPredictions(fetchedUpcomingMatches, token, userId));
//                 }
//                 else{
//                     dispatch(fetchUpcomingAndPredictionsSuccess(fetchedUpcomingMatches));
//                 }
//             })
//             .catch(err => {
//                 console.log("The error is "+ err);
//                 dispatch(fetchUpcomingAndPredictionsFail());
//             });
//     }
// }

export const fetchUpcomingAndPredictions = (admin, token, userId) => {
    const fetchedUpcomingMatches = [];
    const retrieveUpcomingMatches = upcomingMatchesFBRef.once("value",
        function(snapshot){
            snapshot.forEach(function(snapShotChild){
                const item = snapShotChild.val();
                item.id = snapShotChild.key;
                fetchedUpcomingMatches.push(item);
            })
            fetchedUpcomingMatches.sort(function(a, b){
                let dateA=new Date(a.matchKickoff), dateB=new Date(b.matchKickoff)
                return dateA-dateB //sort by date ascending
            });
        })
    return dispatch => {
        let queryParams = null;
        //If user is valid and not admin then fetch user predictions
        if(userId && admin === false){
            retrieveUpcomingMatches.then(
                response => dispatch(fetchUserPredictions(fetchedUpcomingMatches, token, userId))
            )
                .catch(
                    err => dispatch(fetchUpcomingAndPredictionsFail())
                )
        }
        else{
            retrieveUpcomingMatches.then(
                response => dispatch(fetchUpcomingAndPredictionsSuccess(fetchedUpcomingMatches))
            )
                .catch(
                    err => dispatch(fetchUpcomingAndPredictionsFail())
                )
        }
    }
}

// export const fetchUserPredictions = (fetchedUpcomingMatches, token, userId) => {
//     return dispatch => {
//         const fetchedUserPredictions = [];
//         const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
//         axios.get('https://react-my-burger-tam.firebaseio.com/matchPredictions.json' +queryParams)
//             .then(res => {
//
//                 for ( let key in res.data ) {
//                     fetchedUserPredictions.push( {
//                         ...res.data[key],
//                         id: key
//                     } );
//                 }
//                 //From here try to combine matches and prematcdictions
//                 console.log("At this point fetchedUpcomingMatches is " +JSON.stringify(fetchedUpcomingMatches));
//                 console.log("At this point fetchedUserPredictions is " +JSON.stringify(fetchedUserPredictions));
//                 let matchesPredictions = ['apples'];
//                 let combinedMatchesPredictions = [];
//                 fetchedUpcomingMatches.forEach(match => combineMatchesPredictions(match, fetchedUserPredictions));
//                 //console.log("combinedMatchesPredictions is stringy " + JSON.stringify(combinedMatchesPredictions));
//
//                 function combineMatchesPredictions(match, fetchedUserPredictions) {
//                     console.log("We get into combineMatchesPredictions?");
//                     let exists = false;
//                     let i;
//                     let matchID = match.id;
//                     let predsMatchID;
//                     for(i=0; i<fetchedUserPredictions.length; i++) {
//                         predsMatchID = fetchedUserPredictions[i].matchID;
//                         //console.log("predsMatchID : " + predsMatchID);
//                         //console.log("match id : " + matchID);
//                         if (matchID === predsMatchID) {
//                             exists = true;
//                             break;
//                         }
//                     }
//                     if(exists){
//                         combinedMatchesPredictions.push({
//                             ...fetchedUserPredictions[i],
//                             matchKickoff: match.matchKickoff,
//                             predictionID: fetchedUserPredictions[i].id,
//                             prediction: true
//                         })
//                     }
//                     else {
//                         console.log("Match looks like.." +JSON.stringify(match));
//                         combinedMatchesPredictions.push({
//                             ...match,
//                             matchID: match.id,
//                             prediction: false
//                         })
//                     }
//                 }
//                 dispatch(fetchUpcomingAndPredictionsSuccess(combinedMatchesPredictions));
//             })
//             .catch(err => {
//                 console.log("The error is "+ err);
//                 dispatch(fetchUpcomingAndPredictionsFail());
//             });
//     }
// }

export const fetchUserPredictions = (fetchedUpcomingMatches, token, userId) => {
    const fetchedUserPreds = [];
    let combinedMatchesPredictions = [];
    //fetch user predictions for userId
    const retrieveMatchPreds =  matchPredictionsFBRef.orderByChild("userId").equalTo(userId).once("value",
        function(snapshot){
            snapshot.forEach(function(snapshotChild){
                const item = snapshotChild.val();
                item.id = snapshotChild.key;
                fetchedUserPreds.push(item);
            })
            fetchedUpcomingMatches.forEach(match => combineMatchesPredictions(match, fetchedUserPreds));
        }
    );

    function combineMatchesPredictions(match, fetchedUserPreds) {
        let exists = false;
        let i;
        let matchID = match.id;
        let predsMatchID;
        for(i=0; i<fetchedUserPreds.length; i++) {
            predsMatchID = fetchedUserPreds[i].matchID;
            if (matchID === predsMatchID) {
                exists = true;
                break;
            }
        }
        //if the match is in the userPredictions then add predictionID to combinedMatchesPredictions
        //else predictionID will equal null.
        if(exists){
            combinedMatchesPredictions.push({
                ...fetchedUserPreds[i],
                //matchKickoff: match.matchKickoff,
                predictionID: fetchedUserPreds[i].id,
                prediction: true
            })
        }
        else {
            combinedMatchesPredictions.push({
                ...match,
                matchID: match.id,
                predictionID: "",
                prediction: false
            })
        }
    }
    return dispatch => {
        retrieveMatchPreds.then(
            response => dispatch(fetchUpcomingAndPredictionsSuccess(combinedMatchesPredictions))
        )
            .catch(
                err => dispatch(fetchUpcomingAndPredictionsFail())
            )
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

// export const initAddMatchResultOrPrediction = ( matchPred, admin  ) => {
//     console.log("MatchPred in initAddMatchResult " + JSON.stringify(matchPred));
//     return {
//         type: actionTypes.INIT_MATCH_RESULT_OR_PREDICTION_INPUT,
//         matchesPredictions: matchPred
//     };
// }

export const initAddMatchResult = ( matchPred ) => {
    return {
        type: actionTypes.INIT_MATCH_RESULT_INPUT,
        matchesPredictions: matchPred
    };
}

export const initAddMatchPrediction = ( matchPred ) => {
    return {
        type: actionTypes.INIT_MATCH_PREDICTION_INPUT,
        matchesPredictions: matchPred
    };
}

export const addMatchResultOrPrediction = (matchResultData, admin, token, prediction) => {
    //console.log("State of prediction received by addMatchResult" +prediction);
    console.log("In addMatchResultOrPrediction matchResultData looks like " +JSON.stringify(matchResultData));
    let match = "";
    for(let key in matchResultData){
        if(key = "matchID"){
            match = matchResultData[key]
        }
    }
    return dispatch => {
        dispatch( addMatchResultOrPredictionStart() );
        if(admin===true){
            //axios.post( 'https://react-my-burger-tam.firebaseio.com/matchResults.json', matchResultData)
            matchResultsFBRef.push({
                matchID: matchResultData.matchID,
                matchKickoff: matchResultData.matchKickoff,
                teamAName: matchResultData.teamAName,
                teamAScore: matchResultData.teamAScore,
                teamBName: matchResultData.teamBName,
                teamBScore: matchResultData.teamBScore
            })
            .then(response => {
                console.log("Do we get inside this? What does matchResultData look like" + JSON.stringify(response));
                dispatch(fetchPredictionsForCompletedMatch(matchResultData, token));
            })
            .catch(error => {
                dispatch(addMatchResultOrPredictionFail(error))
            })
        }
        else{
            if(!matchResultData.predictionID == ""){
                delete matchResultData["prediction"];
                console.log("jsonPayload looks like " + JSON.stringify(matchResultData));
                // axios.put('https://react-my-burger-tam.firebaseio.com/matchPredictions/' + matchResultData.predictionID + '.json?auth=' + token,
                //     matchResultData
                // )
                databaseRef.child('matchPredictions/' + matchResultData.predictionID).set({
                    matchID: matchResultData.matchID,
                    matchKickoff: matchResultData.matchKickoff,
                    teamAName: matchResultData.teamAName,
                    teamBName: matchResultData.teamBName,
                    teamAScore: matchResultData.teamAScore,
                    teamBScore: matchResultData.teamBScore,
                    userId: matchResultData.userId,
                    userName: matchResultData.userName
                })
                .then(response => {
                    console.log("response is " + JSON.stringify(response));
                    dispatch(addMatchResultOrPredictionSuccess(response));
                })
                .catch(error => {
                    console.log("Is this error that is getting thrown?" +error);
                    dispatch(addMatchResultOrPredictionFail(error));
                })
            }
            else{
                delete matchResultData["prediction"];
                //axios.post( 'https://react-my-burger-tam.firebaseio.com/matchPredictions.json?auth=' + token, matchResultData)
                matchPredictionsFBRef.push({
                    matchID: matchResultData.matchID,
                    matchKickoff: matchResultData.matchKickoff,
                    teamAName: matchResultData.teamAName,
                    teamBName: matchResultData.teamBName,
                    teamAScore: matchResultData.teamAScore,
                    teamBScore: matchResultData.teamBScore,
                    userId: matchResultData.userId,
                    userName: matchResultData.userName
                })
                .then(response => {
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

export const deleteMatchFromUpcomingMatches = (matchID, token) => {
    // console.log("Did we get in here?")
    // console.log("What does matchResultData look like " + JSON.stringify(matchResultData))
    // const matchID = matchResultData.matchID;
    //
    // console.log("What does match look like " + matchID);

    const deleteRequest =  upcomingMatchesFBRef.child(matchID).remove()
    return dispatch => {
        deleteRequest.then(
            //response => dispatch(fetchPredictionsForCompletedMatch(match, token))
            response => dispatch(addMatchResultOrPredictionSuccess())
        )
            .catch(
                err => dispatch(addMatchResultOrPredictionFail(err))
            )
    }
}

export const addMatchResultOrPredictionFail = (error) => {
    console.log("The error is " + error);
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_FAIL
    };
};

export const addMatchPredictionResultsFail = (response) => {
    return {
        type: actionTypes.ADD_MATCH_PREDICTION_RESULTS_FAIL
        // match: match
    };
};

export const addMatchResultOrPredictionSuccess = (response) => {
    return {
        type: actionTypes.ADD_MATCH_RESULT_OR_PREDICTION_SUCCESS
        // match: match
    };
};

// export const fetchPredictionsForCompletedMatch = (matchResultData, token) => {
//     console.log("matchResultData at fetchPredictionsForCompletedMatch looks like " + JSON.stringify(matchResultData))
//     let match = "";
//     for(let key in matchResultData){
//         if(key = "matchID"){
//             match = matchResultData[key]
//         }
//     }
//     const fetchedUserPredsForMatch = [];
//     const retrievePreds =  matchPredictionsFBRef.orderByChild("matchID").equalTo(match).once("value",
//         function(snapshot){
//             snapshot.forEach(function(snapshotChild){
//                 const item = snapshotChild.val();
//                 item.key = snapshotChild.key;
//                 fetchedUserPredsForMatch.push(item);
//             })
//         });
//     if(fetchedUserPredsForMatch.length == 0){
//         console.log("fetchedUserPredsForMatch length is " + fetchedUserPredsForMatch.length)
//         console.log("Pants mcClutchy");
//     }
//     if(fetchedUserPredsForMatch.length > 0){
//         return dispatch => {
//             retrievePreds.then(
//                 response =>
//                     dispatch(calculatePointsForCompletedMatch(matchResultData, fetchedUserPredsForMatch))
//             )
//                 .catch(
//                     err => dispatch(addMatchResultOrPredictionFail(err))
//                 )
//         }
//     }
//     else {
//         return dispatch => {
//             dispatch(deleteMatchFromUpcomingMatches());
//         }
//     }
//
// }

export const fetchPredictionsForCompletedMatch = (matchResultData, token) => {
    console.log("matchResultData at fetchPredictionsForCompletedMatch looks like " + JSON.stringify(matchResultData))
    let match = "";
    for(let key in matchResultData){
        if(key = "matchID"){
            match = matchResultData[key]
        }
    }
    const fetchedUserPredsForMatch = [];
    const retrievePreds =  matchPredictionsFBRef.orderByChild("matchID").equalTo(match).once("value",
        function(snapshot){
            snapshot.forEach(function(snapshotChild){
                const item = snapshotChild.val();
                item.key = snapshotChild.key;
                fetchedUserPredsForMatch.push(item);
            })
        });
    console.log("fetchedUserPredsForMatch are " + JSON.stringify(fetchedUserPredsForMatch));
    if(fetchedUserPredsForMatch.length == 0){
        console.log("fetchedUserPredsForMatch length is " + fetchedUserPredsForMatch.length)
    }
    return dispatch => {
            retrievePreds.then(
                response =>
                    dispatch(calculatePointsForCompletedMatch(matchResultData, fetchedUserPredsForMatch))
            )
                .catch(
                    err => dispatch(addMatchResultOrPredictionFail(err))
                )
        }

}


// export const fetchPredictionsForCompletedMatch = (match, token) => {
//     return dispatch => {
//         const queryParams = '?auth=' + token + '&orderBy="matchID"&equalTo="' + match + '"';
//         console.log("Match in fetchPredictionsForCompletedMatch is " + JSON.stringify(match));
//         axios.get('https://react-my-burger-tam.firebaseio.com/matchPredictions.json' + queryParams);
//     }
// }

export const calculatePointsForCompletedMatch = (completedMatchResult, userPredictions) => {
    console.log("userPredictions are " +JSON.stringify(userPredictions));
    console.log("userPredictions length is" +userPredictions.length);
    console.log("What does completed match result look like " + JSON.stringify(completedMatchResult))
    if(userPredictions.length > 0) {
        const predsResultsData = [];
        userPredictions.forEach(pred => {
            if ((pred.teamAScore === completedMatchResult.teamAScore) && (pred.teamBScore === completedMatchResult.teamBScore)) {
                predsResultsData.push({
                    matchID: pred.matchID,
                    teamAName: pred.teamAName,
                    teamBName: pred.teamBName,
                    predictedTeamAScore: pred.teamAScore,
                    predictedTeamBScore: pred.teamBScore,
                    actualTeamAScore: completedMatchResult.teamAScore,
                    actualTeamBScore: completedMatchResult.teamBScore,
                    predictionId: pred.key,
                    userId: pred.userId,
                    userName: pred.userName,
                    points: 5
                })
            }
            else if ((Math.sign(completedMatchResult.teamAScore - completedMatchResult.teamBScore)) === (Math.sign(pred.teamAScore - pred.teamBScore))) {
                predsResultsData.push({
                    matchID: pred.matchID,
                    teamAName: pred.teamAName,
                    teamBName: pred.teamBName,
                    predictedTeamAScore: pred.teamAScore,
                    predictedTeamBScore: pred.teamBScore,
                    actualTeamAScore: completedMatchResult.teamAScore,
                    actualTeamBScore: completedMatchResult.teamBScore,
                    predictionId: pred.key,
                    userId: pred.userId,
                    userName: pred.userName,
                    points: 2
                })
            }
            else {
                predsResultsData.push({
                    matchID: pred.matchID,
                    teamAName: pred.teamAName,
                    teamBName: pred.teamBName,
                    predictedTeamAScore: pred.teamAScore,
                    predictedTeamBScore: pred.teamBScore,
                    actualTeamAScore: completedMatchResult.teamAScore,
                    actualTeamBScore: completedMatchResult.teamBScore,
                    predictionId: pred.key,
                    userId: pred.userId,
                    userName: pred.userName,
                    points: 0
                })
            }

        });
        return dispatch => {
            dispatch(addMatchPredictionResults(predsResultsData));
        }
    }
    else{
            return dispatch => {
                dispatch(deleteMatchFromUpcomingMatches(completedMatchResult.matchID));
            }
        }

}


// export const addMatchPredictionResults = (predsResultsData) => {
//     console.log("Preds result data at addMatchPredictionResults is " + JSON.stringify(predsResultsData))
//     const pushMatchPredictionResults = predsResultsData.forEach(pr => matchPredictionResultsFBRef.push(pr));
//     return dispatch => {
//         Promise.all(pushMatchPredictionResults).then(
//             //dispatch(addMatchResultOrPredictionSuccess())
//             dispatch(deleteCompletedPredictions(predsResultsData))
//         )
//             .catch(
//                 error => dispatch(addMatchResultOrPredictionFail(error))
//             )
//     }
// }

export const addMatchPredictionResults = (predsResultsData) => {
    // assuming that matchPredictionResultsFBRef.push() returns a Promise!
    const promises = predsResultsData.map(pr => matchPredictionResultsFBRef.push(pr));

    return dispatch => {
        Promise.all(promises)
            .then(
                dispatch(deleteCompletedPredictions(predsResultsData))
            )
            .catch(
                error => dispatch(addMatchPredictionResultsFail(error))
            );
    }
}

export const deleteCompletedPredictions = (predsResultsData) => {
    const promises =predsResultsData.map(pr => {
            matchPredictionsFBRef.child(pr.predictionId).remove()
        }
    );
    return dispatch => {
        Promise.all(promises)
            .then(
                dispatch(deleteMatchFromUpcomingMatches(predsResultsData[0].matchID))
            )
            .catch(
                error => dispatch(deleteCompletedPredictionFail(error))
            )
    }
}

// export const deleteCompletedPredictions = (predsResultsData) => {
//     const deleteCompletedPredictionsRequest = Promise.all(predsResultsData.forEach(pr => {
//         matchPredictionsFBRef.child(pr.predictionId).remove()
//         }
//     ));
//     return dispatch => {
//             deleteCompletedPredictionsRequest.then(
//                 dispatch(deleteMatchFromUpcomingMatches(predsResultsData))
//         )
//         .catch(
//             error => dispatch(deleteCompletedPredictionFail(error))
//         )
//     }
// }

export const deleteCompletedPredictionFail = (error) => {
    console.log("The error is " + error);
    return {
        type: actionTypes.DELETE_COMPLETED_PREDICTION_FAIL
    };
};

export const addUpcomingMatch = (upcomingMatch) => {
    return dispatch => {
        upcomingMatchesFBRef.push({
            matchKickoff: upcomingMatch.matchKickoff,
            teamAName: upcomingMatch.teamAName,
            teamBName: upcomingMatch.teamBName
        })
        .then( response => {
            dispatch(addUpcomingMatchSuccess());
        } )
        .catch( error => {
            dispatch(addUpcomingMatchFail(error));
        } );
    }
}

export const addUpcomingMatchSuccess = (res) => {
    return {
        type: actionTypes.ADD_UPCOMING_MATCH_SUCCESS
    };
}

export const addUpcomingMatchFail = (res) => {
    return {
        type: actionTypes.ADD_UPCOMING_MATCH_FAIL
    };
}