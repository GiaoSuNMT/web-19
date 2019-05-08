import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class imageItem extends Component {

    handleClick = () => {
       this.props.handleSetFriendId(this.props.user._id);
       this.props.handleChangeMode();
    }
    render() {
        const styleImage = {
            height : "15vh",
            background: `url(${this.props.user.avatarUrl[0]})
            no-repeat center center fixed`,
            backgroundSize: "cover",
            width : "100%"
        }
        const styleP = {
            position : "absolute",
            bottom : "-10px",
            left : "2px",
            color : "white",
            fontWeight : "bold"
        }
        return (
            <Link to="/app/message" className="mx-auto w-50 mt-3">
            <div onClick={this.handleClick} style={styleImage} className="col-8 mx-4 hvr-grow">
                <p style={styleP}> {this.props.user.name}</p>
            </div>
            </Link>
        );
    }
}

export default imageItem;