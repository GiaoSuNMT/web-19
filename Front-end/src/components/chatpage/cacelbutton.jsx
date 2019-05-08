import React, { Component } from 'react';

class CancelButton extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleCancel} className="hvr-grow emotion" type="button"><i id="cancel" className="fa fa-times"></i></button>
            </div>
        );
    }
}

export default CancelButton;