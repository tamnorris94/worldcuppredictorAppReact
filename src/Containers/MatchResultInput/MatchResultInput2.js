import React, { Component } from 'react';
import classes from './MatchResultInput.css';
import axios from "../../axios-wcpredict";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';

class MatchResultPredictionInput extends Component {

    state = {
        resultInputForm: {
            teamAScore: {
                elementType: 'input',
                label: this.props.teamAName,
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 2,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            teamBScore: {
                elementType: 'input',
                label: this.props.teamBName,
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 2,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        },
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedMatchResultForm = {
            ...this.state.resultInputForm
        };
        const updatedFormElement = {
            ...updatedMatchResultForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedMatchResultForm[inputIdentifier] = updatedFormElement;
        this.setState({resultInputForm: updatedMatchResultForm});
    }

    teamAInputChangedHandler = (event, teamAScore) => {
        const updatedresultInputForm = updateObject( this.state.resultInputForm, {
            [teamAScore]: updateObject( this.state.resultInputForm[teamAScore], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.resultInputForm[teamAScore].validation ),
                touched: true
            } )
        } );
        this.setState( { resultInputForm: updatedresultInputForm } );
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    teamBInputChangedHandler = (event, teamBScore) => {
        const updatedresultInputForm = updateObject( this.state.resultInputForm, {
            [teamBScore]: updateObject( this.state.resultInputForm[teamBScore], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.resultInputForm[teamBScore].validation ),
                touched: true
            } )
        } );
        this.setState( { resultInputForm: updatedresultInputForm } );
    }

    //Maybe here should only be passing the scores, because at this point the id, names etc are already known.
    addResultOrPredictionHandler = ( event ) => {
        event.preventDefault();
        if(this.props.admin){
            const matchResultData = {
                matchID : this.props.matchID,
                teamAName: this.props.teamAName,
                teamBName: this.props.teamBName,
                teamAScore: this.state.resultInputForm.teamAScore.value,
                teamBScore: this.state.resultInputForm.teamBScore.value,
                matchKickoff: this.props.matchKickoff
            }
            this.props.onInputMatchResultOrPrediction( matchResultData, this.props.admin, this.props.prediction );
        }
        else {
            const matchResultData = {
                matchID : this.props.matchID,
                predictionID: this.props.predictionID,
                teamAName: this.props.teamAName,
                teamBName: this.props.teamBName,
                teamAScore: this.state.resultInputForm.teamAScore.value,
                teamBScore: this.state.resultInputForm.teamBScore.value,
                matchKickoff: this.props.matchKickoff,
                userId: this.props.userId,
                prediction: this.props.prediction
            }
            this.props.onInputMatchResultOrPrediction( matchResultData, this.props.admin, this.props.token );
        }
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.resultInputForm){
            formElementsArray.push({
                id: key,
                config: this.state.resultInputForm[key]
            });
        }

            const teamAScoreElementName = "teamAScore";
            const teamBScoreElementName = "teamBScore";

            let matchResultInputForm = (
                <form>
                    <p>{this.props.teamAName} score: </p>
                        <Input name="teamAResult"
                             min="0"
                             max="10"
                             type="number"
                             invalid={this.state.resultInputForm.teamAScore.valid}
                             shouldValidate={this.state.resultInputForm.teamAScore.validation}
                             changed={( event ) => this.teamAInputChangedHandler( event, teamAScoreElementName )} />
                    <p>{this.props.teamBName} score: </p>
                        <Input name="teamAResult"
                             min="0"
                             max="10"
                             type="number"
                             invalid={this.state.resultInputForm.teamBScore.valid}
                             shouldValidate={this.state.resultInputForm.teamBScore.validation}
                             changed={( event ) => this.teamBInputChangedHandler( event, teamBScoreElementName )} />
                    <Button btnType="Success" clicked={this.addResultOrPredictionHandler}>ADD MATCH RESULT</Button>
                    <Button btnType="Danger" clicked={this.props.resultInputCancel}>CANCEL</Button>
                </form>
            );

        return (
            <div>
                {matchResultInputForm}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        matchID: state.upcomingMatches.selectedMatchForUpd.matchID,
        predictionID: state.upcomingMatches.selectedMatchForUpd.predictionID,
        teamAName: state.upcomingMatches.selectedMatchForUpd.teamAName,
        teamBName: state.upcomingMatches.selectedMatchForUpd.teamBName,
        teamAScore: state.upcomingMatches.selectedMatchForUpd.teamAScore,
        teamBScore: state.upcomingMatches.selectedMatchForUpd.teamBScore,
        matchKickoff: state.upcomingMatches.selectedMatchForUpd.matchKickoff,
        redirectPath: state.upcomingMatches.redirectPath,
        userId: state.auth.userId,
        token: state.auth.token,
        admin: state.auth.admin,
        prediction: state.upcomingMatches.selectedMatchForUpd.prediction
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onInputMatchResult: (matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff)),
        onInputMatchResultOrPrediction: (matchResultData, admin, token, prediction) => dispatch(actions.addMatchResultOrPrediction(matchResultData, admin, token, prediction)),
        //onInputMatchPrediction: (matchPreData) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchResultPredictionInput);