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
        // axios.get('https://react-my-burger-tam.firebaseio.com/upcomingmatches.json')
        //     .then(resp => {
        //         const fetchedUpcomingMmatches = [];
        //         for (let key in resp.data) {
        //             fetchedUpcomingMmatches.push({
        //                 ...resp.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, upcomingMatches: fetchedUpcomingMmatches});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });
        console.log("Upcoming Matches component did mount");
        this.props.onFetchUpcomingMatches();
    }

    // matchSelectHandler = (id, teamA, teamB) => {
    //     console.log("Team A Match name is " + teamA);
    //     this.setState({
    //         selectedMatchId: id,
    //         selectedMatchTeamA: teamA,
    //         selectedMatchTeamB: teamB,
    //         inputtingResult: true
    //     })
    //     console.log("Selected match id " + id);
    // }
    //this function executes when one of the upcoming matches is clicked on. inputtingResult is set to true.
    addInitInputMatchResultHandler = (id, teamAName, teamBName, teamAScore, teamBScore) => {
        this.setState({
            inputtingResult: true
        })
        //this.addMatchResultInput(id, teamAName, teamBName, teamAScore, teamBScore);
        //console.log("What is the state of inputtingResult "+ this.state.inputtingResult);
        this.props.onAddMatchResultInit( id, teamAName, teamBName, teamAScore, teamBScore);
    }

    addMatchResultInput = () => {
        this.setState({
            inputtingResult: false
        })
        //this.props.onAddMatchResult( id, teamAName, teamBName, teamAScore, teamBScore);
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
        console.log("So this gets called right?");
        this.setState = {
            teamAScore: teamAScore,
            teamBScore: teamBScore
        }
        console.log("TeamB Score is " + this.state.teamBScore);
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
                        clicked={() => this.addInitInputMatchResultHandler(upcomingMatch.id, upcomingMatch.teamA, upcomingMatch.teamB)}
                    />
            });
        }
        else {
            upcomingmatches = <p style={{textAlign: 'center'}}>Oops something went wrong, so pack a big bong!</p>;
        }

        if(this.props.selectedMatchForUpd){
            matchResultInput = <MatchResultInput id={this.props.selectedMatchForUpd.matchID}
                                                 teamA={this.props.selectedMatchForUpd.teamAName}
                                                 teamB={this.props.selectedMatchForUpd.teamBName}
                                                 resultInputCancel={this.cancelResultInputHandler}
                                                 resultSubmitted={this.addMatchResultInput}
                                                 />
        }

        return (
            <Aux>
                <Modal show={this.state.inputtingResult} modalClosed={this.cancelResultInputHandler}>
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
        onAddMatchResultInit: (matchID, teamAName, teamBName, teamAScore, teamBScore ) => dispatch(actions.initAddMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore))
    }
}

const mapStateToProps = state => {
    return {
        upcmgMatches: state.upcomingMatches.upcmgMatches,
        loading: state.upcomingMatches.loading,
        error: state.upcomingMatches.error,
        selectedMatchForUpd: state.matchResultInput.selectedMatchForUpd
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( UpcomingMatches );