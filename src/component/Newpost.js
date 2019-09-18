import React from "react";

export default class SignUp extends React.Component {
  state = {
    title: "",
    about: "",
    markdown: "",
    tags: ""
  };

  handleChange = e => {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitHandler = () => {
    var data = {
      article: {
        title: this.state.title,
        description: this.state.about,
        body: this.state.markdown,
        tagsList: [this.state.tags]
      }
    };

    if (JSON.parse(localStorage.token)) {
      if (this.props.location.state == undefined) {
        fetch("https://conduit.productionready.io/api/articles", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(localStorage.token)}`
          }
        })
          .then(response =>
            response.status === 200
              ? this.props.history.push("/")
              : alert("something went wrong")
          )
          .catch(error => console.error("Error:", error));
      } else {
        fetch(
          `https://conduit.productionready.io/api/articles/${this.props.location.state.slug}`,
          {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${JSON.parse(localStorage.token)}`
            }
          }
        )
          .then(response =>
            response.status === 200
              ? this.props.history.push("/")
              : alert("something went wrong")
          )
          .catch(error => console.error("Error:", error));
      }
    } else {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div>
        <div className='field'>
          <div className='control'>
            <input
              className='input is-primary'
              name='title'
              onChange={this.handleChange}
              value={this.state.title}
              type='text'
              placeholder='title'
            />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input
              className='input is-primary'
              name='about'
              onChange={this.handleChange}
              value={this.state.about}
              type='text'
              placeholder='about'
            />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input
              className='input is-primary'
              name='markdown'
              onChange={this.handleChange}
              value={this.state.markdown}
              type='text'
              placeholder='markdown'
            />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input
              className='input is-primary'
              name='tags'
              onChange={this.handleChange}
              value={this.state.tags}
              type='text'
              placeholder='tags'
            />
          </div>
        </div>

        <button className='button' onClick={this.submitHandler}>
          Publish Article
        </button>
      </div>
    );
  }
}
