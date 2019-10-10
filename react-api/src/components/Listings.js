import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import Small from '../ay.png'
class Listings extends Component{

    state = {
        listings: []
    }
    
    componentDidMount() {
        axios.get("http://139.59.206.3/properties")
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
            <Card>
            <CardImg  style={{width : '10%'}}  src={Small} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{listing.name}</CardTitle>
                    <Link to={'/' + listing._id}>
                        <Button>View</Button>
                    </Link>
                </CardBody>
            </Card>
            ))}
        </div>
    )
    }
}

export default Listings