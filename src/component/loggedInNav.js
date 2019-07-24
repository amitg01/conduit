import React from "react";
import { NavLink,withRouter } from "react-router-dom";



 class LoggedNav extends React.Component{
    constructor(props){
        super(props)

    }

    logout = () => {
        localStorage.setItem("token","");
        // console.log(this.props)
        this.props.history.push("/login");
    }

    render(){
        return(

        <nav className="navbar is-primary">
        <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
    
        <NavLink to="/" className="navbar-item">
          Home
        </NavLink>
        
         <NavLink to="/new" className="navbar-item">
          new post
          </NavLink>

          <NavLink to="/settings" className="navbar-item">
          Settings
          </NavLink>

          
    
        </div>
      </div>
    </nav>
         
        )
    }
}
export default withRouter(LoggedNav);