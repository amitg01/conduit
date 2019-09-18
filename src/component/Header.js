import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Header(props) {
  return props.state && props.state.user ? (
    <nav className='navbar is-primary'>
      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <NavLink to='/' className='navbar-item'>
            Home
          </NavLink>

          <NavLink to='/new' className='navbar-item'>
            new post
          </NavLink>

          <NavLink to='/settings' className='navbar-item'>
            Settings
          </NavLink>
        </div>
      </div>
    </nav>
  ) : (
    <div id='navbarBasicExample' className='navbar-menu'>
      <div className='navbar-end'>
        <div className='navbar-item'>
          <div className='buttons'>
            <span className='button is-primary'>
              <NavLink to='/register' className='navbar-item'>
                Sign Up
              </NavLink>
            </span>
            <span className='button is-light'>
              <NavLink to='/login' className='navbar-item'>
                Log In
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(Header);
