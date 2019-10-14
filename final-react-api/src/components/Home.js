import React, {Component} from 'react';
import axios from 'axios';
import cookie from "js-cookie";
import Img from '../crop.png'

class Home extends Component{
    render () {
      return (<div className="flex">
      <div/>
      <div className="w-full mt-10 p-4 bg-white">
            <img className="center" src={Img} alt="Sunset in the mountains"></img>
      </div>
      </div>
      );
    }
}

export default Home