import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';
import 'bootstrap/dist/css/bootstrap.css';
import './RegistrationPage.css';

var isLoginErr = false;
var isEmailErr = false;
var isPassErr = false;
var isRegistering = false;

class RegistrationPage extends Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      login: '',
      pass: '',
      email: '',
    }

    this.auth = new AuthService();
  }

  singUp(e) {
    e.preventDefault();
    isRegistering = true;
    this.setState({});
    this.auth.registration(this.state.login, this.state.email, this.state.pass)
      .then(res => {
        if (res.data.detail) {
          if (res.data.detail.email) { isEmailErr = true }
          else { isEmailErr = false };
          if (res.data.detail.login) { isLoginErr = true }
          else { isLoginErr = false };
          if (res.data.detail.password) { isPassErr = true }
          else { isPassErr = false };
        }
        isRegistering = false;
        this.setState({});
      })
  }

  regErr() {
    if (isEmailErr) return <div className="padTwoEm"><span className="error">email already exist</span></div>;
    if (isLoginErr) return <div className="padTwoEm"><span className="error">login already exist</span></div>;
    if (isPassErr) return <div className="padTwoEm"><span className="error">password is too short, minimum 8 symbols</span></div>;
  }

  render() {
    if (this.auth.loggedIn()) return <Redirect to="/" />
    else {
      while (!isRegistering) {
        return (
          <div className="registrationPage">
            <div className="errorBlock col-sm-4">
              {this.regErr()}
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
              <form className="form p-4" onSubmit={(e) => this.singUp(e)}>
                <label>Full Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.fullName || ""}
                  placeholder="Full Name"
                  onChange={(e) => { this.setState({ fullName: e.target.value }) }}
                />
                <label>Login</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.login || ""}
                  placeholder="Login"
                  onChange={(e) => { this.setState({ login: e.target.value }) }}
                />
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email || ""}
                  placeholder="Email"
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                />
                <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={this.state.pass || ""}
                  placeholder="Password"
                  onChange={(e) => { this.setState({ pass: e.target.value }) }}
                />
                <button type="submit" className="btn btn-primary">Register</button>
                <small id="emailHelp" className="form-text">
                  you already have an account? <Link className="linkToRegistration" to={{ pathname: '/login' }}>login</Link>
                </small>
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

export default RegistrationPage;
