import React, { Component } from 'react';

class genderSetting extends Component {
    handleChangeGender = (a) => {
        this.props.handleChangeGender(a);
    }
    render() {
        return (
            <div className="animated slideInLeft delay-0.5s faster"> 
                <div onClick={()=>{return this.handleChangeGender("Nam")}} className="inputGroup">
                    <input id="radio1" name="radio" type="radio" />
                    <label htmlFor="radio1">Nam</label>
                </div>
                <div onClick={()=>{return this.handleChangeGender("Nữ")}} className="inputGroup">
                    <input id="radio2" name="radio" type="radio" />
                    <label htmlFor="radio2">Nữ</label>
                </div>
                <div onClick={()=>{return this.handleChangeGender("Tất cả")}} className="inputGroup">
                    <input id="radio3" name="radio" type="radio" />
                    <label htmlFor="radio3">Tất cả</label>
                </div>
            </div>
        );
    }
}

export default genderSetting;