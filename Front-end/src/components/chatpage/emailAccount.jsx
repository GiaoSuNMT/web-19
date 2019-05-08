import React, { Component } from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
class emailAccount extends Component {
    _handleVerify = async () => {
        await Axios({
            url: "http://localhost:3001/auth/verify-account",
            withCredentials: true,
            method: "post",
            data : {
                email : this.props.state.email
            }
        }).then(async res => {
            await Swal.fire({
                type: 'success',
                title: 'Xác minh',
                text: `Một email xác minh đã được gửi tới tài khoản ${this.props.state.email}`,
            });
            this.props.history.push("/app/profile")
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="animated slideInLeft delay-0.5s faster row">
                <div className="col-12 ml-3 mt-2">
                    <h4 style = {{ color: "red"}}> Email</h4>
                </div>
                <div className="col-12">
                    <div className="row align-items-baseline">
                        <div className="col-8 ml-3">
                            <h4 style = {{padding: "15px 0px 20px", fontWeight: "normal"}}>{this.props.state.email}</h4>
                        </div>
                        <div className="col-2 ml-auto">
                            <h3>
                                {
                                    this.props.state.verify === true ? <i className="fa fa-check-circle text-success"></i> : <i class="fa fa-times-circle text-danger"></i>
                                }
                            </h3>
                        </div>
                    </div>
                </div>
                <div onClick={this._handleVerify} className="col-12">
                    <div className="row ">
                        <div className="col-2 mx-3">
                            <h5><i className="fa fa-google" style = {{color: "blue", fontSize: "30px"}}></i></h5>
                        </div>
                        <div>
                            <h5 className="hvr-bounce-in" style= {{cursor: "pointer"}}> Xác minh với Google</h5>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter(emailAccount);