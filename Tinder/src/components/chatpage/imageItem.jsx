import React, { Component } from 'react';

class imageItem extends Component {
    render() {
        return (
            <div className="col-3 text-center mx-4 hvr-grow">
                <p> {this.props.user.name}</p>
            </div>
        );
    }
}

export default imageItem;