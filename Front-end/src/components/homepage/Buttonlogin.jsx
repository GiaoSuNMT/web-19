import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import { withRouter} from "react-router-dom"
import axios from 'axios'
class Buttonlogin extends Component {
    state = {
        accessToken : '',
        isLoggedIn: false,
        fbId: '',
        name: '',
        email: '',
        avatarUrl: '',
    }
    responseFacebook = async response => {
        this.setState({
            accessToken : response.accessToken,
            isLoggedIn: true,
            name: response.name,
            fbId: response.id,
            email: response.email,
            avatarUrl: response.picture.data.url
        });
        axios({
            url: "http://localhost:3001/auth/loginfb",
            withCredentials : true,
            method: "post",
            data: {
                userFb: this.state
            }
        }).then(async (res)=>{
            this.props.history.push("/app/recs");
        }).catch(err=>{
            console.log(err);
        })
    }
    componentClicked = () => {
        console.log("Clicked");
    }

    // Login SDT
    render() {
        let fbcontent;
        if (this.state.isLoggedIn) {} else {
            fbcontent = (
                <FacebookLogin
                    appId="366682473944301"
                    autoLoad={false}
                    cssClass="col-12 btn btn-lg loginfb my-1 "
                    fields="name,email,picture"
                    icon="fa-facebook"
                    cookie="true"
                    scope="user_birthday, user_gender"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
            )
        }
        return (
            <div>
                {fbcontent}
                <button onClick={this.props.logInWithContact} className="col-12 btn btn-lg loginsdt my-1 mb-5"> ĐĂNG NHẬP VỚI SỐ ĐIỆN THOẠI</button>
            </div>
        );
    }
}

export default withRouter(Buttonlogin);