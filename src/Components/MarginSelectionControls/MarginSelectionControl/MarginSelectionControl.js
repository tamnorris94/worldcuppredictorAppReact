import React from 'react';

import classes from './MarginSelectionControl.css';
//import Button from "../../../Components/UI/Button/Button";
import { Button } from 'reactstrap';

const MarginSelectionControl = (props) => {
    const MarginSelectionControlClasses = [classes.PredResSelectControl];
    if (props.selectedmargin === props.label) {
        MarginSelectionControlClasses.push(classes.Less);
    }
    else {
        MarginSelectionControlClasses.push(classes.More);
    }

    return (
        <div className={classes.MarginSelectionControl}>
            <Button
                type="button"
                label={props.label}
                className={MarginSelectionControlClasses.join(' ')}
                onClick={props.selectMargin}
                selectedmargin={props.selectedmargin}
            >{props.label}</Button>
        </div>
    )
};

export default MarginSelectionControl;