import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    state = {  }
    render() { 
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between p-3">
                    <div className="ml-2" style={{fontFamily: 'Righteous, cursive'}}>
                        <Link to='/' className="navbar-brand">Benjamin Goldburd</Link>
                    </div>
                    <div id="navbarLinks">
                        <button className="navbar-toggler  ml-4" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item ml-4">
                                    <Link to='/' style={{ textDecoration: 'none' }}><span className="nav-link text-light">Home</span></Link>
                                </li>
                                <li className="nav-item ml-4">
                                    <Link to='/projects' style={{ textDecoration: 'none' }}><span className="nav-link text-light">Projects</span></Link>
                                </li>
                                <li className="nav-item ml-4 mr-2">
                                    <Link to='/contact' style={{ textDecoration: 'none' }}><button className="nav-link btn text-light btn-secondary">Contact</button></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}
 
export default Navbar;