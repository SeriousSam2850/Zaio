import React, { Component } from 'react'
import axios from 'axios'
const API_URL = 'http://139.59.206.3:80/properties'
import Suggestions from 'components/Suggestions'

class Search extends Component {
 state = {
   query: '',
   results: []
 }

 getInfo = () => {
    axios.get(`${API_URL}?prefix=${this.state.query}&limit=7`)
      .then(({ data }) => {
        this.setState({
          results: data.data 
                                                       
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}

export default Search