import React, { Component } from 'react';
import CompletedMatch from "./CompletedMatch/CompletedMatch";
import { connect } from 'react-redux';
import Aux from "../../Hoc/Auxiliary/Auxiliary";
import * as actions from '../../Store/actions/index';

class CompletedMatches extends Component {

    componentDidMount() {
        this.props.onFetchCompletedMatches();
    }

    render() {

        let completedmatches = <p style={{textAlign: 'center'}}>Loading...!</p>;
        if (!this.props.loading && !this.props.error) {
            completedmatches = this.props.completedMatches.map(completedMatch => {
                return <CompletedMatch
                    key={completedMatch.id}
                    teamAName={completedMatch.teamAName}
                    teamBName={completedMatch.teamBName}
                    matchKickoff={completedMatch.matchKickoff}
                    teamAScore={completedMatch.teamAScore}
                    teamBScore={completedMatch.teamBScore}
                />
            });
        }
        else {
            completedmatches = <p style={{textAlign: 'center'}}>Oops something went wrong, so pack a big bong!</p>;
        }

        return (
            <Aux>
                {completedmatches}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCompletedMatches: () => dispatch(actions.fetchCompletedMatches()),
    }
}

const mapStateToProps = state => {
    return {
        completedMatches: state.completedMatches.completedMatches,
        loading: state.completedMatches.loading,
        error: state.completedMatches.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( CompletedMatches );