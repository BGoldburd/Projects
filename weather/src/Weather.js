import React, { Component } from 'react';

class Weather extends Component {
    state = {  }
    render() {
        const place = this.props.weatherData.weather ?
            <h3 className="mx-auto">The weather in <span>{this.props.weatherData.name}</span></h3>
            : this.renderedOnce ? <h3 className="mx-auto">Invalid zipcode</h3> : null
            
        const image = this.props.weatherData.weather ? 
            <img src={`http://openweathermap.org/img/w/${this.props.weatherData.weather[0].icon}.png`} alt="weather" id="weatherPicture" className="mx-auto" />
            : null;

        const descrpition = this.props.weatherData.weather ?
            <h3 className="mx-auto">{`${this.props.weatherData.main.temp}`}&deg; and {`${this.props.weatherData.weather[0].description}`}</h3>
            : null;

        this.renderedOnce = true;

        return (
        <React.Fragment>
            <div className="row m-0">
                {place}
            </div>
            <div className="row m-0">
                {image}
            </div>
            <div className="row m-0">
                {descrpition}
            </div>
        </React.Fragment>
         );
    }
}
 
export default Weather;