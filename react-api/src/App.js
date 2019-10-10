import React, {Component} from 'react';
import Listings from './components/Listings'
import Listing from './components/Listing'
import Navbar from './components/Navbar'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import LoginScreen from './components/Loginscreen';

import axios from 'axios';
//<Listings listings={this.state.listings} />
//<Route path="/:post_id" component={Listing} />
class App extends Component {
    
    state = {
        listings: []
    };
    
    componentDidMount() {
        axios.get("http://139.59.206.3/properties")
        .then(response => response.data)
            .then((data) => {
                this.setState({ listings: data })
                console.log(this.state.listings)
            })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={Register} />
                    <Route path="/listings" component={Listings} />
                    <Route path="/:listing_id" component={Listing} />
                </Switch>
                </div>
            </BrowserRouter>
            
        );
    }

    
}

export default App;
