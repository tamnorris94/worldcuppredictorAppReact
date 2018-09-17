import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render () {
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuthenticated} admin={this.props.admin}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        admin: state.auth.admin
    };
};

export default connect( mapStateToProps )( Layout );