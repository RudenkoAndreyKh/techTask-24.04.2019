import React from 'react';
import JWT from "jsonwebtoken";
import axios from 'axios';

export default class AuthService extends React.Component {

    constructor() {
        super();
        this.state = {

        };
        this.login = this.login.bind(this);
    };

    login(email, password) {
        return axios.post(`http://localhost:4000/api/login`, {
            email,
            password
        })
            .then((response) => {
                if(response.data.token !== undefined) {
                    this.setUserId(response.data.id)
                    this.setToken(response.data.token)
                };
                return Promise.resolve(response);
            });
    };

    registration(login, email, password) {
        return axios.post(`http://localhost:4000/api/registration`, {
            login,
            password,
            email,
        }
        )
            .then((response) => {
                if(response.data.token !== undefined) {
                    this.setUserId(response.data.id)
                    this.setToken(response.data.token)
                };
                return Promise.resolve(response);
            });
    };

    loggedIn() {
        const token = this.getToken();
        return !!token && this.isTokenExpired(token);
    };

    isTokenExpired(token) {
        try {
            const decoded = JWT(token);
            if (decoded.exp > (Date.now() / 1000)) {
                return false;
            }
            else
                return true;
        }
        catch (err) {
            return true;
        };
    };

    setUserId(user_id) {
        if (typeof (window) !== "undefined") {
            window.localStorage.setItem('user_id', JSON.stringify(user_id))
        };
    };

    setToken(idToken) {
        if (typeof (window) !== "undefined") {
            window.localStorage.setItem('id_token', JSON.stringify(idToken))
        };
    };

    getToken() {
        if (typeof (window) !== "undefined") {
            return window.localStorage.getItem('id_token') || "";
        };
    };

    logout() {
        if (typeof (window) !== "undefined") {
            window.localStorage.removeItem('user_id');
            window.localStorage.removeItem('id_token');
        };
    };
}