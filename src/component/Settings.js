import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Settings extends React.Component {
  state = {
    imgUrl: "",
    username: "",
    bio: "",
    email: "",
    newPassword: ""
  };

  handleChange = e => {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  logout = () => {
    localStorage.setItem("token", "");
    this.props.dispatch({ type: "USER_LOGOUT" });
    this.props.history.push("/login");
  };

  //   handling submit

  submitHandler = () => {
    var data = {
      user: {
        image: this.state.imgUrl,
        bio: this.state.bio,
        email: this.state.email
      }
    };

    fetch("https://conduit.productionready.io/api/user", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("user")).user.token
        }`
      }
    })
      .then(response => {
        return response;
      })
      .then(response => {
        if (response.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    return (
      <div className='columns is-mobile'>
        <div className='column is-three-fifths is-offset-one-fifth'>
          <div className='field'>
            <div className='control'>
              <input
                className='input is-primary'
                name='imgUrl'
                onChange={this.handleChange}
                value={this.state.imgUrl}
                type='text'
                placeholder='image url'
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
                name='bio'
                onChange={this.handleChange}
                value={this.state.bio}
                type='text'
                placeholder='bio'
              />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <input
                className='input is-primary'
                name='email'
                onChange={this.handleChange}
                value={this.state.email}
                type='text'
                placeholder='email'
              />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <input
                className='input is-primary'
                name='newPassword'
                onChange={this.handleChange}
                value={this.state.newPassword}
                type='text'
                placeholder='new Password'
              />
            </div>
          </div>

          <button
            className='button has-margin-right-10'
            onClick={this.submitHandler}
          >
            Update
          </button>
          <button className='button' onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Settings);
