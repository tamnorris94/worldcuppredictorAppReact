import React, { Component } from 'react';
import AddResultForCompletedMatch from "../MatchResultInput/MatchResultInput";
import axios from "../../axios-wcpredict";

class AddResultsToCompletedMatches extends Component {

    state = {
        upcomingMatches: [],
        loading: true
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

    render() {
        return (
            <div>
                {this.state.upcomingMatches.map(upcomingMatch => (
                    <AddResultForCompletedMatch
                        key={upcomingMatch.id}
                        teamA={upcomingMatch.teamA}
                        teamB={upcomingMatch.teamB}
                        matchKickoff={upcomingMatch.matchKickoff}/>
                ))}
            </div>
        );
    }
}

export default AddResultsToCompletedMatches;