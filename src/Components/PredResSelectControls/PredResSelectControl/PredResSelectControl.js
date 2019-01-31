import React from 'react';

import classes from './PredResSelectControl.css';
import Button from "../../../Components/UI/Button/Button";

const PredictionResultSelectionControl = (props) => {

    const PredResSelectControlClasses = [classes.PredResSelectControl];
    //console.log("PredictionResultSelectionControl props selectedMargin is " + JSON.stringify(props.selectedMargin));
    if (props.selectedMargin === props.label) {
        PredResSelectControlClasses.push(classes.Less);
    }
    else {
        PredResSelectControlClasses.push(classes.More);
    }

    return (
        <div className={classes.PredResSelectControl}>
            <div className={classes.Label}></div>
            <button
                type="button"
                label={props.label}
                className={PredResSelectControlClasses.join(' ')}
                onClick={props.selectMargin}
                selectedMargin={props.selectedMargin}
            >{props.label}</button>
        </div>
        )
};

export default PredictionResultSelectionControl;