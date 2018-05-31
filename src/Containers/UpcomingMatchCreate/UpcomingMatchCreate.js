import React, { Component } from 'react';
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios-wcpredict";

class UpcomingMatchCreate extends Component {

    state = {
        matchForm: {
            teamA: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Team A'
                },
                value: ''
            },
            teamB: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Team B'
                },
                value: ''
            },
            matchKickoff: {
                elementType: 'input',
                elementConfig: {
                    type: 'datetime-local',
                    placeholder: 'Match kickoff'
                },
                value: ''
            }
        },
        loading: false
    }

    createMatch = (event) => {
        event.preventDefault();
        this.setState({ loading: true});
        const matchData = {};
        for (let teamElementIdentifier in this.state.matchForm){
            matchData[teamElementIdentifier] = this.state.matchForm[teamElementIdentifier].value;
        }
        const match = {
            teamA : matchData.teamA,
            teamB : matchData.teamB,
            matchKickoff: matchData.matchKickoff
        }
        axios.post( 'https://react-my-burger-tam.firebaseio.com/upcomingmatches.json', match )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedMatchForm = {
            ...this.state.matchForm
        };
        const updatedFormElement = {
            ...updatedMatchForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedMatchForm[inputIdentifier] = updatedFormElement;
        this.setState({matchForm: updatedMatchForm});
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.matchForm){
            formElementsArray.push({
                id: key,
                config: this.state.matchForm[key]
            });
        }

        let form = (
            <form onSubmit={this.createMatch}>

                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}

                <Button btnType="Success">ADD MATCH</Button>
            </form>
        );

        if ( this.state.loading ) {
            form = <Spinner />;
        }

        return (
            <div>
                <h3>Enter Upcoming Match</h3>
                {form}
            </div>

        )
    }
}

export default UpcomingMatchCreate;