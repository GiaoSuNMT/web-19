import React, { Component } from 'react';

class Info extends Component {
    render() {
        const styleChu = {
            color: "Red",
            fontWeight: "bold",
            width: "100%",
            borderBottom: "1px solid rgba(212, 205, 205,0.5)",
            padding: "10px 5px",
        }
        const styleChu2 = {
            color: "Red",
            fontWeight: "bold",
            width: "100%",
            padding: "10px 5px",
        }
        const stylePhong = {
            background: "#fff",
        }
        return (
            <div style={stylePhong}>
                <div style={styleChu}>
                    <div>
                        <div>
                            <h3 className="d-inline">{this.props.state.name}</h3>
                            <span className="pl-2">{this.props.state.age}</span>
                        </div>
                    </div>
                </div>
                {this.props.state.school == null ? null :
                    <div style={styleChu}>
                        <span>{this.props.state.school}</span>
                    </div>
                }

                {this.props.state.introduce === (null|| "") ?
                    <div style={styleChu2}>
                        <span>Thêm giới thiệu về bạn nào</span>
                    </div> :
                    <div style={styleChu2}>
                        <span>{this.props.state.introduce}</span>
                    </div>
                }
            </div>

        );
    }
}

export default Info;