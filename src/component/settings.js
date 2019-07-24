import React from "react";
import { withRouter } from "react-router-dom"

import SignUpNav from "./signUpNav";

// import 'bulma/css/bulma.css';

 class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
      username:"",
      bio: "",
      email:"",
      newPassword:""
    };
  }

  logout = () => {
    localStorage.setItem("user","");
    // console.log(this.props)
    this.props.history.push("/login");
}

  handleChange = (e)=> {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

//   handling submit

  submitHandler = () => {

    var data = {
      "user":{
        "image": this.state.imgUrl ,
        "bio": this.state.bio,
        "email": this.state.email,
      }
    }

   

    fetch(
      "https://conduit.productionready.io/api/user", {
      method: 'PUT',
      mode: "cors",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Token ${JSON.parse(localStorage.getItem("user")).user.token}`
      }
    })
    .then(response => {
        // console.log(response)
        return response;
        })
        // .then(data => console.log(data,"settings"))
    // .then(response => response.status===200?this.props.history.push("/"):alert("something went wrong"))
    .then(response => {
      if(response.status===200){
        // localStorage.setItem("user",JSON.stringify(response.json().user))
        console.log(JSON.stringify(response.json().user))
        this.props.history.push("/")
      }
    })
    .catch(error => console.error('Error:', error));
  }



  render() {
    return (
      <div>
        <SignUpNav />
        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="imgUrl"
              onChange={this.handleChange}
              value={this.state.imgUrl}
              type="text"
              placeholder="image url"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
              placeholder="username"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="bio"
              onChange={this.handleChange}
              value={this.state.bio}
              type="text"
              placeholder="bio"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              type="text"
              placeholder="email"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="newPassword"
              onChange={this.handleChange}
              value={this.state.newPassword}
              type="text"
              placeholder="new Password"
            />
          </div>
        </div>

        <button className="button" onClick={this.submitHandler}>Update Settings</button>
        <button className="button" onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default withRouter(Settings)