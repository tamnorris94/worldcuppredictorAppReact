// import React, { Component } from 'react';
// import UpcomingMatch from "./UpcomingMatch/UpcomingMatch";
// import  MatchResultInput from "../MatchResultInput/MatchResultInput2";
// import Modal from "../../Components/UI/Modal/Modal";
// import Aux from "../../Hoc/Auxiliary/Auxiliary";
// import * as actions from '../../Store/actions/index';
// import { connect } from 'react-redux';
//
// class UpcomingMatches extends Component {
//
//     state = {
//         inputtingResult: false,
//         matchesPredictionsArray: [],
//         matchPredsArrayCheck: false,
//         error: false
//     }
//
//     componentDidMount(){
//         this.props.onFetchUpcomingAndPredictions(this.props.admin, this.props.token, this.props.userId);
//     }
//
//     // componentDidUpdate(){
//     //     this.props.onFetchUpcomingAndPredictions(this.props.admin, this.props.token, this.props.userId);
//     // }
//
//     // addInitMatchPredictionHandler = (matchPred) => {
//     //     this.setState({
//     //         inputtingResult: true
//     //     })
//     //     if(this.props.admin){
//     //         this.props.onAddMatchResult( matchPred);
//     //     }
//     //     else{
//     //         this.props.onAddMatchPrediction(matchPred);
//     //     }
//     // }
//
//     // addInitMatchPredictionHandler = (matchPred) => {
//     //     if(!this.props.isAuth){
//     //         this.props.onSetAuthRedirectPath('/auth');
//     //         this.props.history.push('/auth');
//     //     }
//     //     else{
//     //         this.setState({
//     //             inputtingResult: true
//     //         })
//     //         if(this.props.admin){
//     //             this.props.onAddMatchResult( matchPred);
//     //         }
//     //         else{
//     //             this.props.onAddMatchPrediction(matchPred);
//     //         }
//     //     }
//     // }
//
//     addInitMatchPredictionHandler = (matchPred) => {
//         let matchPredKickOff = new Date(matchPred.matchKickoff).getTime();
//         let currentDateTime = new Date().getTime();
//         console.log("Current date is " + currentDateTime);
//         console.log("Match kickoff date is " + matchPredKickOff);
//         this.setState({
//             error: false
//         })
//
//         if(!this.props.isAuth){
//             this.props.onSetAuthRedirectPath('/auth');
//             this.props.history.push('/auth');
//         }
//         else{
//             if(currentDateTime > matchPredKickOff){
//                 this.setState({
//                     error: true
//                 })
//             }
//             this.setState({
//                 inputtingResult: true
//             })
//             if(this.props.admin){
//                 this.props.onAddMatchResult( matchPred);
//             }
//             else{
//                 this.props.onAddMatchPrediction(matchPred);
//             }
//         }
//     }
//
//     initUpdateMatchPredictionHandler = (matchPred) => {
//         this.setState({
//             inputtingResult: true
//         })
//         this.props.onUpdateMatchPredictionInit( matchPred);
//
//     }
//
//
//     addMatchResultInput = () => {
//         this.setState({
//             inputtingResult: false
//         })
//         this.props.history.push('/upcomingmatches');
//     }
//
//     cancelResultInputHandler = () => {
//         this.setState( {inputtingResult : false} )
//     }
//
//     render() {
//         let matchResultInput = null;
//         let matchesPredictions = <p style={{textAlign: 'center'}}>Loading...!</p>;
//
//         if(!this.props.loading && !this.props.error){
//             matchesPredictions = this.props.matchesPredictions.map(matchPred => {
//                 return <UpcomingMatch
//                     key={matchPred.id}
//                     teamAName={matchPred.teamAName}
//                     teamBName={matchPred.teamBName}
//                     matchKickoff={matchPred.matchKickoff}
//                     teamAScore={matchPred.teamAScore}
//                     teamBScore={matchPred.teamBScore}
//                     prediction={matchPred.prediction}
//                     predictionID={matchPred.predictionID}
//                     addMatchPrediction={() => this.addInitMatchPredictionHandler(matchPred)}
//                     //updateMatchPrediction={() => this.initUpdateMatchPredictionHandler(matchPred)}
//                 />
//             });
//         }
//
//
//         if(this.props.selectedMatchForUpd){
//             // if(!this.state.error){
//             //     matchResultInput = <MatchResultInput id={this.props.selectedMatchForUpd.matchID}
//             //                                          resultInputCancel={this.cancelResultInputHandler}
//             //                                          resultSubmitted={this.addMatchResultInput}
//             //     />
//             // }
//             // else{
//             //     matchResultInput = <p>Match has already been played</p>
//             // }
//             matchResultInput = <MatchResultInput id={this.props.selectedMatchForUpd.matchID}
//                                          resultInputCancel={this.cancelResultInputHandler}
//                                          resultSubmitted={this.addMatchResultInput}
//                                 />
//         }
//
//         return (
//             <Aux>
//                 <Modal show={this.props.inputtingResPrediction} modalClosed={this.cancelResultInputHandler}>
//                     {matchResultInput}
//                 </Modal>
//                 {matchesPredictions}
//             </Aux>
//         );
//     }
// }
//
// // const checkIfMatchInPredictions = (match, preds) =>{
// //     let exists = false;
// //     let i;
// //     let matchID = match.id;
// //     let cyclesThroughForLoop = 0;
// //     for(i=0;i<preds.length; i++){
// //         let predsMatchID = preds[i].matchID;
// //         cyclesThroughForLoop++;
// //         if(matchID === predsMatchID){
// //             exists = true;
// //             break;
// //         }
// //     }
// //     if(exists){
// //
// //         this.state.matchesPredictionsArray.push({
// //             ...preds[i],
// //             prediction: true
// //         })
// //     }
// //     else {
// //         this.state.matchesPredictionsArray.push({
// //             ...match,
// //             prediction: false
// //         })
// //     }
// //     this.setState({
// //         matchPredsArrayCheck: true
// //     })
// // };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchUpcomingAndPredictions: (admin, token, userId) => dispatch(actions.fetchUpcomingAndPredictions(admin, token, userId)),
//         //onAddMatchPredictionInit: (matchPred ) => dispatch(actions.initAddMatchResultOrPrediction(matchPred)),
//         onAddMatchResult: (matchPred ) => dispatch(actions.initAddMatchResult(matchPred)),
//         onAddMatchPrediction: (matchPred) => dispatch(actions.initAddMatchPrediction(matchPred)),
//         onUpdateMatchPredictionInit: (matchPred ) => dispatch(actions.initUpdatePrediction(matchPred)),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }
//
// const mapStateToProps = state => {
//     return {
//         matchesPredictions: state.upcomingMatches.matchesPredictions,
//         loading: state.upcomingMatches.loading,
//         error: state.upcomingMatches.error,
//         selectedMatchForUpd: state.upcomingMatches.selectedMatchForUpd,
//         inputtingResult: state.upcomingMatches.inputtingResult,
//         admin: state.auth.admin,
//         userId: state.auth.userId,
//         userName: state.auth.userName,
//         token: state.auth.token,
//         isAuth: state.auth.token !== null
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)( UpcomingMatches );