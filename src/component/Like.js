import React from "react";

var token = "";

export default class Like extends React.Component {
  state = {
    liked: this.props.favorited,
    likesCount: this.props.favoritesCount
  };

  likeHandler = slug => {
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
  };

  render() {
    return (
      <div>
        <button
          className='button has-margin-10 is-success'
          onClick={() => {
            this.likeHandler(this.props.slug);
          }}
        >
          <i className='fas fa-thumbs-up has-margin-right-5'></i>
          <p>{this.state.likesCount}</p>
        </button>
      </div>
    );
  }
}
