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
        const matchResultData = {
            matchID : this.props.matchID,
            teamAName: this.props.teamAName,
            teamBName: this.props.teamBName,
            teamAResult: this.state.resultInputForm.teamAScore.value,
            teamBResult: this.state.resultInputForm.teamBScore.value
        }
        this.props.onInputMatchResult( matchResultData );
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.resultInputForm){
            formElementsArray.push({
                id: key,
                config: this.state.resultInputForm[key]
            });
        }

        console.log("Form elements array " +formElementsArray);

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
        redirectPath: state.upcomingMatches.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInputMatchResult: (matchID, teamAName, teamBName, teamAScore, teamBScore) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchResultInput);