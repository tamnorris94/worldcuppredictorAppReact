import React from 'react';

import classes from './MarginSelectionControls.css';
import MarginSelectionControl from './MarginSelectionControl/MarginSelectionControl';
import { ButtonGroup } from 'reactstrap';

const marginSelectionControls = [
    { label: '21+', type: '21plus' },
    { label: '16-20', type: '16to20' },
    { label: '11-15', type: '11to15' },
    { label: '6-10', type: '6to10' },
    { label: '1-5', type: '1to5' }
];

const MarginSelectionControls = (props ) => (

    <div className="btn-group">
            {marginSelectionControls.map( ctrl => (
                <MarginSelectionControl
                    key={ctrl.label}
                    label={ctrl.label}
                    selectMargin={(winningMargin) => props.selectMargin(ctrl.label)}
                    selectedmargin={props.selectedmargin}
                />
            ))}
    </div>
);

export default MarginSelectionControls;