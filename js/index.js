"use strict";

fetch('https://rain-wealthy-teacher.glitch.me/movies').then( response => {
    response.json().then( movies => {
        console.log(movies);
    });
});