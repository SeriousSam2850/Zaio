import React, {Component} from 'react'
//import axios from 'axios'
//import { Link } from 'react-router-dom'

class Home extends Component{
    state = {
    }
    componentDidMount() {
    }

    render () {
        return (
            <div className="margin: auto">
                <h4 className="center">Search for properties:</h4>
                <input type="text" className="input" placeholder="Search..." />
                    <ul>
                    </ul>
            </div>
        )
    }
}

export default Home