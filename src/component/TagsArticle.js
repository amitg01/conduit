import React from "react";
import { Link, withRouter } from "react-router-dom";
import Like from "./Like";

class TagsArticle extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    likesCount: "",
    liked: false
  };

  componentDidMount() {
    fetch(
      `https://conduit.productionready.io/api/articles?${this.props.location.state.query}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          articles: data.articles,
          isLoading: false
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    const { articles } = this.state;

    return this.state.isLoading ? (
      <div className='lds-dual-ring' />
    ) : (
      <div className='container'>
        {articles &&
          articles.map((article, index) => {
            return (
              <div key={index}>
                <div className='card has-margin-bottom-10'>
                  <div className='card-content'>
                    <div className='media'>
                      <div className='media-left'>
                        <figure className='image is-48x48'>
                          <img
                            className='is-rounded'
                            src={article.author.image}
                            alt='image'
                            height='30'
                            width='30'
                          />
                        </figure>
                      </div>
                      <div className='media-content '>
                        <Link
                          to={{
                            pathname: `/profiles/${article.author.username}`,
                            state: { following: article.author.following }
                          }}
                        >
                          <p className='title is-size-6'>
                            {article.author.username}
                          </p>
                        </Link>

                        <p className='subtitle is-size-6'>
                          {new Date(article.createdAt).toDateString()}
                        </p>
                      </div>
                    </div>
                    <div className='content'>
                      <Link
                        to={{
                          pathname: `/articles/${article.slug}`,
                          state: {
                            favoritesCount: article.favoritesCount,
                            username: article.author.username
                          }
                        }}
                      >
                        {article.title}
                        <br />
                        read more...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withRouter(TagsArticle);
