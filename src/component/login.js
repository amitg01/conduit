import React from "react";
// import withRouter from "react-router-dom"
import SignUpNav from "./signUpNav";

 class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      Password: "",
      user:""
    };
  }

  handleChange = (e)=> {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  submitHandler = () => {
    var data = {
      "user":{
        "email": this.state.email,
        "password": this.state.password
      }
    }

    fetch(
      "https://conduit.productionready.io/api/users/login", {
      method: 'POST',
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
        return res.status===200? res.json().then(user => {
          // console.log(user)
          localStorage.setItem("user",JSON.stringify(user));
          this.setState({user})
          this.props.history.push({
            pathname: '/',
            state: { user }
          })
        }
          ):alert("something went wrong")
    })
    .catch(error => console.error('Error:', error));
    // this.props.history.push
  }


  render() {
   
    return (
      <div>
         <SignUpNav />
        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              type="text"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="text"
              placeholder="Password"
            />
          </div>
        </div>

        <button className="button" onClick={this.submitHandler}>Log In!</button>
      </div>
    );
  }
}


export default SignIn