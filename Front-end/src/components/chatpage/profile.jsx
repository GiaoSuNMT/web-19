import React, { Component } from 'react';
import { withRouter, Link, Route } from "react-router-dom"
import EditProfile from "./editprofile"
import Card from "./card"
class profile extends Component {
    render() {
        return (
            <div className="animated fadeIn mx-auto my-auto">
                <Route exact path="/app/profile" render={() => {
                    return (
                    <div>
                        <Card state={this.props.state} />
                    <Link to="/app/profile/edit" className="text-decoration-none d-flex justify-content-around  align-items-center" >
                        <button className="animated fadeIn my-4 text-white btn btn-grad text-center btn-lg col-8 mx-auto register"> Sửa thông tin </button>
                    </Link>
                    </div>
                    )
                }} />
                <Route exact path="/app/profile/edit" render={() => {
                    return (<EditProfile
                        state={this.props.state}
                    />)
                }} />
            </div>
        );
    }
}

export default withRouter(profile);