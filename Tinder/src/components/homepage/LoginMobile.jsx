import React, { Component } from 'react';
import Buttonlogin from "./Buttonlogin"
class login extends Component {
    render() {
        return (
            <div className="row d-md-none d-sm-block">
                <div className="mx-auto text-center">
               
                    <Buttonlogin />
                    <div className="col-12 info">
                        <span> Sự cố khi đăng nhập ?</span>
                        <br />
                        <h3> Chúng tôi không đăng bất cứ thông tin nào lên Facebook</h3>
                    </div>
                </div>
            </div>

        );
    }
}

export default login;       