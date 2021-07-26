"use strict";


//movies list in a variable

const movieSelection = document.getElementById("movies");

//function to pull movies from database

function selectMovie(){
    const movieSelector = document.querySelector("form");
    fetch('https://rain-wealthy-teacher.glitch.me/movies').then( response => {
        response.json().then( response => {
            appendMovie(response);
        });

        movieSelector.addEventListener("submit", event =>
            event.preventDefault()
        )
    });
}



