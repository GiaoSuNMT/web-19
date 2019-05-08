import React, { Component } from 'react';
import LoginByFb from './LoginByFb'
import LoginBySdt from "./LoginBySdt"
class LoginTable extends Component {
    state = {
        loginSdt: false
    }
    _closeLogin = () => {
        document.getElementById("logintable").style.display = "none";
        const login = false;
        this.props.onLoginChange(login);
        this.setState({
            loginSdt: false
        })
    }
    _logInWithContact = () => {
        this.setState({
            loginSdt: true
        })
    }
    render() {
        return (
            <div id="logintable" className="row mx-0 my-0">
                {
                    this.state.loginSdt === false ?
                        <LoginByFb closeLogin={this._closeLogin} logInWithContact={this._logInWithContact} /> :
                        <LoginBySdt closeLogin={this._closeLogin} />
                    }

            </div>
        );
    }
}

export default LoginTable;