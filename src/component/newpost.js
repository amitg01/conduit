import React from "react";
import SignUpNav from "./signUpNav"

const token = JSON.parse(localStorage.getItem("user")).user.token

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      about:"",
      markdown: "",
      tags:""
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
      "article":{
        "title": this.state.title ,
        "description": this.state.about,
        "body": this.state.markdown,
        "tagsList": [this.state.tags]

      }
    }

console.log(this.props.location.state,this.props.location.state!=undefined,"new post")

    {this.props.location.state == undefined 
      ?
    fetch(
      "https://conduit.productionready.io/api/articles", {
      method: 'POST',
      mode: "cors",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
    .then(response => response.status===200?this.props.history.push("/"):alert("something went wrong"))
    .catch(error => console.error('Error:', error))
    :
    fetch(
      `https://conduit.productionready.io/api/articles/${this.props.location.state.slug}`, {
      method: 'PUT',
      mode: "cors",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
    .then(response => response.status===200?this.props.history.push("/"):alert("something went wrong"))
    .catch(error => console.error('Error:', error))
  }

  }

  render() {
    return (
      <div>
        <SignUpNav />
      
        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
              type="text"
              placeholder="title"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="about"
              onChange={this.handleChange}
              value={this.state.about}
              type="text"
              placeholder="about"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="markdown"
              onChange={this.handleChange}
              value={this.state.markdown}
              type="text"
              placeholder="markdown"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              name="tags"
              onChange={this.handleChange}
              value={this.state.tags}
              type="text"
              placeholder="tags"
            />
          </div>
        </div>

        <button className="button" onClick={this.submitHandler}>Publish Article</button>
      </div>
    );
  }
}