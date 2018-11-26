import React, { Component } from 'react';
import classes from './MatchResultInput.css';
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
                label: '',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 0,
                    maxLength: 2,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            teamBScore: {
                elementType: 'input',
                label: '',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 0,
                    maxLength: 2,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        const matchResultData = {};
        for (let formElementIdentifier in this.state.resultInputForm) {
            matchResultData[formElementIdentifier] = this.state.resultInputForm[formElementIdentifier].value;
        }
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
                userName: this.props.userName,
                prediction: this.props.prediction
            }
            this.props.onInputMatchResultOrPrediction( matchResultData, this.props.admin, this.props.token );
        }
    }

    componentWillReceiveProps (nextProps){
        console.log("ComponentcomponentWillReceiveProps is executed.")
        if(this.props.teamAName !== nextProps.teamAName && this.props.teamBName !== nextProps.teamBName){
            const updatedteamAScore = updateObject(this.state.resultInputForm.teamAScore, {
                label: nextProps.teamAName
            })
            const updatedteamBScore = updateObject(this.state.resultInputForm.teamBScore, {
                label: nextProps.teamBName
            })
            const updatedResultInputForm = updateObject(this.state.resultInputForm, {
                teamAScore: updatedteamAScore,
                teamBScore: updatedteamBScore
            })
            this.setState({resultInputForm: updatedResultInputForm});
        }
    }

    // inputChangedHandler = (event, inputIdentifier) => {
    //     const updatedMatchResultForm = {
    //         ...this.state.resultInputForm
    //     };
    //     const updatedFormElement = {
    //         ...updatedMatchResultForm[inputIdentifier]
    //     };
    //     updatedFormElement.value = event.target.value;
    //     updatedMatchResultForm[inputIdentifier] = updatedFormElement;
    //     this.setState({resultInputForm: updatedMatchResultForm});
    // }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log("Is this being executed?");
        console.log("What is the value being entered?" +event.target.value);
        const updatedFormElement = updateObject(this.state.resultInputForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.resultInputForm[inputIdentifier].validation),
            touched: true
        });
        const updatedResultInputForm = updateObject(this.state.resultInputForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedResultInputForm) {
            formIsValid = updatedResultInputForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({resultInputForm: updatedResultInputForm, formIsValid: formIsValid});
    }



    teamAInputChangedHandler = (event, teamAScore) => {
        const updatedresultInputForm = updateObject( this.state.resultInputForm, {
            [teamAScore]: updateObject( this.state.resultInputForm[teamAScore], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.resultInputForm[teamAScore].validation ),
                touched: true
            } )
        } );
        let formIsValid = true;
        for (let inputIdentifier in updatedresultInputForm) {
            formIsValid = updatedresultInputForm[teamAScore].valid && formIsValid;
        }
        this.setState({resultInputForm: updatedresultInputForm, formIsValid: formIsValid});
    }

    // inputChangedHandler = ( event, controlName ) => {
    //     const updatedControls = updateObject( this.state.controls, {
    //         [controlName]: updateObject( this.state.controls[controlName], {
    //             value: event.target.value,
    //             valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
    //             touched: true
    //         } )
    //     } );
    //     this.setState( { controls: updatedControls } );
    // }

    teamBInputChangedHandler = (event, teamBScore) => {
        const updatedresultInputForm = updateObject( this.state.resultInputForm, {
            [teamBScore]: updateObject( this.state.resultInputForm[teamBScore], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.resultInputForm[teamBScore].validation ),
                touched: true
            } )
        } );
        let formIsValid = true;
        for (let inputIdentifier in updatedresultInputForm) {
            formIsValid = updatedresultInputForm[teamBScore].valid && formIsValid;
        }
        this.setState({resultInputForm: updatedresultInputForm, formIsValid: formIsValid});
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
                userName: this.props.userName,
                prediction: this.props.prediction
            }
            this.props.onInputMatchResultOrPrediction( matchResultData, this.props.admin, this.props.token );
        }
    }

    // render(){
    //
    //     const formElementsArray = [];
    //     for(let key in this.state.resultInputForm){
    //         formElementsArray.push({
    //             id: key,
    //             config: this.state.resultInputForm[key]
    //         });
    //     }
    //
    //         const teamAScoreElementName = "teamAScore";
    //         const teamBScoreElementName = "teamBScore";
    //
    //         let matchResultInputForm = (
    //
    //             <form className={classes.MatchResultInput}>
    //                 <p>{this.state.resultInputForm.teamAScore.label} score: </p>
    //                     <Input name="teamAResult"
    //                          min="0"
    //                          max="10"
    //                          type="number"
    //                          //invalid={!formElement.config.valid}
    //                          invalid={this.state.resultInputForm.teamAScore.valid}
    //                          shouldValidate={this.state.resultInputForm.teamAScore.validation}
    //                          changed={( event ) => this.teamAInputChangedHandler( event, teamAScoreElementName )} />
    //                 <p>{this.state.resultInputForm.teamBScore.label} score: </p>
    //                     <Input name="teamAResult"
    //                          min="0"
    //                          max="10"
    //                          type="number"
    //                          invalid={this.state.resultInputForm.teamBScore.valid}
    //                          //invalid={!formElement.config.valid}
    //                          shouldValidate={this.state.resultInputForm.teamBScore.validation}
    //                          changed={( event ) => this.teamBInputChangedHandler( event, teamBScoreElementName )} />
    //                 <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.addResultOrPredictionHandler}>ADD MATCH RESULT</Button>
    //                 <Button btnType="Danger" clicked={this.props.resultInputCancel}>CANCEL</Button>
    //             </form>
    //         );
    //
    //     return (
    //         <div>
    //             {matchResultInputForm}
    //         </div>
    //     )
    // }

    render () {
        const formElementsArray = [];
        for (let key in this.state.resultInputForm) {
            formElementsArray.push({
                id: key,
                config: this.state.resultInputForm[key]
            });
        }
        let teamName = null;
        let matchResultInputForm = (

            <form className={classes.MatchResultInput}>
                {formElementsArray.map(formElement => (
                    <div key={formElement.id}>
                    <p>{formElement.config.label} score: </p>
                    <Input
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    </div>
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ADD MATCH RESULT</Button>
                <Button btnType="Danger" clicked={this.props.resultInputCancel}>CANCEL</Button>
            </form>
        );
        if ( this.props.loading ) {
            matchResultInputForm = <Spinner />;
        }
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
        userName: state.auth.userName,
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