import React, { Component } from 'react';

class LikeButton extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleLike} className="hvr-grow emotion" type="button"><i id="like" className="fa fa-heart"></i></button>
            </div>
        );
    }
}

export default LikeButton;