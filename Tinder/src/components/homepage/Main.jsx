import React, { Component } from 'react';
class Main extends Component {
    handleClick = () => {
        const login = true;
        this.props.onLoginChange(login);
    }
    render() {
        return (
            <div className="text-center text-white">
                <div className="row">
                    <div className="col-sm-8 mx-auto">
                        <h1> Tương hợp. Trò chuyện. Hẹn hò.</h1>
                    </div>
                    <div className="col-md-9 col-sm-12 mx-auto">
                        <p> Khi nhấp vào Đăng ký, bạn đồng ý với
                        <a href="https://xem.vn/"> <span> Điều khoản dịch vụ. </span></a>
                            Tìm hiểu cách chúng tôi xử lý dữ liệu của bạn trong
                        <a href="https://xem.vn/"><span> Chính sách quyền riêng tư </span></a>
                            và cách chúng tôi dùng cookie cũng như công nghệ tương tự trong
                        <a href="https://xem.vn/"><span> Chính sách cookie của chúng tôi </span></a>
                        </p>
                    </div>
                </div>
                <button onClick={this.handleClick} className="my-4 text-white btn btn-grad text-center btn-lg col-3 mx-auto register d-sm-none d-md-block"> ĐĂNG KÝ </button>

            </div>
        );
    }
}

export default Main;