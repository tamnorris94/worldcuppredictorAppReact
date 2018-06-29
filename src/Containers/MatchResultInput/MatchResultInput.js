import React, { Component } from 'react';
import classes from './MatchResultInput.css';
import axios from "../../axios-wcpredict";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";

class MatchResultInput extends Component {

    state = {
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
        },
        loading: false,
        loadedMatch: null,
        selectedMatchId : null,
        teamAName : null,
        teamBName : null,
        teamAScore: null,
        teamBScore: null,
        matchId: null

    }

    componentDidUpdate () {
        console.log("MatchResultInput loadedMatch" + this.state.loadedMatch);
        console.log("MatchResultInput Props Match id" + this.props.id);
        if (this.props.id) {
            if (!this.state.loadedMatch || (this.state.loadedMatch && this.state.selectedMatchId !== this.props.id)) {
                axios.get('https://react-my-burger-tam.firebaseio.com/upcomingmatches/' + this.props.id + '.json')
                    .then(response => {
                        //const matchKey = response.key;

                        this.setState({
                            loadedMatch: response.data,
                            selectedMatchId: this.props.id,
                            teamAName: response.data.teamA,
                            teamBName: response.data.teamB,
                            matchId: this.props.id
                        });
                        console.log("get response " +response.data.teamA);

                    });

            }


        }
    }

    addMatchResult =  (event) => {
        event.preventDefault();
        console.log("Add match result happens");
        console.log("What is state of result input form? " + this.state.resultInputForm);
        // const formData = {};
        // for (let formElementIdentifier in this.state.resultInputForm){
        //     formData[formElementIdentifier] = this.state.resultInputForm[formElementIdentifier].value;
        // }
        const resultData = {
            teamAName : this.state.teamAName,
            teamBName : this.state.teamBName,
            teamAScore : this.state.teamAScore,
            teamBScore : this.state.teamBScore,
            matchId : this.state.matchId
        }

        console.log("What is match id? " +resultData.matchId);

        axios.post('https://react-my-burger-tam.firebaseio.com/matchResults.json', resultData)
            .then( response => {
                this.props.history.push('/');
            })
            .catch( err => {
                console.log("Error Occured");
            })

        axios.delete('https://react-my-burger-tam.firebaseio.com/upcomingmatches/' + this.props.id + '.json');
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

        let matchResultInputForm = <p style={{ textAlign: 'center' }}>Please select a Match to add result!</p>;

        if(this.state.loadedMatch){
            const formElementsArray = [];
            for(let key in this.state.resultResultInputForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.resultResultInputForm[key]
                });
            }

            matchResultInputForm = (
                <form onSubmit={this.addMatchResult}>
                    <p>{this.state.loadedMatch.teamA} score: </p> <Input name="teamAResult"
                                                                  min="0"
                                                                  max="10"
                                                                  type="number"
                                                                  changed={this.teamAInputChangedHandler}   />

                    <p>{this.state.loadedMatch.teamB} score: </p> <Input name="teamAResult"
                                                                  min="0"
                                                                  max="10"
                                                                  type="number"
                                                                  changed={this.teamBInputChangedHandler} />

                    <Button btnType="Success">ADD MATCH</Button>
                </form>
            );
        }

        // if ( this.props.id ) {
        //     matchResultInputForm = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        // }

        if ( this.state.loading ) {
            matchResultInputForm = <Spinner />;
        }

        return (
            <div>
                {matchResultInputForm}
            </div>
        )
    }
}

export default MatchResultInput;