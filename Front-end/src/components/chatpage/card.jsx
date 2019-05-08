import React, { Component } from 'react';
import Info from "./info";
import LikeButton from './likebutton';
import CancelButton from "./cacelbutton";
import Swal from "sweetalert2"
import { Route, Link } from "react-router-dom"
import Axios from 'axios';
class card extends Component {
    state = {
        listPeople: null,
        index: 0
    }
    async componentDidMount() {
        await Axios({
            url: "http://localhost:3001/auth/lookingPeople",
            withCredentials: true,
            method: "get",
        }).then(async res => {
            if (res.data) {
                await this.setState({
                    listPeople: JSON.parse(res.data)
                })
            }
        }).catch(err => {
            console.log(err.message);
        })
    }
    _handleLike = async () => {
        await Axios({
            url: "http://localhost:3001/auth/addLikePeople",
            withCredentials: true,
            method: "post",
            data: {
                _id: this.state.listPeople[this.state.index]
            }
        }).then(async res => {
            if (res.data.isKet) {
                await Swal.fire({
                    title: 'Tương hợp rồi . Quẩy lên',
                    width: 600,
                    padding: '3em',
                    background: '#fff url(https://cdn.pixabay.com/photo/2018/12/24/07/09/valentine-background-3892382_960_720.jpg)',
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      center left
                      no-repeat
                    `
                })
            }
            window.location.reload();
        }).catch(err => {
            console.log(err.message);
        })
        await this.setState({
            index: this.state.index + 1
        })
    }
    _handleCancel = async () => {
        await this.setState({
            index: this.state.index + 1
        })
        console.log(this.state.index)
    }
    render() {
        const styleBorder = {
            border: "1px solid rgba(212, 205, 205,0.5)",
            borderRadius: "3%",
            overflow: "auto"
        }
        return (
            <div className="mx-auto my-auto">
                <Route path="/app/recs" render={() => {
                    return (
                        <div className="animated zoomIn " style={styleBorder} >
                            {
                                (this.state.listPeople !== null && this.state.index < this.state.listPeople.length && this.state.listPeople.length != 0) ?
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={this.state.listPeople[this.state.index].avatarUrl[0]} alt="" className="card-img-top" />
                                        <div className="card-body">
                                            <Info state={this.state.listPeople[this.state.index]} />
                                        </div>
                                    </div> :
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src="https://img.thuthuatphanmem.vn/uploads/2018/09/22/avatar-den-dep-2_015639673.png" alt="" className="card-img-top" />
                                        <div className="card-body">
                                            <h3 className="text-center">Thay đổi cài đặt để tìm người mới</h3>
                                        </div>
                                    </div>
                            }
                        </div>
                    )
                }} />

                <Route path="/app/profile" render={() => {
                    return (
                        <div className="animated zoomIn" style={styleBorder} >
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={this.props.state.avatarUrl} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <Info state={this.props.state} />
                                </div>
                            </div>
                        </div>
                    )
                }} />
                <Route path="/app/recs" render={() => {
                    return (
                        <div>
                                {
                                     (this.state.listPeople !== null && this.state.index < this.state.listPeople.length && this.state.listPeople.length != 0) ?
                                     <div id="game-pad" className="d-flex justify-content-around animated rollIn align-items-center" style={{ padding: "10px" }}>
                                     <LikeButton handleLike={this._handleLike} />
                                     <CancelButton handleCancel={this._handleCancel} />
                                 </div> :
                                 <div>
                                     <Link to="/app/profile" className="text-decoration-none d-flex justify-content-around  align-items-center" >
                                         <button className="animated fadeIn my-2 text-white btn btn-grad text-center btn-sm col-4 mx-auto register" style={{ fontSize: "18px" }}>Cài đặt</button>
                                     </Link>
                                 </div>
                                }
                             
                            


                        </div>
                    )

                }} />

            </div>



        );
    }
}
export default card;