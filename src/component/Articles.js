import React from "react";
import { Link } from "react-router-dom";
import Like from "./Like";

export default class Articles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    likesCount: "",
    liked: false
  };
  componentDidMount() {
    fetch("https://conduit.productionready.io/api/articles?limit=30")
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
      <div className='articles column is-three-quarters"'>
        {articles &&
          articles.map((article, index) => {
            return (
              <div key={index}>
                <div className='card'>
                  <div className='card-content'>
                    <div className='media'>
                      <div className='media-left'>
                        <figure className='image is-48x48'>
                          <img
                            src={article.author.image}
                            alt='image'
                            height='30'
                            width='30'
                          />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <Link
                          to={{
                            pathname: `/profiles/${article.author.username}`,
                            state: {
                              following: article.author.following,
                              query: `author=${article.author.username}`
                            }
                          }}
                        >
                          <p className='title is-4'>
                            {article.author.username}
                          </p>
                        </Link>

                        <p className='subtitle is-6'>
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
                        {article.body}
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
      </div>
    );
  }
}
