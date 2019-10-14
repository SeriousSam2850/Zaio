import React from "react";
import "./css/tailwind.css";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";
import Listing from "./components/Listing"
import Listings from "./components/Listings"
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Layout>
        <div className="bg-blue-700 h-screen">
        <Switch>
          <Route  exact path='/' component={Home}/>
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <AuthRoute path="/profile" component={Profile} />
          <AuthRoute path="/listings" component={Listings} />
          <AuthRoute path="/:listing_id" component={Listing}/>
        </Switch>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
