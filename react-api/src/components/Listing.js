import React, { Component } from 'react'
//import axios from 'axios'

class Listing extends Component {

    state = {
        listing: null
    }
    //this should give me the individual listing
    componentDidMount() {
        //let id = this.props.match.params.post_id;
        //axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            //.then(res => {
            //    this.setState({
            //        post: res.data
            //    })
            //})
    }
    
    render() {
        const listing = this.state.listing ? (
            <div className="listing">
                <h4 className="center">{this.state.listing.name}</h4>
                <p>{this.state.listing.location}</p>
            </div>
        ) : (
            <div className="center">Loading listings...</div>
        )

        return (
            <div className="container">
              {listing} 
            </div>
        )
    }
}

export default Listing