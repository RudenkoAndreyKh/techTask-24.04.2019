import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import AuthService from '../services/AuthService';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginPage.css';

var isError = false;

var isLoggining = false;

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      pass: '',
      email: '',
    }

    this.auth = new AuthService();
  }

  login(e) {
    e.preventDefault();
    isLoggining = true;
    this.setState({});
    this.auth.login(this.state.email, this.state.pass)
      .then(res => {
        if (res.data) {
          if (res.data.message) { isError = true }
          else { isError = false };
          isLoggining = false;
          this.setState({});
        }
      })
  }

  loginErr() {
    if (isError) { return <div className="padTwoEm"><span className="error">wrong email or password</span></div> };
  }

  render() {
    if (this.auth.loggedIn()) return <Redirect to="/" />
    else {
      while (!isLoggining) {
        return (
          <div className="loginPage">
            <div className="errorBlock col-sm-4">
              {this.loginErr()}
            </div>
            <div className="decorationBlock">
              <div className="leftPalmTree col-sm-4">
                <img className="col-sm-10" src="https://i.pinimg.com/originals/0a/fa/b4/0afab4ea8bc64db938644bc9e645e3b0.png" alt="palm tree" />
              </div>
              <div className="topLeftBirds col-sm-5">
                <img className="col-sm-12" src="https://avatanplus.com/files/resources/original/572866b915e8015475d14302.png" alt="birds" />
              </div>
            </div>
            <div className="formDecoration col-sm-4">
              <form className="form p-4" onSubmit={(e) => this.login(e)}>
                <label>Email</label>
                <input className="form-control" type="email" value={this.state.email || ""} placeholder="Login" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                <label>Password</label>
                <input className="form-control" type="password" value={this.state.pass || ""} placeholder="Password" onChange={(e) => { this.setState({ pass: e.target.value }) }} />
                <button type="submit" className="btn btn-primary">Login</button>
                <small id="emailHelp" className="form-text">or create a new account. <Link className="linkToLogin" to={{ pathname: '/registration' }}>registration</Link></small>
              </form>
            </div>
          </div>
        );
      }
      
      return <div className="mainPage">
        <img className="loader" width="5%" src="http://www.myiconfinder.com/uploads/iconsets/256-256-d99178409b6b75afc4ba4785ccf4f2ba-loading.png" alt="loader" />
      </div>
    }
  }
}

export default LoginPage;
