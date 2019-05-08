import React, { Component } from 'react';
import Axios from 'axios'
class itemmes extends Component {
   _handleClick=(evt)=>{
    const list = document.querySelectorAll(".item");
    for(let i=0;i<list.length;++i){
        list[i].classList.remove("choose");
    }
    document.getElementById(evt.target.id).classList.add("choose");
    this.props.handleGetChoosenId(evt.target.id)
   }  
    render() {
       const styleChat = {
            cursor: "pointer",
            padding: "15px 0px 15px 20px",
            background: "#ffffff",
            marginTop: "5px"
       }
       const stylePadding = {
           width: "100%"
       }
        return (
            <div className="animated zoomInDown mt-3 abc" style={stylePadding}>
            {
                this.props.state.listMessage ? Array.from(this.props.state.listMessage).map( (item,index)=>
                {
                    Axios({
                        url: "http://localhost:3001/auth/getInfo",
                        withCredentials: true,
                        method: "post",
                        async : true,
                        data : {
                            id : item.users[0]===this.props.state._id?item.users[1]:item.users[0]
                        }
                       }).then(async res=>{
                         
                       });
                   return <div onClick={this._handleClick} id={item.users[0]===this.props.state._id?item.users[1]:item.users[0]} className="item" key={index}  style={styleChat}> Cuộc trò chuyện {index + 1} </div>
                }) : null
            }
             
            </div>
        );
    }
}

export default itemmes;