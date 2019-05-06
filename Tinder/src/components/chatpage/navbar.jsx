import React, { Component } from 'react';
import ItemMes from "./itemmes"
import ItemKetdoi from "./itemketdoi"
class navbar extends Component {
    ChangeLoveMode = () => {
        const mode = false;
        this.props.changeMode(mode)
    };
    ChangeMessMode = () => {
        const mode = true;
        this.props.changeMode(mode)
    };
    render() {
        return (
            <div className="row animated fadeIn">
                <div className="col-7">
                    <ul className="nav nav-fill">
                        <li onClick={this.ChangeLoveMode} className="nav-item">
                            <span > Kết đôi </span>
                        </li>
                        <li onClick={this.ChangeMessMode} className="nav-item">
                            <span  > Tin nhắn</span>
                        </li>
                    </ul>
                </div>
                {
                    this.props.mode === false ? <ItemKetdoi state={this.props.state}/> : <ItemMes/>
                }
            </div>
        );
    }
}

export default navbar;