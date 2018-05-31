import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render () {
        return (
            <Auxiliary>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;