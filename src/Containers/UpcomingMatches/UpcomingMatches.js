import React, { Component } from 'react';
import UpcomingMatch from "./UpcomingMatch/UpcomingMatch";
import MatchResultInput from "../MatchResultInput/MatchResultInput";
import axios from "../../axios-wcpredict";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../../Hoc/Auxiliary/Auxiliary";

class UpcomingMatches extends Component {

    state = {
        selectedMatchId: null,
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

    matchSelectHandler = (id) => {
        console.log("Does the select handler get called?");
        this.setState({
            selectedMatchId: id,
            inputtingResult: true
        })
        console.log("Selected match id " + this.state.selectedMatchId);
    }

    cancelResultInputHandler = () => {
        this.setState( {inputtingResult : false} )
    }

    addResultInputHandler = () => {

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
                        clicked={() => this.matchSelectHandler(upcomingMatch.id)}
                    />
            });
        }

        if(!this.state.error && this.state.selectedMatchId){
            matchResultInput = <MatchResultInput id={this.state.selectedMatchId}
                                                 resultInputCancelHandler={this.cancelResultInputHandler}
                                                 addMatchResult={this.addResultInputHandler}/>
        }

        // return (
        //
        //     <div>
        //         <section>
        //             {upcomingmatches}
        //         </section>
        //         <section>
        //             <MatchResultInput id={this.state.selectedMatchId}/>
        //         </section>
        //     </div>
        // );

        return (
            <Aux>
                <Modal show={this.state.inputtingResult} modalClosed={this.purchaseCancelHandler}>
                    {matchResultInput}
                </Modal>
                {upcomingmatches}
            </Aux>
        );
    }
}

export default UpcomingMatches;