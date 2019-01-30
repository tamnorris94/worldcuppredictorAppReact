import React from 'react';

import classes from './PredResSelectControls.css';
import PredResSelectControl from './PredResSelectControl/PredResSelectControl';
import { ButtonGroup } from 'reactstrap';

const predResSelectControls = [
    { label: '21+', type: '21plus' },
    { label: '16-20', type: '16to20' },
    { label: '11-15', type: '11to15' },
    { label: '6-10', type: '6to10' },
    { label: '1-5', type: '1to5' },
    { label: 'Draw', type: 'Draw'}
];

const PredictionResultSelectionControls = ( props ) => (
    <div className={classes.PredictionResultSelectionControls}>
        <div className="btn-group" role="group" aria-label="Basic Example">
        <ButtonGroup toggle={this.toggle}>
        {predResSelectControls.map( ctrl => (
            <PredResSelectControl
                key={ctrl.label}
                label={ctrl.label}
                selectMargin={(winningMargin) => props.selectMargin(ctrl.label)}
            />
        ))}
        </ButtonGroup>
        </div>
    </div>
);

export default PredictionResultSelectionControls;