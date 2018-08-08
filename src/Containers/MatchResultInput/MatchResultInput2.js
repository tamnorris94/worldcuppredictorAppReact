import React, { Component } from 'react';
import classes from './MatchResultInput.css';
import axios from "../../axios-wcpredict";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";

class MatchResultInput extends Component {

    state = {
        teamAScore: null,
        teamBScore: null,
        resultInputForm: {
            teamAScore: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Team A Score'
                },
                value: ''
            },
            teamBScore: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Team B Score '
                },
                value: ''
            }
        }
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

    teamAInputChangedHandler = (event) => {
        console.log("Does teamBInputChangeHandler execute?");
        const teamAScoreUpdate = event.target.value;
        this.setState({teamAScore : teamAScoreUpdate})
    }

    teamBInputChangedHandler = (event) => {
        console.log("Does teamBInputChangeHandler execute?");
        const teamBScoreUpdate = event.target.value;
        this.setState({teamBScore : teamBScoreUpdate})
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

                    <Button btnType="Success" clicked={() => this.props.addResult}>ADD MATCH RESULT</Button>
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

export default MatchResultInput;