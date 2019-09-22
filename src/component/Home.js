import React from "react";
import Articles from "./Articles";
import Tags from "./Tags";
import { connect } from "react-redux";
class Home extends React.Component {
  render() {
    return (
      <div>
        {this.props.state && this.props.state.user ? (
          <div className='container'>
            <div className='columns'>
              <Articles />
              <Tags />
            </div>
          </div>
        ) : (
          <h1 className='has-text-centered is-size-2'>Welcome To Conduit</h1>
        )}
      </div>
    );
  }
}

const mapStateToState = state => {
  return { state };
};

export default connect(mapStateToState)(Home);
