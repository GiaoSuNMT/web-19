import React, { Component } from 'react';
import SwitchButton from "../common/button";
import GenderSetting from "./genderSetting";
import EmailAccount from "./emailAccount";
import PhoneAccount from "./phoneAccount";
import {  withRouter, Link, Route } from "react-router-dom";
class infortable extends Component {
    render() {
        const styleRow = {
            padding: "20px 0px",
            borderBottom: "1px solid rgba(212, 205, 205,0.5)"
        }
        const styleTieude = {
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "red"
        }

        return (

            <div id="info" className="row animated slideInLeft delay-0.5s faster">
                <Route path="/app/profile" render={() => {
                    return (
                        <div className="col-12">
                            <div className="row" style={styleRow}>
                                <span className="ml-2" style={styleTieude}> Cài đặt tìm kiếm </span>
                            </div>
                                <div className="row"  style={styleRow} >
                                    <div className="ml-2">
                                        <span> Đang tìm kiếm </span>
                                    </div>
                                    <div className="ml-auto mr-2">
                                        <Link to="/app/setting/gender" className="text-decoration-none">
                                            <span> {this.props.setting.gender} </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="row" style={styleRow} >
                                    <div className="ml-2">
                                        <span> Độ tuổi </span>
                                    </div>
                                    <div className="ml-auto mr-2">
                                        <span> 18 - {this.props.setting.rangeAge} </span>
                                    </div>
                                    <input onChange={this.props.handleChangeAge} type="range" className="custom-range mx-2" min="18" max="72" value={this.props.setting.rangeAge} step="1" />
                                </div>
                            
                            <div className="row" style={styleRow}>
                                <div className="ml-2">
                                    <span> Hiển thị tôi trên UET Tinder</span>
                                </div>
                                <SwitchButton status={!this.props.setting.status} />
                            </div>

                            <div className="row" style={styleRow}>
                                <span className="ml-2" style={styleTieude}> Thiết lập tài khoản </span>
                            </div>

                            <div className="row" style={styleRow}>
                                <div className="ml-2">
                                    <span> Email </span>
                                </div>
                                <div className="ml-auto mr-2" >
                                    <Link to="/app/setting/emailAccount" className="text-decoration-none"   >

                                        <span> {this.props.info.email} </span>
                                    </Link>
                                </div>
                            </div>

                            <div className="row" style={styleRow}>
                                <div className="ml-2">
                                    <span> Số điện thoại </span>
                                </div>
                                <div className="ml-auto mr-2">
                                    <Link to="/app/setting/phoneAccount" className="text-decoration-none" >

                                        {
                                            this.props.info.contact === null ? <span> Thêm SĐT </span> : <span>  {this.props.info.contact}</span>
                                        }
                                    </Link>
                                </div>
                            </div>

                            <div className="row" style={{padding: "15px 0 15px 0"}}>
                                <span className="mx-auto" onClick={this.props.handleLogout} style={styleTieude}>Đăng xuất </span>
                            </div>
                        </div>
                    )
                }} />
                <Route path="/app/setting/phoneAccount" render={() => {
                    return (
                        <PhoneAccount
                            state={this.props.info}
                        />
                    )
                }} />
                <Route path="/app/setting/emailAccount" render={() => {
                    return (
                        <EmailAccount
                            state={this.props.info}
                        />
                    )
                }} />
                <Route path="/app/setting/gender" render={() => {
                    return (
                        <GenderSetting
                            handleChangeGender={this.props.handleChangeGender}
                        />)
                }} />
            </div>
        );
    }
}

export default withRouter(infortable);