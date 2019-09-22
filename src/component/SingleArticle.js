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
    const article = this.state.article;
    return (
      <div>
        <section className='hero is-primary is-bold has-margin-bottom-15'>
          <div className='hero-body'>
            <div className='container is-pulled-left'>
              <p className='is-size-5'>{article.title}</p>
              <br />
              <div>
                <img
                  className='is-rounded'
                  src={article.author && article.author.image}
                  alt='image'
                  height='30'
                  width='30'
                />

                <span className='is-size-5 has-margin-left-10'>
                  {article.author && article.author.username}
                </span>
              </div>
              {this.props.user &&
              this.props.user.user.username ===
                this.props.location.state.username ? (
                <div>
                  <button
                    className='button has-margin-right-10 is-danger'
                    onClick={this.deleteHandler}
                  >
                    Delete Article
                  </button>
                  <button className='button is-primary'>
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
            </div>
          </div>
        </section>
        <div className='container has-margin-bottom-30'>
          <p>{this.state.article.body}</p>
          <hr />
        </div>
        <div className='columns is-mobile'>
          <div className='column is-three-fifths is-offset-one-fifth'>
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
            <div>
              <button
                className='button is-success is-pulled-right'
                onClick={() => this.submitHandler(this.props.match.params.slug)}
              >
                Comment
              </button>
            </div>
          </div>
        </div>

        {this.state.comments &&
          this.state.comments.map((comment, index) => {
            return (
              <div className='columns ' key={index}>
                <div className='column box is-three-fifths is-offset-one-fifth has-margin-bottom-10'>
                  <Comment
                    key={index}
                    slug={this.state.article.slug}
                    comment={comment}
                  />
                </div>
              </div>
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
