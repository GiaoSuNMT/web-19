import React, { Component } from 'react';
import Navbar from "../components/homepage/Navbar";
import Main from "../components/homepage/Main";
import Login from "../components/homepage/LoginMobile";
import LoginTable from "../components/homepage/LoginTable";
import "../css/homepage.css"
class homepage extends Component {
    state = {
        isLogin: false
    }
    componentDidMount() {
        this.setState({
            isLogin : true
        })
    }
    
    _onLoginChange = (login) => {
        this.setState({
            isLogin: login
        });
    }
    render() {
        return (
            <div id="homepage">
                <div  className="container">
                    <Navbar onLoginChange={this._onLoginChange} />
                    <Main onLoginChange={this._onLoginChange} />
                    <Login />
                </div>
                {
                    this.state.isLogin === true ? <LoginTable onLoginChange={this._onLoginChange} /> : null
                }

            </div>

        );
    }
}

export default homepage;