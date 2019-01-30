import React from 'react';

import classes from './PredResSelectControl.css';
import Button from "../../../Components/UI/Button/Button";

const PredictionResultSelectionControl = (props) => (
    <div className={classes.PredResSelectControl}>
        <div className={classes.Label}></div>
        <button
            type="button"
            label={props.label}
            className={classes.Less}
            onClick={props.selectMargin}
            >{props.label}</button>
    </div>
);

export default PredictionResultSelectionControl;