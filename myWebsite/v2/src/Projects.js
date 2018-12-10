import React, { Component } from 'react';
import $ from 'jquery';
import Project from './project';
import Map from './images/map.jpg';
import Scenery from './images/scenery.jpg';
import Blog from './images/blog.png';
import Weather from './images/weather.png';
import PotatoHead from './images/potatoHead.png';
import Calculator from './images/calculator2.png';
//import Snake from './images/snake.png';

class Projects extends Component {
    state = {
        projects: [
            {
                styleId: 'map',
                title: "Location Search",
                description: "This application uses the Google Maps API, and fetches Wikipedia data from geonames.org's API. You can draw on the map to mark your favorite places. Reload your browser and your drawings will be saved. (Tip: Use the hand selector to delete individual shapes.)",
                picture: Map,
                link: "recent-projects/cool-places/index.html"
            },
            {
                styleId: 'scenery',
                title: "Photo Search",
                description: "This photo search application fetches photo data from Flickr.com's API. Notice how photos load first with low quality, and then with high quality, to speed up loading time. This application was built using JavaScript, jQuery and Webpack.",
                picture: Scenery,
                link: 'recent-projects/free-photos/index.html'
            },
            {
                styleId: 'blog',
                title: "Sample Blog Site",
                description: "This is a sample blog site that fetches fake data used for testing, from JSONPlaceholder's API in JSON format. You can even add a comment to a post, although the comment is not actually stored on JSONPlaceholder's database.",
                picture: Blog,
                link: 'recent-projects/blog/index.html'
            },
            {
                styleId: 'weather',
                title: 'Weather App',
                description: "Enter any zip code in the United States to see the temperature and weather conditions for that area. You can choose between farenheit, celsius and kelvin. This application was built using React.js and AJAX.",
                picture: Weather,
                link: 'recent-projects/weather/index.html'
            },
            {
                styleId: 'calculator',
                title: 'Calculator',
                description: 'This calculator was built using pure, vanilla Javascript. It also uses new features of CSS such as Flexbox and CSS Grid. It can be used on its own, or as a great plugin for a larger website.',
                picture: Calculator,
                link: 'recent-projects/calculator/index.html'
            },
            {
                styleId: 'potatoHead',
                title: 'Draggable Items App',
                description: "This application allows you to drag items, reload your browser, and have items' positions saved. It uses jQuery, jQuery UI and z-index to allow for proper stacking. X-Y coordinates and z-index are saved on reload using Local Storage.",
                picture: PotatoHead,
                link: 'recent-projects/potato-head/index.html'
            }
            // {
            //     styleId: 'snake',
            //     title: 'Snake Game',
            //     description: 'Play snake! Use the arrow keys to navigate, and be sure not to crash into the wall or into your own tail. This application was built using jQuery, and uses the canvas feature of HTML.',
            //     picture: Snake,
            //     link: 'recent-projects/snake/index.html'
            // },
        ]
    }

    //for IE support
    componentDidMount () {
        const projectsDiv = $('#projectsDiv');
        const figure = $('#projectsDiv figure');
        if (!projectsDiv.css('grid-gap')) {
            figure.css({
                width: '32%',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '8px'
            });
        }
    }

    render() { 
        const projects = this.state.projects.map(project => <Project 
            styleId={project.styleId}
            title={project.title}
            description={project.description}
            picture={project.picture}
            link={project.link} />);

        return (
            <>
                <div className="jumbotron jumbotron-fluid text-center">
                    <div className="container">
                        <h1 className="display-4 font-weight-normal">My Recent Projects</h1>
                        <p className="lead font-weight-normal">Some of these projects were derived from school work, while others were built on my own.</p>
                    </div>
                </div>
                <div id="projectsDiv" className="container projectsContainer">
                    {projects}
                </div>
            </>
        );
    }
}
 
export default Projects;