import React from 'react';

import classes from './Button.css';
import { Button } from 'reactstrap';

const button = (props) => {

    const buttonClasses = [classes.Button];

    if (props.selected) {
        buttonClasses.push(classes.Success);
    }
    else {
        buttonClasses.push(classes.Danger);
    }

    return (
        <button
            enabled={props.selected}
            type={props.type}
            className={buttonClasses.join(' ')}
            //className="btn-lg btn-dark btn-block mt-1"
            onClick={props.clicked} disabled={props.disabled}>
            {props.children}
        </button>
    )
};

export default button;