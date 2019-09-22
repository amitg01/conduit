import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

function Header(props) {
  return props.state && props.state.user ? (
    <nav className='navbar has-margin-bottom-20 has-padding-top-15 is-vcentered'>
      <div className='navbar-brand'>
        <NavLink className='navbar-item' to='/'>
          <span className='is-size-4 has-text-primary has-text-weight-semibold'>
            Conduit
          </span>
        </NavLink>
      </div>
      <div className='container'>
        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-end'>
            <span className='button has-margin-left-10'>
              <NavLink to='/' className='navbar-item'>
                <i className='fas fa-home has-margin-right-10'></i> Home
              </NavLink>
            </span>
            <span className='button has-margin-left-10'>
              <NavLink to='/new' className='navbar-item'>
                <i className='fas fa-plus has-margin-right-10'></i>new post
              </NavLink>
            </span>
            <span className='button has-margin-left-10'>
              <NavLink to='/settings' className='navbar-item'>
                <i className='fas fa-cog has-margin-right-10'></i> Settings
              </NavLink>
            </span>
          </div>
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
