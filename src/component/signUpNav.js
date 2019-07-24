import React from "react";
import { BrowserRouter as  Router,NavLink,withRouter } from "react-router-dom";

// import 'bulma/css/bulma.css';

class SignUpNav extends React.Component{
  
  render(){
      const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
      // const parsedUser = JSON.parse(user)
      // console.log(user.user.username, 'sign component')
        return(
    
        <nav className="navbar">

            <div className="logo">
              <NavLink to="/" className="">
                Conduit
              </NavLink>
            </div>

            <div className="nav-items">

            <div>
              <NavLink to="/" className="">
                Home
              </NavLink>
            </div>

            {
              !localStorage.getItem("user") ? 
              (
              <div className="links">
                <div>
                  <NavLink to="/login" className="">login</NavLink>
                </div>

                <div>
                  <NavLink to="/signup" className="">signup</NavLink>
                </div>
              </div>)
              
              :
              <div className="links">
                <span><NavLink to="/new" className=" is-black">New Post</NavLink></span>
                <span><NavLink to="/settings" className="">Settings</NavLink></span>
                <NavLink to= {{
                  pathname:`/profiles/${user.user.username}`,
                  state:{
                    following:user.user.following,
                    user:user.user.username
                  }
                }} className="">{user.user.username || ""}</NavLink>
              </div>
              }
      </div>
    </nav>
          
        )
    }
}

export default withRouter(SignUpNav)
// export default SignUpNav