import React, { Component } from 'react';
import SwitchButton from "../common/button";
import GenderSetting from "./genderSetting";
import { BrowserRouter as Router, withRouter, Link, Route } from "react-router-dom";
class infortable extends Component {
    render() {
        return (
            <Router>
                <div id="info" className="animated slideInLeft delay-0.5s faster">
                    <div className="row">
                        <div className="col-7">
                            <span> Đang tìm kiếm </span>
                        </div>
                        <div className="col-3 ml-auto">
                            <Link to="/app/setting/gender">
                                <span> {this.props.setting.gender} </span>
                            </Link>
                        </div>
                    </div>
                    <hr />

                    <div>
                        <div className="row">
                            <div className="col-7">
                                <span> Độ tuổi </span>
                            </div>
                            <div className="col-3 ml-auto">
                                <span> 18 - {this.props.setting.age} </span>
                            </div>
                        </div>
                        <input onChange={this.props.handleChangeAge} type="range" className="custom-range" min="18" max="72" value={this.props.setting.age} step="1" />
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-8 ">
                            <span> Hiển thị tôi trên UET Tinder</span>
                        </div>
                        <SwitchButton />
                    </div>
                    <hr />

                    <div className="text-center">
                        <span> Thông báo </span>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            <span> Email </span>
                        </div>
                        <div className="col-3 ml-auto text-center">
                            <span> > </span>
                        </div>
                    </div>
                    <hr />
                    <div className="text-center">
                        <span> Thiết lập tài khoản </span>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            <span> Email </span>
                        </div>
                        <div className="col-3 ml-auto text-center">
                            <span> > </span>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-7">
                            <span> Số điện thoại </span>
                        </div>
                        <div className="col-3 text-center">
                            {
                                this.props.info.contact === "" ? <span> Thêm số điện thoại </span> : <span>  {this.props.info.contact}</span>
                            }
                        </div>
                    </div>
                    <hr />
                    <div className="text-center">
                        <span onClick={this.props.handleLogout}> Đăng xuất </span>
                    </div>
                </div>
                <Route path="/app/setting/gender" render={() => {
                    return (
                        <GenderSetting
                            handleChangeGender={this.props.handleChangeGender}
                        />)
                }} />
            </Router>
        );
    }
}

export default withRouter(infortable);