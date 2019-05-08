import React, { Component } from 'react';
import Navbar from "./navbar"
import Infotable from "./infortable"
import { withRouter, Link, Route } from "react-router-dom"
class headsetting extends Component {
    
    render() {
        const styleBackground = {
            background: "#ffffff",
            borderRight: "1px solid rgba(212, 205, 205,0.5)",
        }
        const styleFontRed = {
            background: "#fd5068",
            borderBottom: "1px solid rgba(212, 205, 205,0.5)"
        }
        return (
            <div id="Headsetting" className="col-sm-12 col-md-3" style={styleBackground}>
                <div className="row align-items-center" style={styleFontRed}>
                    <Route  path="/app/profile" render={() => {
                        return (
                            <div onClick={this.props.handleGoBack} className="col-2 animated bounceInLeft faster">
                                <span className="close">&times;</span>

                            </div>
                        )
                    }} />

                    <Route  path="/app/setting" render={() => {
                        return (
                            <div onClick={this.props.handleGoBack} className="col-2 animated bounceInLeft faster">
                                <span className="close">&times;</span>
                            </div>
                        )
                    }} />
                     <Route  path="/app/message" render={() => {
                        return (
                            <div onClick={this.props.handleGoBack} className="col-2 animated bounceInLeft faster">
                                <span className="close">&times;</span>

                            </div>
                        )
                    }} />
                    <div className="col-2 ml-1 my-3">
                        <img className="rounded-circle" style={{height : "50px", width :"50px"}}src={this.props.state.avatarUrl[0]} alt="Unknown" />
                    </div>
                    <div className="col-7" >
                        <Link to="/app/profile" className="text-decoration-none" >
                            <h5 className="hvr-buzz-out"> Thông tin của tôi </h5>
                        </Link>
                    </div>

                </div>
                
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
                        state={this.props.state}
                        handleSetFriendId = {this.props.handleSetFriendId}
                        handleGetChoosenId={this.props.handleGetChoosenId}
                    />)
                }} />
                   <Route path="/app/message" render={() => {
                    return (<Navbar
                        changeMode={this.props.handleInfoMode}
                        mode={this.props.state.infoModeMess}
                        state={this.props.state}
                        handleGetChoosenId={this.props.handleGetChoosenId}
                        handleSetFriendId = {this.props.handleSetFriendId}
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
        );
    }
}
export default withRouter(headsetting);