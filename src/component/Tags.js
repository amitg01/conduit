import React from "react";
import { Link } from "react-router-dom";

export default class Tags extends React.Component {
  state = {
    tags: null
  };

  componentDidMount() {
    fetch("https://conduit.productionready.io/api/tags")
      .then(response => response.json())
      .then(data => this.setState({ tags: data.tags }));
  }

  render() {
    const { tags } = this.state;
    return this.state.isLoading ? (
      <div className='lds-dual-ring' />
    ) : (
      <div className='column'>
        {tags &&
          tags.map((tag, index) => {
            return (
              <Link
                key={index}
                to={{
                  pathname: "/tagsArticle",
                  state: {
                    query: `tag=${tag}`
                  }
                }}
              >
                <span className='tag is-rounded' key={index}>
                  {tag}
                </span>
              </Link>
            );
          })}
      </div>
    );
  }
}
