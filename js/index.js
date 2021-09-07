"use strict";
$(document).ready(function () {



//movies list in a variable
const url = 'https://rain-wealthy-teacher.glitch.me/movies'
const movieSelection = document.getElementById("movies");

// const getMoviesFromOMdb_API = (movieToAdd) => {
//     const OMdb_API = `http://www.omdbapi.com/?i=tt3896198&apikey=91205e9a=${movieAPI}&t=${movieToAdd.title}`;
//     fetch(OMdb_API).then(response => {
//         response.json().then(moviesFromOMDB => {
//
//             if (movieToAdd.plot === "") {
//                 movieToAdd.plot = moviesFromOMDB.Plot
//             }
//             if (movieToAdd.actors === "") {
//                 movieToAdd.actors = moviesFromOMDB.Actors
//             }
//             if (movieToAdd.director === "") {
//                 movieToAdd.director = moviesFromOMDB.Director
//             }
//             if (movieToAdd.genre === "") {
//                 movieToAdd.genre = moviesFromOMDB.Genre
//             }
//             if (movieToAdd.year === "") {
//                 movieToAdd.year = moviesFromOMDB.Year
//             }
//
//             addMovie(movieToAdd);
//
//         });
//     })
// }


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

    let inputText = $('#movie-title').val();

    function getMoviePoster(movie) {
        $.get("http://www.omdbapi.com/?s=" + movie + "&apikey=91205e9a", function (rawdata) {
            let rawString = JSON.stringify(rawdata)
            data = JSON.parse(rawString)
            let title = data.Search[0].title;
            let year = data.Search[0].year;
            // let imdburl = "https://www.imdb.com/title/" + data.Search[0].imdb + "/";
            let posterURL = data.Search[0].poster;
            // let inputRating = $(".addRating").val();
            // console.log(inputRating)
            let movieLayout = (
                "<div class='card movieDiv'>" + "<div class='card-body'>" +
                "<span class='currentRating mt-10' style='font-size: 2em;'> Added!</span>" + "<h1>" + title + "</h1>" + "<br>" + "<a href='" + imdburl + "' target='_blank' rel='noopener noreferrer'><img class='card-img-top'src='" + posterURL + "'></a>" + "<br>" + "<p>Year Released:" + year + "</p>" + "<br>" + "</div>" + "</div>")
            $("#movies").append(movieLayout);
        })
    }

    getMoviePoster(inputText)
}


function getAllMovies() {
    AJAX(url).then(responseData => {
        $('#movies').html("")
        console.log(responseData)
        responseData.forEach(function (movie) {
            $('#movies').append(
                `<div class= "col card" style="width: 25rem;">
  <img src= posterURL  class="card-img-top" alt="...">
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

}

function updateMovies(id) {
    AJAX(`${url}/${id}`, "PATCH", {
        plot: $('#edit-box').val(),
        title: $('#edit-title').val(),
        rating: $('#edit-rating').val()
    }).then(responseData => console.log(responseData));

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

