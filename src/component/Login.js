import React from "react";
import { connect } from "react-redux";

class SignIn extends React.Component {
  state = {
    email: "",
    Password: "",
    errMsg: null
  };

  handleChange = e => {
    var { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = () => {
    var data = {
      user: {
        email: this.state.email,
        password: this.state.Password
      }
    };

    fetch("https://conduit.productionready.io/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.status === 200
          ? res.json().then(user => {
              localStorage.setItem("token", JSON.stringify(user.user.token));
              this.setState({ user });
              this.props.history.push({
                pathname: "/",
                state: { user }
              });
              this.props.dispatch({ type: "USER_LOGIN", payload: user });
            })
          : this.setState({
              ...this.state,
              errMsg: "email or password is wrong"
            });
      })
      .catch(error => console.log(error));
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
                  name='Password'
                  onChange={this.handleChange}
                  value={this.state.Password}
                  type='text'
                  placeholder='Password'
                />
              </div>
            </div>

            <button className='button' onClick={this.submitHandler}>
              Log In!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SignIn);
