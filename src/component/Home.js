import React from "react";
import Articles from "./Articles";
import Tags from "./Tags";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        {
          <div className='container'>
            <div className='columns'>
              <Articles />
              <Tags />
            </div>
          </div>
        }
      </div>
    );
  }
}
