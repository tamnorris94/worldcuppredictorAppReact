import React, { Component } from 'react';
import UpcomingMatch from "./UpcomingMatch/UpcomingMatch";
import MatchResultInput from "../MatchResultInput/MatchResultInput";
import axios from "../../axios-wcpredict";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../../Hoc/Auxiliary/Auxiliary";

class UpcomingMatches extends Component {

    state = {
        selectedMatchId: null,
        selectedMatchTeamAName: "England",
        selectedMatchTeamBName: "Colombia",
        teamAScore: null,
        teamBScore: null,
        upcomingMatches: [],
        loading: true,
        error: false,
        inputtingResult: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-tam.firebaseio.com/upcomingmatches.json')
            .then(resp => {
                const fetchedUpcomingMmatches = [];
                for (let key in resp.data) {
                    fetchedUpcomingMmatches.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, upcomingMatches: fetchedUpcomingMmatches});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    matchSelectHandler = (id, teamA, teamB) => {
        console.log("Team A Match name is " + teamA);
        this.setState({
            selectedMatchId: id,
            selectedMatchTeamA: teamA,
            selectedMatchTeamB: teamB,
            inputtingResult: true
        })
        console.log("Selected match id " + id);
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

        let upcomingmatches = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error){
            upcomingmatches = this.state.upcomingMatches.map(upcomingMatch => {
                    return <UpcomingMatch
                        key={upcomingMatch.id}
                        teamA={upcomingMatch.teamA}
                        teamB={upcomingMatch.teamB}
                        matchKickoff={upcomingMatch.matchKickoff}
                        clicked={() => this.matchSelectHandler(upcomingMatch.id, upcomingMatch.teamA, upcomingMatch.teamB)}
                    />
            });
        }

        if(!this.state.error && this.state.selectedMatchId){
            matchResultInput = <MatchResultInput id={this.state.selectedMatchId}
                                                 teamA={this.state.selectedMatchTeamA}
                                                 teamB={this.state.selectedMatchTeamB}
                                                 resultInputCancel={this.cancelResultInputHandler}
                                                 addResult={() => this.addResultInputHandler}/>
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

export default UpcomingMatches;