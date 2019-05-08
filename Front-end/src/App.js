import React, { Component } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/animate.css"
import "../node_modules/font-awesome/css/font-awesome.css"
import "../node_modules/hover.css"
//import logo from './logo.svg';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/homepage';
import Chatpage from './pages/chatpage';
import Axios from 'axios';
class App extends Component {
  state = {
    isLoggin: false
  }
  async componentWillMount() {
    await Axios({
      url: "http://localhost:3001/auth/isLoggin",
      withCredentials: true,
      method: "get",
    }).then((res) => {
      this.setState({
        isLoggin: res.data.check
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route  exact path='/' render={() => {
            return (this.state.isLoggin === true ? <Redirect to='/app/recs' /> : <Homepage />)
          }} />
           <Route  exact path='/app' render={() => {
            return (this.state.isLoggin === true ? <Redirect to='/app/recs' /> : <Homepage />)
          }} />
          <Route path='/app/recs' component={Chatpage} />
          <Route path='/app/profile' component={Chatpage} />
          <Route path='/app/setting' component={Chatpage} />
          <Route path='/app/message' component={Chatpage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
