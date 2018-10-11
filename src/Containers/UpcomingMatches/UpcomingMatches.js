import React, { Component } from 'react';
import UpcomingMatch from "./UpcomingMatch/UpcomingMatch";
import  MatchResultInput from "../MatchResultInput/MatchResultInput2";
import axios from "../../axios-wcpredict";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../../Hoc/Auxiliary/Auxiliary";
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';

class UpcomingMatches extends Component {

    state = {
        inputtingResult: false,
        matchesPredictionsArray: [],
        matchPredsArrayCheck: false
    }

    componentDidMount(){
        this.props.onFetchUpcomingAndPredictions(this.props.admin, this.props.token, this.props.userId);
    }

    addInitMatchPredictionHandler = (matchPred) => {
        console.log("State of matchPred at addInitMatchPredictionHandler" + JSON.stringify(matchPred));
        this.setState({
            inputtingResult: true
        })
        this.props.onAddMatchPredictionInit( matchPred);
    }

    initUpdateMatchPredictionHandler = (matchPred) => {
        console.log("State of matchPred at initUpdateMatchPredictionHandler" + JSON.stringify(matchPred));
        this.setState({
            inputtingResult: true
        })
        this.props.onUpdateMatchPredictionInit( matchPred);

    }


    addMatchResultInput = () => {
        this.setState({
            inputtingResult: false
        })
    }

    resultSubmitHandler = () => {
        this.setState({
            inputtingResult: false
        })
    }

    cancelResultInputHandler = () => {
        this.setState( {inputtingResult : false} )
    }

    addResultInputHandler = (teamAScore, teamBScore) => {
        this.setState = {
            teamAScore: teamAScore,
            teamBScore: teamBScore
        }
    }

    render() {
        let matchResultInput = null;
        let matchesPredictions = <p style={{textAlign: 'center'}}>Loading...!</p>;

        if(!this.props.loading && !this.props.error){
            matchesPredictions = this.props.matchesPredictions.map(matchPred => {
                return <UpcomingMatch
                    key={matchPred.id}
                    teamAName={matchPred.teamAName}
                    teamBName={matchPred.teamBName}
                    matchKickoff={matchPred.matchKickoff}
                    teamAScore={matchPred.teamAScore}
                    teamBScore={matchPred.teamBScore}
                    prediction={matchPred.prediction}
                    predictionID={matchPred.predictionID}
                    addMatchPrediction={() => this.addInitMatchPredictionHandler(matchPred)}
                    updateMatchPrediction={() => this.initUpdateMatchPredictionHandler(matchPred)}
                />
            });
        }
        else{
            matchesPredictions = <p style={{textAlign: 'center'}}>Oops something went wrong, so pack a big bong!</p>;
        }

        if(this.props.selectedMatchForUpd){
            matchResultInput = <MatchResultInput id={this.props.selectedMatchForUpd.matchID}
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

const checkIfMatchInPredictions = (match, preds) =>{
    let exists = false;
    let i;
    let matchID = match.id;
    let cyclesThroughForLoop = 0;
    for(i=0;i<preds.length; i++){
        let predsMatchID = preds[i].matchID;
        cyclesThroughForLoop++;
        if(matchID === predsMatchID){
            exists = true;
            break;
        }
    }
    if(exists){

        this.state.matchesPredictionsArray.push({
            ...preds[i],
            prediction: true
        })
    }
    else {
        this.state.matchesPredictionsArray.push({
            ...match,
            prediction: false
        })
    }
    this.setState({
        matchPredsArrayCheck: true
    })
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUpcomingAndPredictions: (admin, token, userId) => dispatch(actions.fetchUpcomingAndPredictions(admin, token, userId)),
        onAddMatchPredictionInit: (matchPred ) => dispatch(actions.initAddMatchResultOrPrediction(matchPred)),
        onUpdateMatchPredictionInit: (matchPred ) => dispatch(actions.initUpdatePrediction(matchPred))
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
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( UpcomingMatches );