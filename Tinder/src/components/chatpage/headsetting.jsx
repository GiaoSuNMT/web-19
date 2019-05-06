import React, { Component } from 'react';
import Navbar from "./navbar"
import Infotable from "./infortable"
import { BrowserRouter as Router, withRouter, Link, Route } from "react-router-dom"
class headsetting extends Component {
    render() {
        return (
            <Router>
              
                    <div id="Headsetting" className="col-sm-12 col-md-3">
                        <div className="row align-items-center ">
                            <div onClick={this.props.handleGoBack} className="col-2">
                                {/* <Link to="/app/recs" className="text-decoration-none" > */}
                                <span className="close">&times;</span>
                                {/* </Link> */}
                            </div>

                            <div className="col-2">
                                <img className="rounded-circle" src={this.props.state.avatarUrl} alt="Unknown" />
                            </div>
                            <div className="col-8">
                                <Link to="/app/profile" className="text-decoration-none" >
                                    <h5> Thông tin của tôi </h5>
                                </Link>
                            </div>

                        </div>
                        <hr />
                        <Route path="/app/profile" render={() => {
                            return (<Infotable
                                mode={this.props.state.infoMode}
                                handleLogout={this.props.handleLogout}
                                handleChangeAge={this.props.handleChangeAge}
                                handleChangeGender={this.props.handleChangeGender}
                                info={this.props.state}
                                setting={this.props.state}
                            />
                            )
                        }} />
                        <Route path="/app/recs" render={() => {
                            return (<Navbar
                                changeMode={this.props.handleInfoMode}
                                mode={this.props.state.infoModeMess}
                                state = {this.props.state}
                            />)
                        }} />
                        <Route path="/app/setting" render={() => {
                            return (<Infotable
                                mode={this.props.state.infoMode}
                                handleLogout={this.props.handleLogout}
                                handleChangeAge={this.props.handleChangeAge}
                                handleChangeGender={this.props.handleChangeGender}
                                info={this.props.state}
                                setting={this.props.state}
                            />)
                        }} />
                    </div>
            </Router>
        );
    }
}
export default withRouter(headsetting);