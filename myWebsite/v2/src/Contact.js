import React, { Component } from 'react';

class Contact extends Component {
    state = {  }
    render() { 
        return (
            <>
                <div className="jumbotron jumbotron-fluid text-center">
                    <div className="container">
                        <h1 className="display-4 font-weight-normal">Contact Me</h1>
                    </div>
                </div>
                <div id="homeDetails" className="container text-center pb-4 pt-4">
                    <div className="pb-3 pt-3">
                        <p>I am currently seeking an opportunity in software and web development. I am based in central New Jersey. To suggest an opportunity, or to submit feedback regarding this website, please email me: <strong>info@bgoldburd.com</strong></p>
                    </div>
                    <div className="pb-3 pt-3">
                        <p>To view my LinkedIn profile, please click <a href="https://www.linkedin.com/in/benjamin-goldburd-786799163/" rel="noopener noreferrer" target="_blank">here</a>.</p>
                    </div>
                    <div className="pb-3 pt-3">
                        <p>To view my Github repository, please click <a href="https://github.com/BGoldburd/Projects" rel="noopener noreferrer" target="_blank">here</a>.</p>
                    </div>
                    <div id="spacerDiv"></div>
                </div>
            </>
        );
    }
}
 
export default Contact;