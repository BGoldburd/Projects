import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';


class Home extends Component {

    //for IE support
    componentDidMount () {
        const contactButton = $('#contactButton');
        if (contactButton.css('background-color') === 'rgb(240, 240, 240)') {
            contactButton.css({
                color: 'black'
            });
        }
    }

    render() { 
        return (
            <>
                <div className="jumbotron jumbotron-fluid text-center">
                    <div className="container">
                        <h1 className="display-4 font-weight-normal">Benjamin Goldburd's Profile</h1>
                        <h3 className="m-3">Software and Web Developer</h3>
                        <div className="m-5">
                            <Link to='/projects'><button className="btn btn-dark btn-lg m-1">View Projects</button></Link>
                            <Link to='/contact'><button id="contactButton" className="btn btn-outline-light btn-lg m-1">Contact Me</button></Link>
                        </div>
                    </div>
                </div>
                <div id="homeDetails" className="container text-center pb-4 pt-4">
                    <div className="pb-4 pt-4">
                        <h3>View My Recent Projects</h3>
                        <p>Click the "Projects" link to see some of my recent projects which were built with a broad range of technologies and frameworks. Don't forget to check back soon for more additions.</p>
                    </div>
                    <div className="pb-4 pt-4">
                        <h3>Explore This Site</h3>
                        <p>This website was created using React.js, React Router and bootstrap. It is a single-page application, making it powerful and efficient. Additionally, feel free to test it on your smartphone or tablet to see its mobile-compatibility.</p>
                    </div>
                    <div className="pb-4 pt-4">
                        <h3>Contact Me</h3>
                        <p>See the "Contact" page for more information, and to be able to contact me. Don't hesitate to send me some feedback regarding this site, since feedback is always appreciated!</p>
                    </div>
                </div>               
            </>
        );
    }
}
 
export default Home;