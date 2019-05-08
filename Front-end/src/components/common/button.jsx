import React, { Component } from 'react';
import Axios from 'axios';

class button extends Component {
    state = {
        status: this.props.status
    }
    _handleClick = async (evt) => {
        await this.setState({
            status: evt.target.checked
        })
        await Axios({
            url: "http://localhost:3001/auth/changeStatus",
            withCredentials: true,
            method: "post",
            data: {
                status: this.state.status
            }
        }).then(res => { }).catch(err => { console.log(err) })
    }
    render() {
        return (
            <div className="ml-auto mr-2">
                <label className="form-switch">
                    <input onChange={this._handleClick} type="checkbox" checked={this.state.status} />
                    <i> </i>
                </label>
            </div>
        );
    }
}

export default button;