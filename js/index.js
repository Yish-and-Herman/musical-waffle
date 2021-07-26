"use strict";


//movies list in a variable
const url = 'https://rain-wealthy-teacher.glitch.me/movies'
const movieSelection = document.getElementById("movies");

function AJAX(url, method = "GET", data) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return fetch(url, options)
        .then(res => res.json())
        .then(responseData => responseData)
        .catch(err => err)
}

function getAllMovies(){
    AJAX(url).then(responseData => {
        console.log(responseData)
        responseData.forEach(function (movie){
            // let html = "";
            $('#movies').append(
            // html +=
                `<div class="card" style="width: 18rem;">
  <img src=${movie.poster} class="card-img-top" alt="...">
  <div class="card-body">
  
    <p class="card-text">Movie title: ${movie.title}</p>
    <p class="card-text">Movie rating: ${movie.rating}</p>
    <p class="card-text">Synopsis: ${movie.plot}</p>
  </div>
</div>`)
        })
    });
}

getAllMovies()

function getOneMovie(id){
    AJAX(`${url}/${id}`).then(responseData => console.log(responseData));
}

getOneMovie(2)

function deleteMovie(id){
    AJAX(`${url}/${id}`, "DELETE").then(responseData => console.log(responseData));
}

function updateMovies(id) {
    AJAX(`${url}/${id}`, "PATCH", {name: "Iron Man 2", rating: 2.5}).then(responseData => console.log(responseData));

}

// updateMovies(30)

function addMovie() {
    const movieToAdd = {
        name: "Iron Man",
        rating: 5,


    };


    AJAX(url, "POST", movieToAdd).then(responseData => console.log(responseData));

}



//div w/ id movies
//create html
//include bootstrap in html
//find card
//grab card and slap it inside ``
//place content inside card ${}
//target div with id movies using DOM
//append var html with ``



// addMovie();
//function to pull movies from database

// function selectMovie() {
//     const movieSelector = document.querySelector("form");
//     fetch('https://rain-wealthy-teacher.glitch.me/movies').then(response => {
//         response.json().then(response => {
//             addNewMovie(response);
//         });
//
//         movieSelector.addEventListener("submit", event =>
//             event.preventDefault()
//         )
//     });
// }
//
// selectMovie()
//
// //function to add user input to the json database
//
// $("#submit-movie").click(function () {
//     const movieTitle = $("#movie-title").val();
//     const rating = $("#rating").val();
//     const movieSubmission = {
//         title: movieTitle,
//         rating: rating
//     }
//     const selection = {
//         method: "POST",
//         headers: {
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify(movieSubmission),
//     }
//     fetch('https://rain-wealthy-teacher.glitch.me/movies', selection)
//         .then(response => console.log(response))
//         .catch(error => console.log(error));
//     fetch('https://rain-wealthy-teacher.glitch.me/movies')
//         .then(response => response.json())
//         .then(response => {
//             addNewMovie(response);
//         })
// });

// This is meant to add the movies to the html