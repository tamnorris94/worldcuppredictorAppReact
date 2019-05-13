import React, { Component } from 'react';
import classes from './RugbyMatchPredResInput.css';
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import MarginSelectionControls from '../../Components/MarginSelectionControls/MarginSelectionControls';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import TeamSelectionControl from '../../Components/TeamSelectionControls/TeamSelectionControl/TeamSelectionControl';

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
        selectedmargin: "",
        selectedteam: "",
        canSubmitForm: false
    }

    printSomethingToConsole = (event, winningMargin) => {
        event.preventDefault();
        this.setState( { inputtingPrediction: false } );
    }

    submitResultPredictionHandler = ( event ) => {
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
                teamAScore: this.state.teamSelection.teamAName.value,
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
                teamAScore: this.state.teamSelection.teamAName.value,
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

    componentWillReceiveProps (nextProps){
        console.log("ComponentcomponentWillReceiveProps is executed.")
        if(this.props.teamAName !== nextProps.teamAName && this.props.teamBName !== nextProps.teamBName){
            const updatedResultInputForm = updateObject(this.state.resultInputForm, {
                teamAScore: updateObject(this.state.resultInputForm.teamAScore, { label: nextProps.teamAName}),
                teamBScore: updateObject(this.state.resultInputForm.teamBScore, { label: nextProps.teamBName}),
            })
            this.setState({resultInputForm: updatedResultInputForm});
        }
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     //console.log("State teamALabel " + this.state.resultInputForm.teamAScore.label);
    //     console.log("this.props.selectedMatchForUpdate.matchID " + this.props.selectedMatchForUpdate.matchID);
    //     console.log("nextProps.selectedMatchForUpdate.matchID " + nextProps.selectedMatchForUpdate.matchID);
    //     if(this.props.selectedMatchForUpdate.matchID !== nextProps.selectedMatchForUpdate.matchID){
    //         console.log("shouldComponentUpdate returns true")
    //         const updatedTeamSelection = updateObject(this.state.resultInputForm, {
    //             teamAName: updateObject(this.state.teamSelection.teamAName, { label: this.props.selectedMatchForUpdate.teamAName}),
    //             teamBName: updateObject(this.state.teamSelection.teamBName, { label: this.props.selectedMatchForUpdate.teamBName}),
    //         })
    //         this.setState({teamSelection: updatedTeamSelection});
    //         return true;
    //     }
    //     else{
    //         console.log("shouldComponentUpdate returns false")
    //         return false;
    //     }
    //
    // }


    componentDidUpdate(prevProps){
        console.log("componentDidUpdate happens");
        console.log("this.props.selectedMatchForUpdate.matchID = " +this.props.selectedMatchForUpdate.matchID)
        console.log("prevProps.selectedMatchForUpdate.matchID = " +prevProps.selectedMatchForUpdate.matchID)
        if(this.props.selectedMatchForUpdate.matchID !== prevProps.selectedMatchForUpdate.matchID)
        {
            const updatedTeamSelection = updateObject(this.state.resultInputForm, {
                teamAName: updateObject(this.state.teamSelection.teamAName, { label: this.props.selectedMatchForUpdate.teamAName}),
                teamBName: updateObject(this.state.teamSelection.teamBName, { label: this.props.selectedMatchForUpdate.teamBName}),
            })
            this.setState({teamSelection: updatedTeamSelection});
        }
    }


    setWinningMarginHandler(winningMargin){
        let updatedMarginSelection = this.state.selectedmargin;
        updatedMarginSelection = updateObject(updatedMarginSelection, winningMargin);
        //event.preventDefault();
        //const updatedWinningMargin = updateObject(this.state.winningMargin, { winningMargin });
        this.setState({ selectedmargin: winningMargin});
        this.props.onSetWinningMargin(winningMargin);
    }

    setWinningTeamHandler(winningTeam){
        this.setState({
            selectedteam: winningTeam
        });
        this.props.onSetWinningTeam(winningTeam);
    }

    //I don't think I need to do this here because all this data is stored in state which is accessible in upcoming matches
    submitResultOrPredictionHandler =( event, admin ) => {
        event.preventDefault();
        //console.log("Inside submitResultOrPredictionHandler, selectedMatchForUpdate " + JSON.stringify(this.props.selectedMatchForUpdate));

        const resultPredictionData = {
            winningTeam: this.props.winningTeam,
            winningMargin: this.props.winningMargin,
            matchID: this.props.selectedMatchForUpdate.matchID,
            matchKickoff: this.props.selectedMatchForUpdate.matchKickoff,
            teamAName: this.props.selectedMatchForUpdate.teamAName,
            teamBName: this.props.selectedMatchForUpdate.teamBName,
            predictionID: this.props.selectedMatchForUpdate.predictionID,
            prediction: this.props.selectedMatchForUpdate.prediction,
            userId: this.props.userId,
            userName: this.props.userName
        }
        this.props.onSubmitMatchResultOrPrediction(resultPredictionData, this.props.admin);
    }

    cancelMatchResPredInputHandler = (event) => {
        event.preventDefault();
        this.props.resultInputCancel();
    }

    render() {

        let canSubmitPrediction = false;
        if(this.state.selectedteam != "" && this.state.selectedmargin != ""){
            canSubmitPrediction = true;
        }

       const formElementsArray = [];
        for (let key in this.state.teamSelection) {
            formElementsArray.push({
                id: key,
                config: this.state.teamSelection[key]
            });
        }

        const marginSelectionsArray = [];

        for (let key in this.state.marginSelections){
            marginSelectionsArray.push({
                id: key,
                marginSelectionConfig: this.state.marginSelections[key]
            })
        }

        let teamName = null;
        let matchResultInputForm = null;
        const moment = require('moment');

        let matchPredKickOff = new Date(this.props.selectedMatchForUpdate.matchKickoff).getTime();
        let matchPredKickoffToLocal = moment.utc(this.props.selectedMatchForUpdate.matchKickoff).local().format("ddd, MMMM Do YYYY, h:mm a");
        //let matchPredKickOff = new Date(this.props.selectedMatchForUpdate.matchKickoff);
        let matchPredKickOff2 = moment.utc(this.props.selectedMatchForUpdate.matchKickoff).local();
        let currentDateTime = new Date();
        let currentLocalTime = moment.utc(currentDateTime).local().format("ddd, MMMM Do YYYY, h:mm a");
        let currentLocalTime2 = moment.utc(currentDateTime).local();
        console.log("matchPredKickoffToLocal is " +matchPredKickoffToLocal);
        //console.log("this.props.selectedMatchForUpdate.matchKickoff is " +this.props.selectedMatchForUpdate.matchKickoff);
        //console.log("In render of RugbyMatchPredResInput currentDateTime is " +currentDateTime);
        // console.log("In render of RugbyMatchPredResInput currentLocalTime is " +currentLocalTime);
        // console.log("In render of RugbyMatchPredResInput matchPredKickOff is " +matchPredKickOff);
        // console.log("In render of RugbyMatchPredResInput matchPredKickOff2 is " +matchPredKickOff2);
        // console.log("In render of RugbyMatchPredResInput currentLocalTime2 is " +currentLocalTime2);
        if(matchPredKickOff2 < currentLocalTime2 && !this.props.admin){
            matchResultInputForm = <p>Match has already been played</p>
        }
        else {
            //This is the same as original matchResultInput form but instead of having 2 input
            //boxes for the result or prediction I need to replace these with the new component
            //MarginSelectionControl and cycle through all of these for each team.
            //Do I need the MarginSelectionControls component? As BurgerBuilder has.
            matchResultInputForm = (
                <form className={classes.MatchResultInput}>

                    <div style={{position: "absolute"}}>
                    {formElementsArray.map(formElement => (
                            <div key={formElement.id} className="btn-group" role="group" aria-label="Basic Example">
                                <TeamSelectionControl selected={formElement.config.selected}
                                                      selectTeam={(event)=>this.setWinningTeamHandler(formElement.config.label)}
                                                      selectedteam={this.state.selectedteam}>
                                    {formElement.config.label}
                                </TeamSelectionControl>
                            </div>
                    ))}
                    <MarginSelectionControls
                        selectedmargin={this.state.selectedmargin}
                        selectMargin={(winningMargin) => this.setWinningMarginHandler(winningMargin)}
                        //selectMargin={this.props.onSetWinningMargin}
                        />
                    <Button disabled={!canSubmitPrediction} btnType="Success" clicked={this.submitResultOrPredictionHandler}>SUBMIT PREDICTION</Button>
                    <Button btnType="Danger" clicked={this.cancelMatchResPredInputHandler}>CANCEL</Button>
                    </div>
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
        winningTeam: state.upcomingMatches.winningTeam,
        winningMargin: state.upcomingMatches.winningMargin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onInputMatchResult: (matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff)),
        onSubmitMatchResultOrPrediction: (matchResultData, admin) => dispatch(actions.submitMatchResultOrPrediction(matchResultData, admin)),
        onSetWinningTeam: (winningTeam) => dispatch(actions.setWinningTeam(winningTeam)),
        onSetWinningMargin: (winningMargin) => dispatch(actions.setWinningMargin(winningMargin)),
        resultInputCancel: () => dispatch(actions.cancelMatchResultPredInput())
        //onInputMatchPrediction: (matchPreData) => dispatch(actions.addMatchResult(matchID, teamAName, teamBName, teamAScore, teamBScore, matchKickoff, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RugbyMatchPredictionResultInput);