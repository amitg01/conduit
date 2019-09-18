import React from "react";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.article,
      data: props
    };
  }

  deleteComment = id => {
    fetch(
      `https://conduit.productionready.io/api/articles/${this.props.slug}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${JSON.parse(localStorage.token)}`
        }
      }
    ).then(res =>
      fetch(
        `https://conduit.productionready.io/api/articles/${this.props.slug}/comments`
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            comments: data.comments
          })
        )
    );
  };

  render() {
    return <div>{this.props.comment.body}</div>;
  }
}
