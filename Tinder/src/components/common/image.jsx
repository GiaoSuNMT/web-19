import React, { Component } from 'react';

class image extends Component {
    render() {
        return (
            <div className="col-12 text-center" >
                <img src={this.props.url} alt="abc"/>
            </div>
        );
    }
}

export default image;
