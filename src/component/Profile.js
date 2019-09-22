import React from "react";
import TagsArticle from "./TagsArticle";

export default class Profile extends React.Component {
  state = {
    user: "",
    following: this.props.location.state.following
  };

  followHandler = () => {
    !this.state.following
      ? fetch(
          `https://conduit.productionready.io/api${this.props.location.pathname}/follow`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${JSON.parse(localStorage.token)}`
            }
          }
        )
          .then(res => res.json())
          .then(data =>
            this.setState({
              following: data.profile.following
            })
          )
      : fetch(
          `https://conduit.productionready.io/api${this.props.location.pathname}/follow`,
          {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${JSON.parse(localStorage.token)}`
            }
          }
        )
          .then(res => res.json())
          .then(data =>
            this.setState({
              following: data.profile.following
            })
          );
  };

  componentDidMount() {
    fetch(
      `https://conduit.productionready.io/api${this.props.location.pathname}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          user: data.profile
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <section className='hero is-primary is-bold has-margin-bottom-15'>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <h1 className='title'>{this.state.user.username}</h1>
              <button
                className='button is-pulled-right'
                onClick={() => {
                  this.followHandler();
                }}
              >
                {this.state.following
                  ? `unfollow ${this.state.user.username}`
                  : `follow ${this.state.user.username}`}
              </button>
            </div>
          </div>
        </section>
        <TagsArticle query={`author=${this.state.user.username}`} />
      </div>
    );
  }
}
