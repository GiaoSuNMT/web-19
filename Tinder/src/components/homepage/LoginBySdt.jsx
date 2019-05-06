import React, { Component } from 'react';
import swal from "sweetalert"
import Axios from 'axios';
import { withRouter} from "react-router-dom"
class LoginContactTable extends Component {
    handleClick = (e) => {
        const sdt = document.getElementById("sdt").value;
        if (sdt === "") {
            swal({
                title: "No No No!",
                text: "Để trống là không được",
                icon: "info",
                button: "Làm lại nào",
            });
        }
        Axios({
            url: "http://localhost:3001/auth/loginSms",
            withCredentials: true,
            method: "post",
            data: {
                contact: sdt
            }
        }).then((res) => {
            if (res.data.isValid) {
                swal({
                    title: "Bậy rồi!",
                    text: "Số điện thoại chưa được đăng ký",
                    icon: "error",
                    button: "Back",
                });
            } else if (res.data.isValid === false) {
                swal({
                    title: "Bậy rồi!",
                    text: "Số điện thoại không hợp lệ",
                    icon: "error",
                    button: "Back",
                });
            }
            else {
                swal({
                    title: "OK",
                    text: "Vui lòng nhập mã OTP",
                    content: "input",
                    icon: "info",
                    button: "Let's go",
                }).then((code) => {
                    Axios({
                        url: "http://localhost:3001/auth/checkOTP",
                        withCredentials: true,
                        method: "post",
                        data: {
                            OTP: code
                        }
                    }).then(async res => {
                        if(res.data.success){
                            await swal("OTP Correct", "Ấn OK để khám phá nào", "success");
                            this.props.history.push("/app/recs");
                        }
                        else{
                            swal("OTP Incorrect", "Ấn OK để khám phá nào", "error");
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div id="login" className="mx-auto my-auto text-center col-md-4 align-items-center ">
                <span onClick={this.props.closeLogin} className="close">&times;</span>
                <div className="col-12 my-4">
                    <img src="https://tinder.com/static/build/80ab7bdae3b4132925e4bcf99b6aa46a.svg" alt="logo" />
                </div>
                <div className="my-5">
                    <h3> Nhập số điện thoại di động của bạn </h3>
                </div>
                <div className="row">
                    <div className="col-3  mt-2 sdt">
                        <span> VN </span>
                    </div>
                    <div className="col-2  mt-2 sdt">
                        <span>
                            +84
                            </span>
                    </div>
                    <div className="col-5 sdt mb-4">
                        <input className="form-control" id="sdt" type="text"></input>
                    </div>
                </div>
                <button onClick={this.handleClick} className="my-4 text-white btn btn-grad text-center btn-lg col-12 mx-auto register d-md-block"> TIẾP TỤC </button>
            </div>
        );
    }
}

export default withRouter(LoginContactTable);