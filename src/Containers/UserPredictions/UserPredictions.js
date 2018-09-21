import React, { Component } from 'react';
import UserPrediction from "./UserPrediction/UserPrediction";
import { connect } from 'react-redux';
import Aux from "../../Hoc/Auxiliary/Auxiliary";
import * as actions from '../../Store/actions/index';

class UserPredictions extends Component {

    componentDidMount() {
        console.log("Does componentDidMount get run in UserPredictions?")
        this.props.onFetchPredictions(this.props.token, this.props.userId);
    }

    render() {

        let userPredictions = <p style={{textAlign: 'center'}}>Loading...!</p>;
        if (!this.props.loading && !this.props.error) {
            userPredictions = this.props.userPredictions.map(userPrediction => {
                return <UserPrediction
                    key={userPrediction.id}
                    teamA={userPrediction.teamAName}
                    teamB={userPrediction.teamBName}
                    matchKickoff={userPrediction.matchKickoff}
                    teamAResult={userPrediction.teamAScore}
                    teamBResult={userPrediction.teamBScore}
                />
            });
        }
        else {
            userPredictions = <p style={{textAlign: 'center'}}>Oops something went wrong, so pack a big bong!</p>;
        }

        return (
            <Aux>
                {userPredictions}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPredictions: (token, userId) => dispatch(actions.fetchUserPredictions(token, userId))
    }
}

const mapStateToProps = state => {
    return {
        userPredictions: state.userPredictions.userPredictions,
        loading: state.userPredictions.loading,
        error: state.userPredictions.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( UserPredictions );