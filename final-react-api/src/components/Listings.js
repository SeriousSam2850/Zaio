import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import cookie from "js-cookie";
import { Fragment } from "react"
import Dummy from '../map_dummy.png'
import jwt from "jsonwebtoken";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';


//import Small from '../smal.png'
class Listings extends Component{
    //constructor(props)
    //{
    //    super(props);
     //   this.state = {
     //       listings: []
      //  }
      //  this.handleClick = this.handleClick.bind(this);
   // }
    state = {
        listings: [],
        query: "",
        data: [],
        filteredData: []
    }
    
    handleInputChange = event => {
        const query = event.target.value;
    
        this.setState(prevState => {
          const filteredData = prevState.data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
    
          return {
            query,
            filteredData
          };
        });
      };

      getData = () => {
        let token = cookie.get("token");
        var myTok = { "token":token };
        axios.post(`https://178.62.11.46:21880/properties/get`,myTok)
      .then(response => response.data)
      .then((data) => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      });
  };

    componentDidMount() {
        this.getData();
        //let token = cookie.get("token");
        //var myTok = { "token":token };
        //console.log(myTok);
        //axios.post("https://178.62.11.46:21880/properties/get", myTok)
        //.then(response => response.data)
            //.then((data) => {
                //this.setState({ listings: data })
                //console.log(this.state.listings)
            //})
    }
    render () {
    return (
        <div>
        <div className="searchForm">
        <div className="p-5">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        </div>
        <div class="shadow-md">{this.state.filteredData.map(i => 
                //<p>{i.name}</p>
                <div className="flex mb-4">
                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{i.name}</div>
                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{i.location}</div>
                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{i.price}</div>
                <Fragment>
                <Link 
                className="m-3 py-1 px-2 bg-red-600 text-black rounded inline-block center"
                to={'/' + i._id}>    
                    <button>View</button>
                </Link>
                </Fragment>
                </div>
            )}</div>
            </div>
            
        </div>
        
        /*<div>
            
        <center><h1>Current listings</h1></center>
            {this.state.listings.map((listing) => (

                //<div class="flex mb-4">
                //<div class="w-full bg-gray-500 h-12"></div>
                //</div>

                <div class="shadow-md">
                <div className="flex mb-4">
                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{listing.name}</div>
                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{listing.location}</div>
                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{listing.price}</div>
                <Link to={'/' + listing._id}>
                    <button>View</button>
                </Link>
                
                </div>
                </div>
            <Card>
            
                <CardBody>
                    <CardTitle>{listing.name}</CardTitle>
                    <Link to={'/' + listing._id}>
                        <Button>View</Button>
                    </Link>
                </CardBody>
            </Card>
            ))}
        </div>
        */
    )
    }
}

export default Listings