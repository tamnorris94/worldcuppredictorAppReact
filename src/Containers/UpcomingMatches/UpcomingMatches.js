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
         inputtingResult: false
     }

    componentDidMount(){
        this.props.onFetchUpcomingMatches();
    }

   addInitInputMatchResultHandler = (id, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId) => {
        this.setState({
            inputtingResult: true
        })
       console.log("What is the state of admin " +this.props.admin);
       if(this.props.admin){
           this.props.onAddMatchResultInit( id, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId);
       }
       else
           this.props.onAddMatchPredictionInit(id, teamAName, teamBName, teamAScore, matchKickoff, userId);
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

        let upcomingmatches = <p style={{textAlign: 'center'}}>Loading...!</p>;
        if(!this.props.loading && !this.props.error){
            upcomingmatches = this.props.upcmgMatches.map(upcomingMatch => {
                    return <UpcomingMatch
                        key={upcomingMatch.id}
                        teamA={upcomingMatch.teamA}
                        teamB={upcomingMatch.teamB}
                        matchKickoff={upcomingMatch.matchKickoff}
                        clicked={() => this.addInitInputMatchResultHandler(upcomingMatch.id, upcomingMatch.teamA, upcomingMatch.teamB, upcomingMatch.matchKickoff)}
                    />
            });
        }
        else {
            upcomingmatches = <p style={{textAlign: 'center'}}>Oops something went wrong, so pack a big bong!</p>;
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
                {upcomingmatches}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUpcomingMatches: () => dispatch(actions.fetchUpcomingMatches()),
        onAddMatchResultInit: (matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId ) => dispatch(actions.initAddMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff)),
        onAddMatchPredictionInit: (matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId ) => dispatch(actions.initAddMatchPrediction(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId)),
    }
}

const mapStateToProps = state => {
    return {
        upcmgMatches: state.upcomingMatches.upcmgMatches,
        loading: state.upcomingMatches.loading,
        error: state.upcomingMatches.error,
        selectedMatchForUpd: state.matchResultInput.selectedMatchForUpd,
        selectedMatchForUpd: state.matchPredictionsInput.selectedMatchForUpd,
        inputtingResult: state.matchResultInput.inputtingResult,
        inputtingResult: state.matchPredictionsInput.inputtingResult,
        admin: state.auth.admin,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( UpcomingMatches );