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
