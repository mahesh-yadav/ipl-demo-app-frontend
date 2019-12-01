import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  onSignOut = () => {
    this.props.onSignOut();
    this.props.history.push('/');
  };

  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div
        className='container-fluid'
        style={{ backgroundColor: this.props.themeColor }}
      >
        <div className='row p-3 text-white'>
          <div className='col-12 d-flex align-items-center'>
            <div
              className='mr-auto text-white font-weight-bold'
              onClick={this.handleClick}
              style={{
                cursor: 'pointer',
              }}
            >
              <h1 className='d-none d-lg-block'>Indian Premier League</h1>
              <h1 className='d-lg-none'>IPL</h1>
            </div>
            <nav className='mx-auto'>
              <NavLink
                to='/'
                exact
                className='text-white mr-2'
                activeStyle={{
                  borderBottom: 'solid 2px white',
                  paddingBottom: '5px',
                }}
              >
                <i className='fas fa-home fa-2x'></i>
                <span className='d-none d-lg-inline ml-2'>Home</span>
              </NavLink>
              {this.props.accessToken && (
                <NavLink
                  to='/user'
                  exact
                  className='text-white ml-2'
                  activeStyle={{
                    borderBottom: 'solid 2px white',
                    paddingBottom: '5px',
                  }}
                >
                  <i className='far fa-user-circle fa-2x'></i>
                  <span className='d-none d-lg-inline ml-2'>Profile</span>
                </NavLink>
              )}
            </nav>
            <div className='ml-auto'>
              {this.props.location.pathname !== '/signup' &&
                !this.props.accessToken && (
                  <Link
                    to='/signup'
                    className='btn btn-outline-light mx-1'
                    title='Sign Up'
                  >
                    <i className='fas fa-user-plus d-md-none'></i>
                    <span className='d-none d-md-inline'>Sign Up</span>
                  </Link>
                )}
              {this.props.location.pathname !== '/signin' &&
                !this.props.accessToken && (
                  <Link
                    to='/signin'
                    className='btn btn-outline-light mx-1'
                    title='Sign In'
                  >
                    <i className='fas fa-sign-in-alt d-md-none'></i>
                    <span className='d-none d-md-inline'>Sign In</span>
                  </Link>
                )}

              {this.props.accessToken && (
                <button
                  className='btn btn-outline-light mx-1'
                  title='Sign Out'
                  onClick={this.onSignOut}
                >
                  <i className='fas fa-sign-out-alt d-md-none'></i>
                  <span className='d-none d-md-inline'>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
