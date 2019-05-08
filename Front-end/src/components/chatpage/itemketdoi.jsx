import React, { Component } from 'react';
import ImageItem from "./imageItem"
class itemketdoi extends Component {
    state = {
        listItem: this.props.state.listItemMatch
    }
    render() {
        return (
            <div className="col-12 my-2 animated fadeIn row d-flex justify-content-between">
                {
                    this.state.listItem ?
                   Array.from(this.state.listItem).map((item,index)=>{
                      return  <ImageItem handleChangeMode={this.props.handleChangeMode} handleSetFriendId={this.props.handleSetFriendId} key={index} user={item} />
                   }) : <h1> Tích cực thả thính nào </h1>
                }
            </div>
        );
    }
}

export default itemketdoi;