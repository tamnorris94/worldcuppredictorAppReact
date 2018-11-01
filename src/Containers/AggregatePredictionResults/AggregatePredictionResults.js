import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import Aux from "../../Hoc/Auxiliary/Auxiliary";
import UserAggPredictionResult from './UserAggPredictionResult/UserAggPredictionResult';
import UserPredResultsHistory from '../../Components/UserPredResultsHistory/UserPredResultsHistory';
import Modal from "../../Components/UI/Modal/Modal";

class AggregatePredictionResults extends Component {

    state = {
        displayingUserPredResults : false
    }

    componentDidMount(){
        this.props.onFetchPredictionResults();
    }

    initDisplayUserPredictionResults = (userId) => {
        this.setState({displayingUserPredResults: true})
        this.props.onDisplayUserPredictionResults(userId);
    }

    cancelDisplayUserPredResultsHandler = () => {
        this.setState({displayingUserPredResults: false})
    }

    render () {
        let aggPredictionResults = <p style={{textAlign: 'center'}}>Loading...!</p>;
        console.log("Agg preds results are " +JSON.stringify(this.props.aggPredictionResults));

        if(!this.props.loading && !this.props.error){
            aggPredictionResults = this.props.aggPredictionResults.map(apr => {
                return <UserAggPredictionResult
                key={apr.userId}
                userId={apr.userId}
                userName={apr.userName}
                points={apr.points}
                displayPredictionResultsForUser={() => this.initDisplayUserPredictionResults(apr.userId)}/>
            })
        }

        let userPredResultsHistory = null;

        if(this.props.displayingUserPredResults){
            userPredResultsHistory = <UserPredResultsHistory userPredResults={this.props.userPredResults}  />
        }

        return (
            <Aux>
                <Modal show={this.state.displayingUserPredResults} modalClosed={this.cancelDisplayUserPredResultsHandler}>
                    {userPredResultsHistory}
                </Modal>
                {aggPredictionResults}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        aggPredictionResults: state.predictionResults.aggPredictionResults,
        loading: state.predictionResults.loading,
        error: state.predictionResults.error,
        displayingUserPredResults: state.predictionResults.displayingUserPredResults,
        userPredResults: state.predictionResults.userPredResults
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPredictionResults: () => dispatch(actions.fetchPredictionResults()),
        onDisplayUserPredictionResults: (userId) => dispatch(actions.fetchUserPredictionResults(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( AggregatePredictionResults );