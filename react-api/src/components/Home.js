import React, {Component} from 'react'
//import axios from 'axios'
//import { Link } from 'react-router-dom'

class Home extends Component{
    state = {
        //posts: [ ]
    }
    //This is asyncronous, in other words it takes some time to do.
    componentDidMount() {
        //axios.get('https://jsonplaceholder.typicode.com/posts')
            //.then(res => {
                //this.setState({
                //    posts: res.data.slice(0,10)
                //})
            //})
    }
    

    

    render () {
        //const { posts } = this.state;
        //const postList = posts.length ? (
        //    posts.map(post => {
        //        return(
        //            <div className="post card" key={post.id}>
        //                <img src={Small} alt="Small boi"/>
        //                <div className="card-content">
        //                    <Link to={'/' + post.id}>
        //                        <span className="card-title red-text">{post.title}</span>
        //                    </Link>
        //                    <p>{post.body}</p>
        //                </div>
        //            </div>
        //        )
        //    })
        //) : (
        //    <div className="center">No posts yet</div>
        //)
        return (
            <div className="container">
                <h4 className="center">Search for properties:</h4>
                <input type="text" className="input" placeholder="Search..." />
                    <ul>
                    </ul>
            </div>
        )
    }
}

export default Home