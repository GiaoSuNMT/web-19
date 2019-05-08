import React, { Component } from 'react';
import LeftSide from "../components/chatpage/headsetting"
import RightSide from "../components/chatpage/rightSide"
import { BrowserRouter as Router, withRouter } from "react-router-dom"
import Axios from 'axios';
import "../css/chatpage.css"
class chatpage extends Component {
    state = {
        _id: '',
        name: '',
        email: '',
        contact: '',
        avatarUrl: '',
        age: '',
        rangeAge: '',
        introduce: '',
        school: '',
        verify: null,
        usergender: '',
        status: '',
        gender: null,
        infoModeMess: null,
        listItemMatch: null,
        listMessage : null,
        friendId: null,
        chooseId : null,
    }
    async componentWillMount() {
        await Axios({
            url: "http://localhost:3001/auth/getId",
            withCredentials: true,
            method: "get",
        }).then(async (res) => {
            if (res.data.logout) { this.props.history.push('/') ; window.location.reload()    }
            else {
                const current = new Date().getFullYear();
                const birth = new Date(res.data.user.birthday).getFullYear();
                await this.setState({
                    _id: res.data.user._id,
                    status: res.data.user.isHide,
                    verify: res.data.user.verify,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    introduce: res.data.user.introduce,
                    school: res.data.user.school,
                    contact: res.data.user.contact,
                    avatarUrl: res.data.user.avatarUrl,
                    usergender: res.data.user.gender,
                    gender: res.data.user.lookingGender,
                    age: current - birth,
                    rangeAge: res.data.user.rangeAge,
                });
            }
        }).catch(err => {
            console.log(err);
        })
        await Axios({
            url: "http://localhost:3001/auth/getInfoPeople",
            withCredentials: true,
            method: "get",
        }).then(res => {
            this.setState({
                listItemMatch: JSON.parse(res.data)
            })
        }).catch(err => {
            console.log(err);
        })
    }
 
    //lay id nguoi nhan tin
    _handleGetChoosenId=async (id)=>{
       await  this.setState({
            chooseId : id
        })
        console.log(this.state.chooseId)
    }
    _handleGetMessage = (listarray)=>{
        this.setState({
            listMessage : listarray
        })
    }
    _handleChangeAge = (e) => {
        this.setState({
            rangeAge: e.target.value
        })
    };
    _handleChangeGender = (gender) => {
        this.setState({
            gender: gender
        })
    }
    _handleLogout = () => {
        Axios({
            url: "http://localhost:3001/auth/logout",
            withCredentials: true,
            method: "get",
        }).then(async (res) => {
            await this.props.history.push("/");
        }).catch(err => {
            console.log(err);
        })
    };
    _handleInfoMode = (mode) => {
        this.setState({
            infoModeMess: mode
        })
    }
    _handleGoBack = async () => {
        await Axios({
            url: "http://localhost:3001/auth/updateSetting",
            withCredentials: true,
            method: "post",
            data: {
                rangeAge: this.state.rangeAge,
                lookingGender: this.state.gender
            }
        }).then(res => {
        }).catch(err => {
            console.log(err.message)
        })
        this.props.history.goBack();
    }

    _handleSetFriendId = (id) => {
        this.setState({
            friendId : id
        })
    }
    render() {
        return (
            <div style={{ margin: "0", padding: "0" }} className="row">
                <Router>
                    <LeftSide
                        state={this.state}
                        handleChangeAge={this._handleChangeAge}
                        handleChangeGender={this._handleChangeGender}
                        handleGoBack={this._handleGoBack}
                        handleInfoMode={this._handleInfoMode}
                        handleSetFriendId={this._handleSetFriendId}
                        handleLogout={this._handleLogout}
                        handleGetChoosenId={this._handleGetChoosenId}
                    />
                    <RightSide
                        state={this.state}
                        handleGetMessage={this._handleGetMessage}
                    />
                </Router>
            </div>
        );
    }
}

export default withRouter(chatpage);