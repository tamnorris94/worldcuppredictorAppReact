import React from 'react';

import classes from './TeamSelectionControl.css';
import button from "../../../Components/UI/Button/Button";
//import Button from 'reactstrap';

const TeamSelectionControl = (props) => {

    const TeamSelectionControlClasses = [classes.TeamSelectionControl];
    if (props.selectedteam === props.children) {
        TeamSelectionControlClasses.push(classes.Less);
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

    // return (
    //     <div className={classes.TeamSelectionControl}>
    //
    //         <Button
    //             type="button"
    //             label={props.label}
    //             className={TeamSelectionControlClasses.join(' ')}
    //             onClick={props.selectTeam}
    //             selectedteam={props.selectedteam}>{props.children}</Button>
    //     </div>
    // )
};

export default TeamSelectionControl;