//import axios from 'axios';
import * as actionTypes from './actionTypes';
import axios from '../../axios-wcpredict';
import 'firebase/database';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, userName) => {
    let admin = false;
    if(userId === "IbYdTYwXagXjBRlN8ookuV0kxW82"){
        admin = true;
    }
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userName: userName,
        admin: admin
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, userName, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let authData = null;
        if(!isSignup){
            authData = {
                email: email,
                password: password,
                returnSecureToken: true
            };
        }
        else {
            authData = {
                email: email,
                password: password,
                displayName: userName,
                returnSecureToken: true
            };
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC3qNB23YlGeE9CNLvBGOBdOHoQGYUT7Gc';
        if(!isSignup){
            url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC3qNB23YlGeE9CNLvBGOBdOHoQGYUT7Gc';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('userName', response.data.displayName);
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.displayName));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const userName = localStorage.getItem('userName');
                dispatch(authSuccess(token, userId, userName));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};