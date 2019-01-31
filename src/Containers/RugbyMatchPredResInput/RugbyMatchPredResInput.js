import React, { Component } from 'react';
import classes from './RugbyMatchPredResInput.css';
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import PredResSelectControls from '../../Components/PredResSelectControls/PredResSelectControls';
import Aux from '../../Hoc/Auxiliary/Auxiliary';

class RugbyMatchPredictionResultInput extends Component {

    state = {
        teamSelection: {
            teamAName: {
                elementType: 'button',
                label: '',
                selected: "true"
            },
            teamBName: {
                elementType: 'button',
                label: '',
                selected: true
            }
        },
        selectedMargin: "11-15"
    }

    printSomethingToConsole = (event, winningMargin) => {
        event.preventDefault();
        console.log("printSomethingToConsole got run");
        this.setState( { inputtingPrediction: false } );
    }

    submitResultPredictionHandler = ( event ) => {
        console.log("submitResultPredictionHandler got run");
        event.preventDefault();
        const teamSelectionData = {};
        for (let teamSelectionIdentifier in this.state.teamSelection) {
            teamSelectionData[teamSelectionIdentifier] = this.state.teamSelection[teamSelectionIdentifier].value;
        }
        if(this.props.admin){
            const matchResultData = {
                matchID : this.props.selectedMatchForUpdate.matchID,
                teamAName: this.props.selectedMatchForUpdate.teamAName,
                teamBName: this.props.selectedMatchForUpdate.teamBName,
                teamAName: this.state.teamSelection.teamAName.value,
                teamBScore: this.state.teamSelection.teamBName.value,
                matchKickoff: this.props.selectedMatchForUpdate.matchKickoff
            }
            //this.props.onInputMatchResultOrPrediction( matchResultData, this.props.admin, this.props.prediction );
            this.props.onInputMatchResultOrPrediction( matchResultData, this.props.admin );
        }
        else {
            const matchResultData = {
                matchID : this.props.selectedMatchForUpdate.matchID,
                predictionID: this.props.selectedMatchForUpdate.predictionID,
                teamAName: this.props.selectedMatchForUpdate.teamAName,
                teamBName: this.props.selectedMatchForUpdate.teamBName,
                teamAName: this.state.teamSelection.teamAName.value,
                teamBScore: this.state.teamSelection.teamBName.value,
                matchKickoff: this.props.selectedMatchForUpdate.matchKickoff,
                userId: this.props.userId,
                userName: this.props.userName,
                prediction: this.props.prediction
            }
            //this.props.onInputMatchResultOrPrediction( matchResultData, this.props.admin, this.props.token );
            this.props.onInputMatchResultOrPrediction( matchResultData );
        }
    }

    // componentWillReceiveProps (nextProps){
    //     console.log("ComponentcomponentWillReceiveProps is executed.")
    //     if(this.props.teamAName !== nextProps.teamAName && this.props.teamBName !== nextProps.teamBName){
    //         const updatedteamAScore = updateObject(this.state.resultInputForm.teamAScore, {
    //             label: nextProps.teamAName
    //         })
    //         const updatedteamBScore = updateObject(this.state.resultInputForm.teamBScore, {
    //             label: nextProps.teamBName
    //         })
    //         const updatedResultInputForm = updateObject(this.state.resultInputForm, {
    //             teamAScore: updatedteamAScore,
    //             teamBScore: updatedteamBScore
    //         })
    //         this.setState({resultInputForm: updatedResultInputForm});
    //     }
    // }

    componentDidMount(){
        //console.log("componentDidMount run");
        const updatedTeamSelection = updateObject(this.state.teamSelection, {
            teamAName: updateObject(this.state.teamSelection.teamAName, { label: this.props.selectedMatchForUpdate.teamAName}),
            teamBName: updateObject(this.state.teamSelection.teamBName, { label: this.props.selectedMatchForUpdate.teamBName}),
        })
        this.setState({teamSelection: updatedTeamSelection});
    }

    // componentWillReceiveProps (nextProps){
    //     console.log("ComponentcomponentWillReceiveProps is executed.")
    //     if(this.props.teamAName !== nextProps.teamAName && this.props.teamBName !== nextProps.teamBName){
    //         const updatedResultInputForm = updateObject(this.state.resultInputForm, {
    //             teamAScore: updateObject(this.state.resultInputForm.teamAScore, { label: nextProps.teamAName}),
    //             teamBScore: updateObject(this.state.resultInputForm.teamBScore, { label: nextProps.teamBName}),
    //         })
    //         this.setState({resultInputForm: updatedResultInputForm});
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("State teamALabel " + this.state.resultInputForm.teamAScore.label);
    //     console.log("nextState teamALabel " + nextState.resultInputForm.teamAScore.label);
    //     if(this.props.selectedMatchForUpdate !== nextProps.selectedMatchForUpdate && !this.state.inputtingPrediction){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    //
    // }

    componentDidUpdate(prevProps){
        //console.log("componentDidUpdate run. Props are : " + this.props.selectedMatchForUpdate.teamAName + " " +this.props.selectedMatchForUpdate.teamBName);
        // console.log("Props are " + this.props.selectedMatchForUpdate.teamAName + " " +this.props.selectedMatchForUpdate.teamBName);
        // console.log("Props matchID is " + this.props.selectedMatchForUpdate.matchID);
        // console.log("prevProps matchID is " + prevProps.matchID);
        // console.log("prevProps are " + prevProps.teamAName + " " +prevProps.teamBName);
        // console.log(this.state.resultInputForm.teamAScore.label);
        if(this.props.selectedMatchForUpdate.teamAName !== prevProps.selectedMatchForUpdate.teamAName && this.props.selectedMatchForUpdate.teamBName !== prevProps.selectedMatchForUpdate.teamBName){
            const updatedTeamSelection = updateObject(this.state.resultInputForm, {
                teamAName: updateObject(this.state.teamSelection.teamAName, { label: this.props.selectedMatchForUpdate.teamAName}),
                teamBName: updateObject(this.state.teamSelection.teamBName, { label: this.props.selectedMatchForUpdate.teamBName}),
            })
            this.setState({teamSelection: updatedTeamSelection});
        }
    }


    setWinningMarginHandler(winningMargin){
        let updatedMarginSelection = this.state.selectedMargin;
        console.log("setWinningMarginHandler is " + updatedMarginSelection);
        //console.log("setWinningMarginHandler updatedMarginSelection is " + updatedMarginSelection);
        updatedMarginSelection = updateObject(updatedMarginSelection, winningMargin);
        console.log("updatedMarginSelection is " + updatedMarginSelection);
        //event.preventDefault();
        //console.log("Event is " + event);
        //console.log("Winning Margin handler executed " + winningMargin);
        //const updatedWinningMargin = updateObject(this.state.winningMargin, { winningMargin });
        this.setState({ selectedMargin: winningMargin});
        this.props.onSetWinningMargin(winningMargin);
    }

    setWinningTeamHandler(winningTeam){
        let updatedTeamSelection = {...this.state.teamSelection};
        for (let key in updatedTeamSelection){
            let teamName = updatedTeamSelection[key].label;
            let updatedTeamSelectionTeam = updatedTeamSelection[key];
            if(teamName === winningTeam){
                updatedTeamSelectionTeam = updateObject(updatedTeamSelectionTeam, { selected: true})
            }
            else {
                updatedTeamSelectionTeam = updateObject(updatedTeamSelectionTeam, { selected: false})
            }
            updatedTeamSelection = updateObject(updatedTeamSelection, { [key]: updatedTeamSelectionTeam});
        };
        this.setState({teamSelection: updatedTeamSelection});
        this.props.onSetWinningTeam(winningTeam);
    }

    render() {
        //console.log("Updated state in render is " + JSON.stringify(this.state.teamSelection));
        //console.log("render run. Props are : " + this.props.selectedMatchForUpdate.teamAName + " " +this.props.selectedMatchForUpdate.teamBName);
        const formElementsArray = [];
        for (let key in this.state.teamSelection) {
            formElementsArray.push({
                id: key,
                config: this.state.teamSelection[key]
            });
        }
        let teamName = null;
        let matchResultInputForm = null;

        let matchPredKickOff = new Date(this.props.selectedMatchForUpdate.matchKickoff).getTime();
        let currentDateTime = new Date().getTime();
        if(matchPredKickOff < currentDateTime && !this.props.admin){
            matchResultInputForm = <p>Match has already been played</p>
        }
        else {
            //This is the same as original matchResultInput form but instead of having 2 input
            //boxes for the result or prediction I need to replace these with the new component
            //PredResSelectControl and cycle through all of these for each team.
            //Do I need the PredResSelectControls component? As BurgerBuilder has.
            matchResultInputForm = (
                <form className={classes.MatchResultInput}>
                    {formElementsArray.map(formElement => (
                        <div key={formElement.id}>
                            <div className="btn-group" role="group" aria-label="Basic Example">
                                <Button selected={formElement.config.selected} type="button" btnType={formElement.config.selected} clicked={(event)=>this.setWinningTeamHandler(formElement.config.label)}>
                                    {formElement.config.label}
                                </Button>
                            </div>
                        </div>
                    ))}

                    <PredResSelectControls
                        selectedMargin={this.state.selectedMargin}
                        selectMargin={(winningMargin) => this.setWinningMarginHandler(winningMargin)}
                        //selectMargin={this.props.onSetWinningMargin}
                        />

                    <Button btnType="Success" clicked={this.printSomethingToConsole}>SUBMIT PREDICTION</Button>
                    <Button btnType="Danger" clicked={this.props.resultInputCancel}>CANCEL</Button>
                </form>
            );
        }

        if ( this.props.loading ) {
            matchResultInputForm = <Spinner />;
        }
        return (
            <Aux>
                {matchResultInputForm}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMatchForUpdate: state.upcomingMatches.selectedMatchForUpd,
        redirectPath: state.upcomingMatches.redirectPath,
        userId: state.auth.userId,
        userName: state.auth.userName,
        token: state.auth.token,
        admin: state.auth.admin,
        winningTeam: state.rugbyMatchPredResultInput.winningTeam
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onInputMatchResult: (matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff)),
        onInputMatchResultOrPrediction: (matchResultData, admin) => dispatch(actions.addMatchResultOrPrediction(matchResultData, admin)),
        onSetWinningTeam: (winningTeam) => dispatch(actions.setWinningTeam(winningTeam)),
        onSetWinningMargin: (winningMargin) => dispatch(actions.setWinningMargin(winningMargin))
        //onInputMatchPrediction: (matchPreData) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RugbyMatchPredictionResultInput);