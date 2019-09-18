import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Home from "./Home";
import NewPost from "./Newpost";
import SignIn from "./Login";
import SignUp from "./Signup";
import Settings from "./Settings";
import singleArticle from "./SingleArticle";
import Profile from "./Profile";
import TagsArticle from "./TagsArticle";
import Header from "./Header";

class App extends Component {
  componentDidMount() {
    fetch("https://conduit.productionready.io/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res =>
        res.status === 200 ? res.json() : console.log("something went wrong")
      )
      .then(user =>
        this.props.dispatch({ type: "USER_REFRESH", payload: user })
      );
  }

  render() {
    return (
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/login' component={SignIn} />
        <Route path='/register' component={SignUp} />
        <Route path='/new' component={NewPost} />
        <Route path='/settings' component={Settings} />
        <Route path='/articles/:slug' component={singleArticle} />
        <Route path='/profiles/:username' component={Profile} />
        <Route path='/tagsArticle' component={TagsArticle} />
      </div>
    );
  }
}

export default connect()(App);
