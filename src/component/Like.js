import React from "react";

var token = "";

export default class Like extends React.Component {
  state = {
    liked: false,
    likesCount: this.props.favoritesCount
  };

  likeHandler = slug => {
    if (localStorage.token) {
      if (!this.state.liked) {
        fetch(
          `https://conduit.productionready.io/api/articles/${slug}/favorite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${JSON.parse(localStorage.token)}`
            }
          }
        )
          .then(response => response.json())
          .then(data =>
            this.setState({
              likesCount: data.article.favoritesCount,
              liked: true
            })
          )
          .catch(error => console.log(error));
      } else {
        fetch(
          `https://conduit.productionready.io/api/articles/${slug}/favorite`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${JSON.parse(localStorage.token)}`
            }
          }
        )
          .then(response => response.json())
          .then(data =>
            this.setState({
              likesCount: data.article.favoritesCount,
              liked: false
            })
          )
          .catch(error => console.log(error));
      }
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.likeHandler(this.props.slug);
          }}
        >
          <p>{this.state.likesCount}</p>
        </button>
      </div>
    );
  }
}
