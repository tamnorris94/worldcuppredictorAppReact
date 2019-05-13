import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../Store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'User Name'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                disabled: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        authFormValid: false,
        errorMessage: "",
        submitting: false
    }

    componentDidMount () {
            this.props.onSetAuthRedirectPath();
    }

    // componentWillReceiveProps(nextProps){
    //     console.log("componentWillReceiveProps What is nextProps.error? " + JSON.stringify(nextProps.error));
    //     console.log("componentWillReceiveProps What is this props.error? " + JSON.stringify(this.props.error))
    //     // console.log("componentWillReceiveProps What is nextProps.error? " + nextProps.error.message);
    //     // console.log("componentWillReceiveProps What is this props.error.message? " + this.props.error.message)
    //     if (nextProps.error !== this.props.error) {
    //         this.setState({ errorMessage : nextProps.error.message })
    //     }
    // }

    static getDerivedStateFromProps(nextProps, prevState){
        let newError = null;
        if(nextProps.error != null){
            newError = nextProps.error.errors[0].message;
        }
        if(newError!==prevState.errorMessage){
            return { errorMessage: newError};
        }
        else return null;
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevProps.error!==this.props.error){
    //         //Perform some operation here
    //         this.setState({errorMessage: this.props.error});
    //         this.classMethod();
    //     }
    // }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    // submitAuthentication = () => {
    //     this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.controls.userName.value, this.state.isSignup );
    // }

    // submitHandler = ( event ) => {
    //     event.preventDefault();
    //     if(this.state.isSignup && this.state.controls.userName.value == ""){
    //         console.log("There's an error");
    //         this.state.errorMessage = "You must enter username to signup";
    //     }
    //     else{
    //         this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.controls.userName.value, this.state.isSignup );
    //     }
    // }

    submitAuthentication = () => {
        if(this.state.isSignup && this.state.controls.userName.value == ""){
            console.log("There's an error");
            //this.state.errorMessage = "You must enter username to signup";
        }
        else{
            console.log("Does it submit onAuth action?")
            this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.controls.userName.value, this.state.isSignup );
        }
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.setState({
            submitting: true
        })
        if(this.state.isSignup && this.state.controls.userName.value == ""){
            this.setState({
                errorMessage: "You must enter a username to sign up"
            })
        }
        else{
            this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.controls.userName.value, this.state.isSignup );
        }
    }

    switchAuthModeHandler = () => {
        const userNameEnabledProperty = this.state.controls.userName.disabled;
        const toggleUserNameDisable = updateObject( this.state.controls, {
            userName: updateObject( this.state.controls.userName, {
                disabled: !userNameEnabledProperty
            } )
        } );
        this.setState( prevState => {
            return { isSignup: !prevState.isSignup,
                controls: toggleUserNameDisable
            };
        } );
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
            console.log()
        }

        let form = formElementsArray.map( formElement => (
            //console.log("What does form element look like " + formElement)
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                disabled={formElement.config.disabled}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if ( this.props.loading ) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(!this.state.errorMessage==""){
            errorMessage = (
                     <p>{this.state.errorMessage}</p>
            );
        }

        // if(this.state.isSignup && this.state.controls.userName.value == "" && this.state.submitting){
        //     errorMessage = (
        //         <p>You must enter a username to sign up</p>
        //     );
        // }

        // if( this.props.error ) {
        //     errorMessage = (
        //         <p>{this.props.error.message}</p>
        //     );
        // }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"
                     >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, userName, isSignup ) => dispatch( actions.auth( email, password, userName, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );