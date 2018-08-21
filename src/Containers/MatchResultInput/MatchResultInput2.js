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
        controls: {
            teamAScore: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
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
                    minLength: 1
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
        const updatedControls = updateObject( this.state.controls, {
            [teamAScore]: updateObject( this.state.controls[teamAScore], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[teamAScore].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
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
        const updatedControls = updateObject( this.state.controls, {
            [teamBScore]: updateObject( this.state.controls[teamBScore], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[teamBScore].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    addResultHandler = ( event ) => {
        event.preventDefault();
        console.log("Does addResultHandler get called? Yes")
        this.props.onInputMatchResult( this.props.matchID, this.props.teamAName, this.props.teamBName, this.state.controls.teamAScore.value, this.state.controls.teamBScore.value );
        //this.props.history.push('/upcomingmatches');
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.resultInputForm){
            formElementsArray.push({
                id: key,
                config: this.state.resultInputForm[key]
            });
        }

        for(let key in this.state.resultResultInputForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.resultResultInputForm[key]
                });
            }

            const teamAScoreElementName = "teamAScore";
            const teamBScoreElementName = "teamBScore";

            let matchResultInputForm = (
                <form>
                    <p>{this.props.teamA} score: </p>
                        <Input name="teamAResult"
                             min="0"
                             max="10"
                             type="number"
                             changed={( event ) => this.inputChangedHandler( event, teamAScoreElementName )} />
                    <p>{this.props.teamB} score: </p>
                        <Input name="teamAResult"
                             min="0"
                             max="10"
                             type="number"
                             changed={( event ) => this.inputChangedHandler( event, teamBScoreElementName )} />
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