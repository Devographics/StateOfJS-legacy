import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RandomComment from '../RandomComment'

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <RandomComment />
                <div className="HomeList">
                    <Link to="/flavors">JavaScript Flavors</Link>
                    <Link to="/frontend">Front-end Frameworks</Link>
                    <Link to="/state">State Management</Link>
                    <Link to="/backend">Full-Stack frameworks</Link>
                    <Link to="/testing">Testing Frameworks</Link>
                    <Link to="/style">CSS Tools</Link>
                    <Link to="/build">Build Tools</Link>
                    <Link to="/mobile">Mobile Frameworks</Link>
                    <Link to="/others">Other Tools</Link>
                    <Link to="/features">Features</Link>
                    <Link to="/opinions">Opinions</Link>
                </div>
            </div>
        )
    }
}
