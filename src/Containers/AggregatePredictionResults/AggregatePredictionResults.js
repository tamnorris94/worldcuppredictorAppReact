import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import Aux from "../../Hoc/Auxiliary/Auxiliary";
import UserAggPredictionResult from './UserAggPredictionResult/UserAggPredictionResult';
import UserPredResultsHistory from '../../Components/UserPredResultsHistory/UserPredResultsHistory';
import Modal from "../../Components/UI/Modal/Modal";
import classes from './AggregatePredictionResults.css';

class AggregatePredictionResults extends Component {

    state = {
        displayingUserPredResults : false
    }

    componentDidMount(){
        console.log("Props on AggregatePredictionResults are " + JSON.stringify(this.props))
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

        if(!this.props.loading && !this.props.error){
            aggPredictionResults = this.props.aggPredictionResults.map(apr => {
                return(
                    <div className={classes.AggregatePredictionResults}>
                        <UserAggPredictionResult
                            key={apr.userId}
                            userId={apr.userId}
                            userName={apr.userName}
                            points={apr.points}
                            displayPredictionResultsForUser={() => this.initDisplayUserPredictionResults(apr.userId)}/>
                    </div>
                )

            })
        }

        let userPredResultsHistory = null;

        if(this.state.displayingUserPredResults){
            console.log("What do userPredResults look like? " + JSON.stringify(this.props.userPredResults));
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