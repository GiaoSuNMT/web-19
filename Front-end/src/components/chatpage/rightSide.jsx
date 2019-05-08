import React, { Component } from 'react';
import Card from "../chatpage/card"
import Profile from "./profile"
import ChatTable  from "./chattable"
import {  withRouter, Route } from "react-router-dom";
class rightSide extends Component {
    render() {
        const styleBackground = {
            background: "#f5f7fa",
            margin: "0",
        }
        return (

            <div className="row col-9" style = {styleBackground}>
                    <Route path='/app/recs' render={()=>{
                       return ( <Card 
                        state={this.props.state} 
                        />
                       )
                    }}/>
                    <Route path='/app/message' render={()=>{
                       return ( <ChatTable 
                        handleGetMessage={this.props.handleGetMessage}
                        state={this.props.state} />
                       )
                    }}/>
                    <Route path='/app/profile' render={()=>{
                       return ( <Profile 
                        state={this.props.state} />
                       )
                    }}/>
            </div>

        );
    }
}

export default withRouter(rightSide);