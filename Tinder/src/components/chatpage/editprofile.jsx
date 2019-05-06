import React, { Component } from 'react';
import Image from "../common/image"
import Axios from 'axios';
import UploadImage from "./uploadImage"
class editprofile extends Component {
    state={
        upload : false
    }
    handleUpload=()=>{
        if(this.state.upload === false)
            this.setState({
                upload : true
            })
        else {
            this.setState({
                upload : false
            })
        }
    }
    EditProfile = () => {
        Axios({
            url: "http://localhost:3001/auth/editProfile",
            withCredentials: true,
            method: "post",
            data: {
                gender: document.getElementById("gender").value,
                school: document.getElementById("school").value,
                introduce: document.getElementById("introduce").value,
                _id : this.props.state._id
            }
        }).then((res) => {
            console.log("OK")
        }).catch(err => {
            console.log(err)
        });

    }
    render() {
        return (
            <div>
                <div className="row">
                    <Image url={this.props.state.avatarUrl} />
                    <button onClick={this.handleUpload}className="col-12 btn btn-lg loginfb my-2"> Demo </button>
                </div>
                {
                    this.state.upload === true ? <UploadImage userId={this.props.state._id} /> : null
                }
                <div className="row">
                    <div className="col-12 text-left title">
                        <p> Giới thiệu {this.props.state.name}</p>
                    </div>
                    <div className="col-12">
                        <textarea id="introduce" maxLength="500" style={{ width: '100%', height: '45px' }}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-left title">
                        <p> Trường </p>
                    </div>
                    <div className="col-12">
                        <input id="school" className="col-12" defaultValue="Trường" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-left title">
                        <p> Giới tính </p>
                    </div>
                    <div className="col-12">
                        <input id="gender" className="col-12" placeholder={this.props.state.usergender} />
                    </div>
                </div>
                <button onClick={this.EditProfile} className="my-4 text-white btn btn-grad text-center btn-lg col-3 mx-auto register d-sm-none d-md-block"> Lưu </button>
            </div>
        );
    }
}

export default editprofile;