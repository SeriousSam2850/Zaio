import React, { Component } from 'react'
import axios from 'axios'

class Listing extends Component {

    state = {
        listing: null
    }
    //this should give me the individual listing
    componentDidMount() {
        let id = this.props.match.params.listing_id;
        
        axios.get('http://139.59.206.3:80/properties/' + id)
            .then(res => {
                this.setState({
                    listing: res.data
                })
            })
    }
    
    render() {
        const listing = this.state.listing ? (
            <div className="listing">
                <p className="center">{"Name "+this.state.listing.name}</p>
                <p>{"Location "+this.state.listing.location}</p>
                <p>{"Price "+this.state.listing.price}</p>
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