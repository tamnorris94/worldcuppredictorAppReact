import React, { Component } from 'react';
import classes from './MatchResultInput.css';
import axios from "../../axios-wcpredict";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';

class MatchResultInput extends Component {

    state = {
        resultInputForm: {
            teamAScore: {
                elementType: 'input',
                label: this.props.teamA,
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

    addResultHandler = ( event ) => {
        event.preventDefault();
        if(this.state.admin){
            const matchResultData = {
                matchID : this.props.matchID,
                teamAName: this.props.teamAName,
                teamBName: this.props.teamBName,
                teamAScore: this.state.resultInputForm.teamAScore.value,
                teamBScore: this.state.resultInputForm.teamBScore.value,
                matchKickoff: this.props.matchKickoff
            }
            this.props.onInputMatchResult( matchResultData, this.props.admin );
        }
        else {
            const matchResultData = {
                matchID : this.props.matchID,
                teamAName: this.props.teamAName,
                teamBName: this.props.teamBName,
                teamAScore: this.state.resultInputForm.teamAScore.value,
                teamBScore: this.state.resultInputForm.teamBScore.value,
                matchKickoff: this.props.matchKickoff,
                userId: this.props.userId
            }
            this.props.onInputMatchResult( matchResultData, this.props.admin, this.props.token );
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
                    <Button btnType="Success" clicked={this.addResultHandler}>ADD MATCH RESULT</Button>
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
        matchID: state.matchResultInput.selectedMatchForUpd.matchID,
        teamAName: state.matchResultInput.selectedMatchForUpd.teamAName,
        teamBName: state.matchResultInput.selectedMatchForUpd.teamBName,
        teamAScore: state.matchResultInput.selectedMatchForUpd.teamAScore,
        teamBScore: state.matchResultInput.selectedMatchForUpd.teamBScore,
        matchKickoff: state.matchResultInput.selectedMatchForUpd.matchKickoff,
        redirectPath: state.upcomingMatches.redirectPath,
        userId: state.auth.userId,
        token: state.auth.token,
        admin: state.auth.admin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onInputMatchResult: (matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff)),
        onInputMatchResult: (matchResultData, admin, token) => dispatch(actions.addMatchResult(matchResultData, admin, token)),
        //onInputMatchPrediction: (matchPreData) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchResultInput);