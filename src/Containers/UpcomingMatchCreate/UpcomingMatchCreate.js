import React, { Component } from 'react';
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios-wcpredict";
import { updateObject, checkValidity } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';

class UpcomingMatchCreate extends Component {

    state = {
        matchForm: {
            teamAName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Team A'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false
            },
            teamBName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Team B'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false
            },
            matchKickoff: {
                elementType: 'input',
                elementConfig: {
                    type: 'datetime-local',
                    placeholder: 'Match kickoff'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        },
        loading: false,
        formIsValid: false
    }

    // createMatch = (event) => {
    //     event.preventDefault();
    //     this.setState({ loading: true});
    //     const matchData = {};
    //     for (let teamElementIdentifier in this.state.matchForm){
    //         matchData[teamElementIdentifier] = this.state.matchForm[teamElementIdentifier].value;
    //     }
    //     const match = {
    //         teamAName : matchData.teamAName,
    //         teamBName : matchData.teamBName,
    //         matchKickoff: matchData.matchKickoff
    //     }
    //     axios.post( 'https://react-my-burger-tam.firebaseio.com/upcomingmatches.json', match )
    //         .then( response => {
    //             this.setState( { loading: false } );
    //             this.props.history.push('/');
    //         } )
    //         .catch( error => {
    //             this.setState( { loading: false } );
    //         } );
    // }

    createMatch = (event) => {
        event.preventDefault();
        //this.setState({ loading: true});
        const matchData = {};
        for (let teamElementIdentifier in this.state.matchForm){
            matchData[teamElementIdentifier] = this.state.matchForm[teamElementIdentifier].value;
        }
        const match = {
            teamAName : matchData.teamAName,
            teamBName : matchData.teamBName,
            matchKickoff: matchData.matchKickoff
        }

        const updatedMatchForm = updateObject(this.state.matchForm, {
            teamAName: updateObject(this.state.matchForm.teamAName, { value: "" }),
            teamBName: updateObject(this.state.matchForm.teamBName, { value: "" }),
            matchKickoff: updateObject(this.state.matchForm.matchKickoff, { value: "" })
        })
        this.setState({matchForm: updatedMatchForm});
        this.props.onAddUpcomingMatch(match);
    }

    // inputChangedHandler = (event, inputIdentifier) => {
    //
    //     const updatedMatchForm = {
    //         ...this.state.matchForm
    //     };
    //     const updatedFormElement = {
    //         ...updatedMatchForm[inputIdentifier]
    //     };
    //     updatedFormElement.value = event.target.value;
    //     updatedMatchForm[inputIdentifier] = updatedFormElement;
    //     this.setState({matchForm: updatedMatchForm});
    // }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.matchForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.matchForm[inputIdentifier].validation),
            touched: true
        });
        const updatedMatchForm = updateObject(this.state.matchForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedMatchForm) {
            formIsValid = updatedMatchForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({matchForm: updatedMatchForm, formIsValid: formIsValid});
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
                           invalid={!formElement.config.valid}
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}

                <Button disabled={!this.state.formIsValid} btnType="Success">ADD MATCH</Button>
            </form>
        );

        if ( this.props.loading ) {
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

const mapStateToProps = state => {
    return {
        loading: state.upcomingMatches.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddUpcomingMatch: (match) => dispatch(actions.addUpcomingMatch(match))
    }
}

export default connect(null,mapDispatchToProps)(UpcomingMatchCreate);