import React, { Component } from 'react';
import Buttonlogin from "./Buttonlogin"
class LoginByFb extends Component {
    render() {
        return (
            <div id="login" className="mx-auto my-auto text-center col-md-4">
                <span onClick={this.props.closeLogin} className="close">&times;</span>
                    <div className="col-12 my-4">
                        <img src="https://tinder.com/static/build/80ab7bdae3b4132925e4bcf99b6aa46a.svg" alt="logo" />
                    </div>
                    <div className="my-5">
                        <h3> BẮT ĐẦU </h3>
                    </div>
                    <div>
                        <p> Khi nhấp vào Đăng ký, bạn đồng ý với
                        <a href="https://xem.vn/"> <span> Điều khoản dịch vụ. </span></a>
                            Tìm hiểu cách chúng tôi xử lý dữ liệu của bạn trong
                        <a href="https://xem.vn/"><span> Chính sách quyền riêng tư </span></a>
                            và cách chúng tôi dùng cookie cũng như công nghệ tương tự trong
                        <a href="https://xem.vn/"><span> Chính sách cookie của chúng tôi </span></a>
                        </p>
                    </div>
                    <Buttonlogin logInWithContact={this.props.logInWithContact} />
            </div>
        );
    }
}

export default LoginByFb;