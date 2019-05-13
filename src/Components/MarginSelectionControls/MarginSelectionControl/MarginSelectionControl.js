import React from 'react';

import classes from './MarginSelectionControl.css';
import Button from "../../../Components/UI/Button/Button";

const MarginSelectionControl = (props) => {

    const MarginSelectionControlClasses = [classes.PredResSelectControl];
    //console.log("MarginSelectionControl props selectedMargin is " + JSON.stringify(props.selectedMargin));
    if (props.selectedmargin === props.label) {
        MarginSelectionControlClasses.push(classes.Less);
    }
    else {
        MarginSelectionControlClasses.push(classes.More);
    }

    return (
        <div className={classes.MarginSelectionControl}>
            <button
                type="button"
                label={props.label}
                className={MarginSelectionControlClasses.join(' ')}
                onClick={props.selectMargin}
                selectedmargin={props.selectedmargin}
            >{props.label}</button>
        </div>
        )
};

export default MarginSelectionControl;