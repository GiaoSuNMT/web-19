import React, { Component } from 'react';
import Card from "../chatpage/card"
import EditProfile from "./editprofile"
import { BrowserRouter as Router, withRouter, Route } from "react-router-dom";
import ChatTable from "./chattable";
class rightSide extends Component {
    render() {
        return (

            <div className="row">
                {/* <Router>
                     <Route path='/app/profile' component={Card} />
                </Router>
                 <Card state={this.props.state}/> 
                <EditProfile  state={this.props.state} /> */}
                <ChatTable state={this.props.state} />
            </div>

        );
    }
}

export default withRouter(rightSide);