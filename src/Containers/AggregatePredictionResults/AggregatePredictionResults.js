import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import Aux from "../../Hoc/Auxiliary/Auxiliary";

class AggregatePredictionResults extends Component {
    componentDidMount(){
        this.props.onFetchPredictionResults();
    }

    render () {
        return (
            <Aux>
                <h1>This is Prediction Results Page</h1>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    //this should be array of aggregate user predictions
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPredictionResults: () => dispatch(actions.fetchPredictionResults()),
    }
}

export default connect(null, mapDispatchToProps)( AggregatePredictionResults );