import React, { Component } from 'react';
import {storage} from '../firebase/index'
import Axios from 'axios'
class uploadImage extends Component {
    state = {
        image: null,
        progress: 0,
        url: ''
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }
    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${this.props.userId}/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage.ref('images').child(this.props.userId).child(image.name).getDownloadURL().then(async url => {
                    console.log(url);
                    await Axios({
                        url: "http://localhost:3001/auth/uploadImage",
                        withCredentials: true,
                        method: "post",
                        data : {
                          url : url
                        }
                      }).then(res=>{
                        console.log("OK");
                      }).catch(err=>{
                        console.log(err);
                    });
                    this.setState({ url });
                })
            });
    }
    handleDelete = (event)=>{
        const { image } = this.state;
        storage.ref('images').child(this.props.userId).child(image.name).delete();
        // call Axios to delete in database
    }
    render() {
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return (
            <div style={style}>
                <progress value={this.state.progress} max="100" />
                <br />
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                <button onClick={this.handleDelete}>Delete</button>
                <br />
                <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
            </div>
        )
    }
}

export default uploadImage;