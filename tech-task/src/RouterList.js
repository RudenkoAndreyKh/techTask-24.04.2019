import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';

export default class RouterList extends Component{
    render(){
        return(
            <BrowserRouter>
                <Route exact path='/' component={MainPage} /> 
                <Route path='/registration' component={RegistrationPage} />
                <Route path='/login' component={LoginPage} />
            </BrowserRouter>
        )
    }
}