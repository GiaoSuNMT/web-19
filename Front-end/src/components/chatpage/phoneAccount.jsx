import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import Axios from 'axios';
class phoneAccount extends Component {
    _handleChangeContact = async (type) => {
        if (!this.props.state.contact || (this.props.state.contact && type == "change")) {
            await Swal.fire({
                title: 'Nhập số điện thoại của bạn',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                inputPlaceholder: "+84",
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Không',
                confirmButtonColor: '#fd267d',
                showLoaderOnConfirm: true,
                preConfirm: async (login) => {
                    await Axios({
                        url: "http://localhost:3001/auth/changeContact",
                        withCredentials: true,
                        method: "post",
                        data: {
                            contact: login
                        }
                    }).then(async res => {
                        if (res.data.isValid) {
                            await Swal.fire({
                                type: 'success',
                                title: 'Thành công',
                                text: 'Thay đổi số điện thoại thành công',
                                confirmButtonColor: '#fd267d',
                            })
                            this.props.history.goBack();
                        }
                        else {
                            await Swal.fire({
                                type: 'error',
                                title: 'Thất bại',
                                text: 'Số điện thoại không hợp lệ',
                                confirmButtonColor: '#fd267d',
                              })
                        }
                    }).catch(err => {
                        console.log(err.message);
                    })
                },
            })
        }
    }
    render() {
        return (
            <div className="animated slideInLeft delay-0.5s faster row">
                <div className="col-12 mt-3 ml-3" style={{ color: "red" }}>
                    <h5> Số điện thoại</h5>
                </div>
                <div className="col-12">
                    <div className="row align-items-baseline">
                        <div onClick={() => { return this._handleChangeContact("add") }} className="col-9 ml-3 mt-2 " style={{ cursor: "pointer" }}>
                            <h5>+{this.props.state.contact || "Thêm số điện thoại"}</h5>
                        </div>
                        <div className="col-2 ml-auto">
                            <h3>
                                {
                                    this.props.state.contact ? <i className="fa fa-check-circle text-success"></i> : <i className="fa fa-times-circle text-danger"></i>
                                }
                            </h3>
                        </div>
                    </div>
                </div>
                <div onClick={() => { return this._handleChangeContact("change") }} className="col-12">
                    <div className="row mt-2">
                        <div className="col-2 mx-3">
                            <h5 style={{ fontSize: "30px", color: "blue" }}><i className="fa fa-phone"></i></h5>
                        </div>
                        <div className="mt-1">
                            <h5 className="hvr-bounce-in" style={{ cursor: "pointer" }}> Thay đổi số điện thoại</h5>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter(phoneAccount);