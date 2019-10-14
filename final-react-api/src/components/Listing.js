import React, { Component } from 'react';
import axios from 'axios';
import cookie from "js-cookie";
import Img from '../proplogo.png'
import { Link } from 'react-router-dom'
import { Fragment } from "react"
class Listing extends Component {

    state = {
        listing: null
    }
    //this should give me the individual listing
    componentDidMount() {
        let id = this.props.match.params.listing_id;
        let token = cookie.get("token");
        var myTok = { "token":token };
        console.log(token);
        console.log(id);
        axios.post('https://178.62.11.46:21880/properties/get/' + id, myTok)
            .then(res => {
                this.setState({
                    listing: res.data
                })
            })
    }
    handleClick = () => {
        alert("Coming soon...")
    }
    
    render() {
        const listing = this.state.listing ? (

            <div className="max-w-sm rounded content-center overflow-hidden shadow-lg">
                <img className="w-full" src={Img} alt="Sunset in the mountains"></img>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Name {this.state.listing.name}</div>
                        <p className="text-black text-base">
                            Great location in {this.state.listing.location} with a reasonable asking price of R{this.state.listing.price}.
                        </p>
                        <p className="text-black text-base">
                            Please contact your agent at: {this.state.listing.agentEmail}
                        </p>
                    </div>
                <Fragment>
                <Link 
                className="m-3 py-1 px-2 bg-red-600 text-black rounded inline-block center"
                to={'/listings'}>    
                    <button onClick={this.handleClick} >Book viewing</button>
                </Link>
                <Link
                    className="m-3 py-1 px-2 bg-red-600 text-black rounded inline-block center"
                    to="/listings"
                >
                    Back
                </Link>
              </Fragment>
            </div>
        ) : (
            <div className="center">Loading listing...</div>
        )

        return (
            <div className="container">
              {listing} 
            </div>
        )
    }
}

export default Listing