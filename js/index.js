"use strict";
$(document).ready(function () {

    const getMoviesFromOMdb_API = (movieToAdd) => {
        const OMdb_API = `http://www.omdbapi.com/?i=tt3896198&apikey=91205e9a=${movieAPI}&t=${movieToAdd.title}`;
        fetch(OMdb_API).then(response => {
            response.json().then(moviesFromOMDB => {
                // Object Properties for moviesFromOMDB: Title, Year, Genre, Director, Actors, Plot, Poster
                //HOW THIS WORKS: users only need to enter the movie title and OMDB will populate the rest if left empty
                //If a movie is a remake ex: Scarface 1932 vs Scarface 1983, user will need to enter the year

                movieToAdd.poster = moviesFromOMDB.Poster //movie poster will auto-populate from OMDB, no user input needed

                //If statements for fields left blank

                if (movieToAdd.plot === ""){
                    movieToAdd.plot = moviesFromOMDB.Plot
                }
                if( movieToAdd.actors === ""){
                    movieToAdd.actors = moviesFromOMDB.Actors
                }
                if (movieToAdd.director === ""){
                    movieToAdd.director = moviesFromOMDB.Director
                }
                if (movieToAdd.genre === ""){
                    movieToAdd.genre = moviesFromOMDB.Genre
                }
                if (movieToAdd.year === ""){
                    movieToAdd.year = moviesFromOMDB.Year
                }

                addMovie(movieToAdd);

            });
        })
    }

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

    function getAllMovies() {
        AJAX(url).then(responseData => {
            $('#movies').html("")
            console.log(responseData)
            responseData.forEach(function (movie) {
                $('#movies').append(
                    // html +=
                    `<div class= "col card" style="width: 25rem;">
  <img src=${movie.poster} class="card-img-top" alt="...">
  <div class="card-body">
   <p class="card-text">Movie title: ${movie.title}</p>
    <p class="card-text">Movie rating: ${movie.rating}</p>
    <p class="card-text">Synopsis: ${movie.plot}</p>
    <button type="submit" class="delete-button" data-id="${movie.id}">Delete Movie</button>
        <button type="submit" class="edit-button" data-id="${movie.id}">Edit Movie</button>

  </div>
</div>`)
            })
            addEventListeners()
        });

        $('.spinner-border').hide();
    }

    getAllMovies()

// function getOneMovie(id) {
//     AJAX(`${url}/${id}`).then(responseData => console.log(responseData));
// }
//
// getOneMovie(2)


    function addEventListeners() {
        $('.delete-button').click(function () {
            const idToDelete = $(this).attr("data-id")
            console.log(idToDelete);
            AJAX(`${url}/${idToDelete}`, "DELETE").then(responseData => console.log(responseData));
            getAllMovies()
        });
        $('.edit-button').click(function () {
            const idToEdit = $(this).attr("data-id")
            $('#myModal').modal('show')
            $('#saveChanges').click(function (event) {
                event.preventDefault()
                updateMovies(idToEdit)
                $('#myModal').modal('hide')
                getAllMovies()
            })
        });
        // $('.edit-button').click(function () {
        //     const idToEdit = $(this).attr("data-id")
        //     $('#myModal').modal('show')
        //     $('#saveChanges').click(function (event) {
        //         event.preventDefault()
        //         updateMovies(idToEdit)
        //         $('#myModal').modal('hide')
        //         getAllMovies()
    }

    function updateMovies(id) {
        AJAX(`${url}/${id}`, "PATCH", {plot: $('#edit-box').val(), title: $('#edit-title').val(), rating: $('#edit-rating').val() }).then(responseData => console.log(responseData));

    }

// updateMovies(30)

    function addMovie() {
        const movieToAdd = {
            title: $('#movie-title').val(),
            rating: $('#rating').val(),
        };
        console.log(movieToAdd)

        AJAX(url, "POST", movieToAdd).then(responseData => console.log(responseData));
    }

    $('#submit-movie').click(function (event) {
        event.preventDefault()
        addMovie()
    });
})

//div w/ id movies
//create html
//include bootstrap in html
//find card
//grab card and slap it inside ``
//place content inside card ${}
//target div with id movies using DOM
//append var html with ``
//create user input for modal


// when save changes clicked call update movie
//hide modal inside click event
//call getallmovies again

