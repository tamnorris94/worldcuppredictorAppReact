import React, { Component } from 'react';
import UpcomingRugbyMatch from "./UpcomingRugbyMatch/UpcomingRugbyMatch";
import  RugbyMatchPredResInput from "../RugbyMatchPredResInput/RugbyMatchPredResInput";
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../../Hoc/Auxiliary/Auxiliary";
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import axios from '../../axios-wcpredict';

export class UpcomingRugbyMatches extends Component {

    state = {
        inputtingResult: false,
        matchesPredictionsArray: [],
        matchPredsArrayCheck: false,
        error: false
    }

    componentDidMount(){
        this.props.onFetchUpcomingAndPredictions(this.props.admin, this.props.token, this.props.userId);
    }

    addInitMatchPredictionHandler = (matchPred) => {
        let matchPredKickOff = new Date(matchPred.matchKickoff).getTime();
        let currentDateTime = new Date().getTime();
        this.setState({
            error: false
        })

        if(!this.props.isAuth){
            this.props.onSetAuthRedirectPath('/auth');
            this.props.history.push('/auth');
        }
        else{
            if(currentDateTime > matchPredKickOff){
                this.setState({
                    error: true
                })
            }
            this.setState({
                inputtingResult: true
            })
            if(this.props.admin){
                this.props.onAddMatchResult( matchPred);
            }
            else{
                this.props.onAddMatchPrediction(matchPred);
            }
        }
    }

    initUpdateMatchPredictionHandler = (matchPred) => {
        this.setState({
            inputtingResult: true
        })
        this.props.onUpdateMatchPredictionInit( matchPred);
    }

    addMatchResultInput = () => {
        //console.log("addMatchResultInput : State of inputting result before is " + this.state.inputtingResult);
        this.setState({inputtingResult: false })
        const resultPredictionData = {
            winningTeam: this.props.winningTeam,
            winningMargin: this.props.winningMargin,
            matchID: this.props.selectedMatchForUpdate.matchID,
            matchKickoff: this.props.selectedMatchForUpdate.matchKickoff,
            teamAName: this.props.selectedMatchForUpdate.teamAName,
            teamBName: this.props.selectedMatchForUpdate.teamBName,
            predictionID: this.props.selectedMatchForUpdate.predictionID,
            userId: this.props.userId,
            userName: this.props.userName
        }
        //console.log("addMatchResultInput : State of inputting result after is " + this.state.inputtingResult);
        this.props.onSubmitMatchResultOrPrediction(resultPredictionData, this.props.admin);
        //this.props.history.push('/upcomingmatches');
    }

    cancelResultInputHandler = () => {
        this.props.onInputResultOrPredCancel();

    }

    render() {
        let matchResultInput = null;
        let matchesPredictions = <p style={{textAlign: 'center'}}>Loading...!</p>;
        //console.log("Inside render of UpcomingRugbyMatch " + JSON.stringify(this.props.matchesPredictions));

        if(!this.props.loading && !this.props.error){
            matchesPredictions = this.props.matchesPredictions.map(matchPred => {
                return <UpcomingRugbyMatch
                    key={matchPred.id}
                    teamAName={matchPred.teamAName}
                    teamBName={matchPred.teamBName}
                    matchKickoff={matchPred.matchKickoff}
                    teamAScore={matchPred.teamAScore}
                    teamBScore={matchPred.teamBScore}
                    prediction={matchPred.prediction}
                    predictedWinningMargin={matchPred.predictedWinningMargin}
                    predictedWinningTeam={matchPred.predictedWinningTeam}
                    predictionID={matchPred.predictionID}
                    addMatchPrediction={() => this.addInitMatchPredictionHandler(matchPred)}
                    //updateMatchPrediction={() => this.initUpdateMatchPredictionHandler(matchPred)}
                />
            });
        }

        if(this.props.selectedMatchForUpd){
            matchResultInput = <RugbyMatchPredResInput id={this.props.selectedMatchForUpd.matchID}
                                                 resultInputCancel={this.cancelResultInputHandler}
                                                 resultSubmitted={this.addMatchResultInput}
            />
        }

        return (
            <Aux>
                <Modal show={this.props.inputtingResult} modalClosed={this.cancelResultInputHandler}>
                    {matchResultInput}
                </Modal>
                {matchesPredictions}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUpcomingAndPredictions: (admin, token, userId) => dispatch(actions.fetchUpcomingAndPredictions(admin, token, userId)),
        //onAddMatchPredictionInit: (matchPred ) => dispatch(actions.initAddMatchResultOrPrediction(matchPred)),
        onSubmitMatchResultOrPrediction: (matchResultData, admin) => dispatch(actions.submitMatchResultOrPrediction(matchResultData, admin)),
        onAddMatchResult: (matchPred ) => dispatch(actions.initAddMatchResult(matchPred)),
        onAddMatchPrediction: (matchPred) => dispatch(actions.initAddMatchPrediction(matchPred)),
        onUpdateMatchPredictionInit: (matchPred ) => dispatch(actions.initUpdatePrediction(matchPred)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onInputResultOrPredCancel: () => dispatch(actions.cancelMatchResultPredInput())
    }
}

const mapStateToProps = state => {
    return {
        matchesPredictions: state.upcomingMatches.matchesPredictions,
        loading: state.upcomingMatches.loading,
        error: state.upcomingMatches.error,
        selectedMatchForUpd: state.upcomingMatches.selectedMatchForUpd,
        inputtingResult: state.upcomingMatches.inputtingResult,
        admin: state.auth.admin,
        userId: state.auth.userId,
        userName: state.auth.userName,
        token: state.auth.token,
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(UpcomingRugbyMatches, axios));