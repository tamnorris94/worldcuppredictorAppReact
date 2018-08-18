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
        this.props.onInputMatchResult( this.state.controls.teamAScore.value, this.state.controls.teamBScore.value );
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

            let matchResultInputForm = (
                <form>
                    <p>{this.props.teamA} score: </p> <Input name="teamAResult"
                                                                         min="0"
                                                                         max="10"
                                                                         type="number"
                                                                         changed={this.teamAInputChangedHandler}   />

                    <p>{this.props.teamB} score: </p> <Input name="teamAResult"
                                                                         min="0"
                                                                         max="10"
                                                                         type="number"
                                                                         changed={this.teamBInputChangedHandler} />
                    <Button btnType="Success" clicked={() => this.addResultHandler}>ADD MATCH RESULT</Button>
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
        teamA: state.matchResultInput.teamAName,
        teamB: state.matchResultInput.teamBName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInputMatchResult: (teamAScore, teamBScore) => dispatch(actions.addMatchResult(teamAScore, teamBScore))
    }
}

export default connect(mapStateToProps, mapDispatchToProps(MatchResultInput));