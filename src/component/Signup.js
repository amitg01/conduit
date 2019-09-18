import React from "react";

export default class SignUp extends React.Component {
  state = {
    email: "",
    username: "",
    Password: ""
  };

  handleChange = e => {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitHandler = () => {
    var data = {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    };

    fetch("https://conduit.productionready.io/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response;
      })
      .then(response =>
        response.status === 200
          ? this.props.history.push("/Login")
          : console.log(response.json())
      )
      .catch(error => console.error("Error:", error));
  };

  render() {
    return (
      <div>
        <div className='field'>
          <div className='control'>
            <input
              className='input is-primary'
              name='email'
              onChange={this.handleChange}
              value={this.state.email}
              type='text'
              placeholder='Email'
            />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input
              className='input is-primary'
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
              type='text'
              placeholder='username'
            />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input
              className='input is-primary'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
              type='text'
              placeholder='Password'
            />
          </div>
        </div>

        <button className='button' onClick={this.submitHandler}>
          Sign Up
        </button>
      </div>
    );
  }
}
