import React, { Component } from 'react';
import ItemMes from "./itemmes"
import ItemKetdoi from "./itemketdoi"
import {Link} from 'react-router-dom'
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
                <div className="col-12">
                    <ul className="nav nav-fill mr-2 mt-3" style = {{fontWeight: "bold", cursor: "pointer", fontSize: "20px"}}>
                        <li onClick={this.ChangeLoveMode} className="nav-item hvr-underline-from-center" style = {{paddingLeft: "10px"}}>
                        <Link to="/app/recs" style={{color:"#212529", textDecoration:"none"}}>
                            <span > Kết đôi </span>
                            </Link>
                        </li>
                        <li onClick={this.ChangeMessMode} className="nav-item hvr-underline-from-center " style={{listStyle:"none"}}>
                            <Link to="/app/message" style={{color:"#212529", textDecoration:"none"}}><span> Tin nhắn</span>  </Link>
                        </li>
                    </ul>
                </div>
                {
                    this.props.mode === false ? <ItemKetdoi handleChangeMode={this.ChangeMessMode} handleSetFriendId={this.props.handleSetFriendId} state={this.props.state}/> : <ItemMes handleGetChoosenId={this.props.handleGetChoosenId} state={this.props.state}/>
                }
            </div>
        );
    }
}

export default navbar;