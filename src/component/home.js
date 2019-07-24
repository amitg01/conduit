import React from "react";
import Articles from "./articles";
import Tags from "./tags";
import SignUpNav from "./signUpNav"




export default class Home extends React.Component {

  render() {

    return (
      <div>
      { 
        <div className="container">
          <SignUpNav  />
          <div className="content">
            <Articles />
            <Tags />
          </div>
         </div>
      }
      </div>
    );    
  }

}
