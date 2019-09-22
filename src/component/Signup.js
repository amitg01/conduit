import React from "react";

export default class SignUp extends React.Component {
  state = {
    email: "",
    username: "",
    Password: "",
    errMsg: null
  };

  handleChange = e => {
    var { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  submitHandler = () => {
    var data = {
      user: {
        username: this.state.username,
        email: this.state.email,
        Password: this.state.Password
      }
    };

    fetch("https://conduit.productionready.io/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data =>
        data.user
          ? this.props.history.push("/login")
          : this.setState({
              ...this.state,
              errMsg: data.errors["email"]
                ? `email ${data.errors["email"]}`
                : data.errors["password"]
                ? `password ${data.errors["password"]}`
                : `username is already taken`
            })
      )
      .catch(error => console.error("Error:", error));
  };

  render() {
    const errMsg = this.state.errMsg;
    return (
      <div>
        <div className='columns is-mobile'>
          <div className='column is-three-fifths is-offset-one-fifth'>
            <div className='has-text-centered'>
              {errMsg ? (
                <p className='is-size-4 has-text-danger'>{errMsg}</p>
              ) : null}
            </div>
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
                  name='Password'
                  onChange={this.handleChange}
                  value={this.state.Password}
                  type='text'
                  placeholder='password'
                />
              </div>
            </div>

            <button className='button' onClick={this.submitHandler}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}
