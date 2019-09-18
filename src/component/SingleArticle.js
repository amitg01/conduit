import React from "react";
import Like from "./Like";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SingleArticle extends React.Component {
  state = {
    article: "",
    comment: "",
    comments: null
  };

  deleteHandler = () => {
    fetch(
      `https://conduit.productionready.io/api/articles/${this.props.match.params.slug}`,
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
      .then(data => this.props.history.push("/"));
  };

  changeHandler = event => {
    const { value } = event.target;
    this.setState({
      comment: value
    });
  };

  submitHandler = slug => {
    const body = {
      comment: {
        body: this.state.comment
      }
    };

    fetch(`https://conduit.productionready.io/api/articles/${slug}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          fetch(
            `https://conduit.productionready.io/api/articles/${slug}/comments`
          )
            .then(res => res.json())
            .then(data =>
              this.setState({
                comments: data.comments,
                comment: ""
              })
            );
        }
      });
  };

  componentDidMount() {
    fetch(
      `https://conduit.productionready.io/api/${this.props.location.pathname}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          article: data.article
        })
      )
      .catch(error => console.log(error));

    fetch(
      `https://conduit.productionready.io/api/articles/${this.props.match.params.slug}/comments`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          comments: data.comments
        });
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.article.body}</p>

        {this.props.user &&
        this.props.user.user.username === this.props.location.state.username ? (
          <div>
            <button onClick={this.deleteHandler}>Delete Article</button>
            <button>
              <Link
                to={{
                  pathname: "/new",
                  state: {
                    slug: this.props.match.params.slug
                  }
                }}
              >
                Update Article
              </Link>
            </button>
          </div>
        ) : null}
        <Like
          slug={this.props.match.params.slug}
          favoritesCount={this.props.location.state.favoritesCount}
        />
        <input
          name='comment'
          onChange={this.changeHandler}
          value={this.state.comment}
        />
        <button
          onClick={() => this.submitHandler(this.props.match.params.slug)}
        >
          Comment
        </button>

        {this.state.comments &&
          this.state.comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                slug={this.state.article.slug}
                comment={comment}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(SingleArticle);
