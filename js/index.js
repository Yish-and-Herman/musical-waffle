"use strict";


//movies list in a variable

const movieSelection = document.getElementById("movies");

//function to pull movies from database

function selectMovie() {
    const movieSelector = document.querySelector("form");
    fetch('https://rain-wealthy-teacher.glitch.me/movies').then(response => {
        response.json().then(response => {
            addNewMovie(response);
        });

        movieSelector.addEventListener("submit", event =>
            event.preventDefault()
        )
    });
}

selectMovie()

//function to add user input to the json database

$("#submit-movie").click(function () {
    const movieTitle = $("#movie-title").val();
    const rating = $("#rating").val();
    const movieSubmission = {
        title: movieTitle,
        rating: rating
    }
    const selection = {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(movieSubmission),
    }
    fetch('https://rain-wealthy-teacher.glitch.me/movies', selection)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    fetch('https://rain-wealthy-teacher.glitch.me/movies')
        .then(response => response.json())
        .then(response => {
            addNewMovie(response);
        })
});

// This is meant to add the movies to the html

function addNewMovie(movie) {
    const newMovie = "";
    for (let i = 0; i < movie.length; i++) {
        movie += `<li> You have entered: ${movie[i].title} 
                  <span>You gave it a rating of: ${movie[i].rating}</span>
    </li>`
    }
    movieSelection.innerHTML = newMovie
}


console.log(addNewMovie);
