import React from 'react';

import classes from './TeamSelectionControl.css';
import Button from "../../../Components/UI/Button/Button";

const TeamSelectionControl = (props) => {

    const TeamSelectionControlClasses = [classes.TeamSelectionControl];
    //console.log("TeamSelectionControl props selectedTeam is " + props.selectedTeam);
    //console.log("TeamSelectionControl props label is " + props.children);
    if (props.selectedteam === props.children) {
        TeamSelectionControlClasses.push(classes.Less);
        //console.log("Do we get in here?")
    }
    else {
        TeamSelectionControlClasses.push(classes.More);
    }

    return (
        <div className={classes.TeamSelectionControl}>

            <button
                type="button"
                label={props.label}
                className={TeamSelectionControlClasses.join(' ')}
                onClick={props.selectTeam}
                selectedteam={props.selectedteam}>{props.children}</button>
        </div>
    )
};

export default TeamSelectionControl;