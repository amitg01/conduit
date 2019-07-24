import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route} from "react-router-dom";

// import LoggedNav from "./component/loggedInNav";
// import SignUpNav from "./component/signUpNav";
import Home from "./component/home";
import NewPost from "./component/newpost";
import SignIn from "./component/login";
import SignUp from "./component/signup";
import Settings from "./component/settings";
import singleArticle from "./component/singleArticle";
import Profile from "./component/profile";

import "./index.css";
import TagsArticle from "./component/TagsArticle";
// import 'bulma/css/bulma.css';


function App(props) {
  const user = localStorage.getItem("user")
  // console.log(user)
  return (
    <div>

    <Route path="/" exact component={ Home } />
    <Route path="/login" component={ SignIn } />
    <Route path="/signup" component={ SignUp } />
    <Route path="/new" component={ NewPost }/>
    <Route path="/settings" component={ Settings }/>
    <Route path="/articles/:slug" component={ singleArticle }/>
    <Route path="/profiles/:username" component={ Profile }/>
    <Route path="/TagsArticle" component={TagsArticle} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Router><App /></Router>, rootElement);
