import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './MainPage.css';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }

        this.auth = new AuthService();
    }

    componentDidMount() {
        let id = window.localStorage.getItem('user_id') || "";
        axios.post(`http://localhost:4000/api/get-user`, {
            id: id,
        })
            .then(res => {
                this.setState({
                    data: res.data.items[0].user
                })
            })
    }

    getDate() {
        if (this.state.data.created_at) {
            let date = this.state.data.created_at.replace('T', ' at ');
            let correctDate = date.replace('Z', ' ');
            return correctDate;
        }
        return null;
    }

    render() {
        while (!this.state.data.login) {
            return <div className="mainPage">
                <img className="loader" width="5%" src="http://www.myiconfinder.com/uploads/iconsets/256-256-d99178409b6b75afc4ba4785ccf4f2ba-loading.png" alt="loader" />
            </div>
        }
        if (!this.auth.loggedIn()) return <Redirect to="/login" />
        else {
            return (
                <div className="mainPage">
                    <div className="decorationBlock">
                        <div className="leftPalmTree col-sm-4">
                            <img className="col-sm-10" src="https://i.pinimg.com/originals/0a/fa/b4/0afab4ea8bc64db938644bc9e645e3b0.png" alt="palm tree" />
                        </div>
                        <div className="topLeftBirds col-sm-5">
                            <img className="col-sm-12" src="https://avatanplus.com/files/resources/original/572866b915e8015475d14302.png" alt="birds" />
                        </div>
                    </div>
                    <div className="userCard col-sm-6 p-4">
                        <h5>
                            Your login: {this.state.data.login}
                        </h5>
                        <h5>
                            Your email: {this.state.data.email}
                        </h5>
                        <h5>
                            Your account was created: {this.getDate()}
                        </h5>
                        <button className="btn btn-primary" onClick={() => {
                            this.auth.logout();
                            this.setState({});
                        }}>Logout</button>
                    </div>
                </div>
            );
        }
    }
}

export default MainPage;
