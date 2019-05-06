import React, { Component } from 'react';

class button extends Component {
    render() {
        return (
            <div className="col-3 ml-auto">
            <label className="form-switch">
                  <input type="checkbox" />
                  <i> </i>
                </label>
            </div>
        );
    }
}

export default button;