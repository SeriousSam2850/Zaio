import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";
import logo from '../prop24.png'

function Layout(props) {
  const handleLogout = e => {
    e.preventDefault();
    cookie.remove("token");
    props.logout();
  };
  return (
    <div>
      <nav className="flex justify-between">
      <img src={logo} style={{width: '20%', height: 'auto', padding: '20px 20px'}} alt="Logo"></img>
        <div className="flex justify-between">
          {!props.loggedIn ? (
            <Fragment>
              <Link
                className="m-3 py-1 px-2 bg-blue-200 text-black rounded inline-block"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="m-3 py-1 px-2 bg-blue-200 text-black rounded inline-block"
                to="/register"
              >
                Register
              </Link>
            </Fragment>
          ) : (
            <Link
              className="m-3 py-1 px-2 bg-blue-200 text-black rounded inline-block"
              to="/logout"
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
      {props.children}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "SET_LOGOUT" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
