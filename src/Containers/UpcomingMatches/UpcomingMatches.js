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

    addInitInputMatchResultHandler = (id, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId) => {
        this.setState({
            inputtingResult: true
        })
        console.log("What is the state of admin " +this.props.admin);
        this.props.onAddMatchResultInit( id, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId);

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

        console.log("upcoming matches : " +JSON.stringify(this.props.upcmgMatches));
        console.log("Predictions : " +JSON.stringify(this.props.userPredictions));

        // if(!this.props.loading && !this.props.error){
        //     upcomingmatches = this.props.upcmgMatches.forEach(upcomingMatch => checkIfMatchInPredictions(upcomingMatch, this.props.userPredictions));
        // }
        // if(this.state.matchPredsArrayCheck){
        //     upcomingmatches = this.state.matchesPredictionsArray.map(upcomingMatch => {
        //         return <UpcomingMatch
        //             key={upcomingMatch.id}
        //             teamA={upcomingMatch.teamA}
        //             teamB={upcomingMatch.teamB}
        //             matchKickoff={upcomingMatch.matchKickoff}
        //             clicked={() => this.addInitInputMatchResultHandler(upcomingMatch.id, upcomingMatch.teamA, upcomingMatch.teamB, upcomingMatch.matchKickoff)}
        //             //clicked={() => this.addInitInputMatchResultHandler(upcomingMatch)}
        //         />
        //     });
        // }
        if(!this.props.loading && !this.props.error){
            upcomingmatches = this.props.upcmgMatches.map(upcomingMatch => {
                return <UpcomingMatch
                    key={upcomingMatch.id}
                    teamA={upcomingMatch.teamA}
                    teamB={upcomingMatch.teamB}
                    matchKickoff={upcomingMatch.matchKickoff}
                    clicked={() => this.addInitInputMatchResultHandler(upcomingMatch.id, upcomingMatch.teamA, upcomingMatch.teamB, upcomingMatch.matchKickoff)}
                    //clicked={() => this.addInitInputMatchResultHandler(upcomingMatch)}
                />
            });
        }
        else{
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
        onAddMatchResultInit: (matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId ) => dispatch(actions.initAddMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff)),
    }
}

const mapStateToProps = state => {
    return {
        upcmgMatches: state.upcomingMatches.upcmgMatches,
        userPredictions: state.upcomingMatches.userPredictions,
        loading: state.upcomingMatches.loading,
        error: state.upcomingMatches.error,
        selectedMatchForUpd: state.matchResultInput.selectedMatchForUpd,
        inputtingResult: state.matchResultInput.inputtingResult,
        admin: state.auth.admin,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( UpcomingMatches );