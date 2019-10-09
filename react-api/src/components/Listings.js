import React, {Component} from 'react'
import axios from 'axios'

class Listings extends Component{

    state = {
        listings: []
    }
    
    componentDidMount() {
        axios.get("http://localhost:3000/listings")
        .then(response => response.data)
            .then((data) => {
                this.setState({ listings: data })
                console.log(this.state.listings)
            })
    }
    render () {
    return (
        <div>
            <center><h1>Current listings</h1></center>
            {this.state.listings.map((listing) => (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{listing.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{listing.location}</h6>
                        <p className="card-text">{listing.price}</p>
                    </div>
                </div>
            ))}
        </div>
    )
    }
}

export default Listings