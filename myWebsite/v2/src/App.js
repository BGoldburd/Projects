import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Projects from './Projects';
import Contact from './Contact';

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
