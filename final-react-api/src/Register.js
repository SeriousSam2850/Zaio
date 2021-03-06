import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Link } from 'react-router-dom'
import Error from "./components/Error";
import { Fragment } from "react"
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
    const data = {
      firstname: this.state.lastname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };
    axios
      .post("https://178.62.11.46:21880/customers", data)
      .then(res => {
        cookie.set("token", res.data.access_token);
        cookie.set("user", data);
        this.props.history.push("/profile");
      })
      .catch(e => this.setState({ errors: e.response.data.errors }));
  };
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Register</h1>
              <div className="mt-4">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Your first name"
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["name"] ? this.state.errors["name"] : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Your last name"
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["name"] ? this.state.errors["name"] : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["email"]
                      ? this.state.errors["email"]
                      : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleInput}
                  placeholder="Password"
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["password"]
                      ? this.state.errors["password"]
                      : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={this.handleInput}
                  placeholder="Confirm your password"
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              
              <div className="mt-4">
                <input
                  type="submit"
                  value="Register"
                  className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-blue-200 text-black"
                />
              </div>
              <div className="mt-4">
              <Fragment>
                <Link 
                className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-blue-200 text-black"
                to={'/login'}>    
                    <button>I already have an account</button>
                </Link>
              </Fragment>
            </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
