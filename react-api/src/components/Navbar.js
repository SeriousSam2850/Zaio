import React from 'react'
import { Link, NavLink, withRouter} from 'react-router-dom'

const Navbar = (props) => {
    //after 2 seconds go back to about
    //setTimeout(() => {
    //    props.history.push('/about')
    //}, 2000);
    return (
        <nav className="nav-wrapper blue darken-2">
            <div className="justify-content-center">
                <a  className="brand-logo">Property 24</a>
                <ul className="right">
                    <li><Link to="/">Home</Link></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/listings">Properties</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)