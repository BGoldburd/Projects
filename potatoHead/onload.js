/*global $*/
window.onload = function () {
    'use strict';

    const musicButton = $('#musicButton');
    const music = $(
        '<audio id="music" src="media/1-17 Ponchielli_ La Gioconda - Dance.m4a" loop></audio>')
        .appendTo('body');
    
    musicButton.click(function () {
        if (music[0].paused === false) {
            music[0].pause();
            musicButton.text('play music');
        } else {
            music[0].play();
            musicButton.text('pause music');
        }
    });
};