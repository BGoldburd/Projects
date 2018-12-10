import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Weather from './Weather';

class App extends Component {
  state = {
    weather: {}
  }

  getWeather = weatherData => {
    this.setState({
      weather: weatherData
    })
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <div className="jumbotron jumbotron-fluid m-0 text-center p-3">
          <h1 className="p-3" style={{fontFamily: 'cursive'}}>Weather App</h1>
        </div>
        <Form getWeather={this.getWeather}/>
        <Weather weatherData={this.state.weather}/>
      </div>
    );
  }
}

export default App;
