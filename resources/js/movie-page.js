function getMovieDataByName(name) {
    const passedUrl = new URLSearchParams(window.location.search);
    return passedUrl.get(name);
}

const selectedMovieTitle = getMovieDataByName("title");
let newDate = new Date();
let date = newDate.toISOString().split("T")[0];
let splitDate = date.split("-");
let reverseDate = `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`

fetch("../php/getMovies.php").then(response => response.json()).then(data => {
    const selectedMovie = data.find(movie => movie.title === selectedMovieTitle);

     if (selectedMovie){
        document.querySelector(".movie-title").textContent = selectedMovie.title;
        document.querySelector(".movie-release-year").innerHTML = selectedMovie.release_year;
        document.querySelector(".movie-about-title").innerHTML = selectedMovie.title;
        document.querySelector(".movie-about-year").innerHTML = selectedMovie.release_year;
        document.querySelector(".movie-about-genre").innerHTML = selectedMovie.genre;
        document.querySelector(".movie-about-director").innerHTML = selectedMovie.directors;
        document.querySelector(".movie-about-actors").innerHTML = selectedMovie.actors;
        document.querySelector(".movie-decription").innerHTML = selectedMovie.short_description;
        document.getElementById("thumbnail").src = selectedMovie.thumbnail;
        document.getElementById("movies_id").value = selectedMovie.id; 
        document.getElementById("movies_name").value = selectedMovie.title; 
        document.getElementById("date_of_comment").value = date; 
        document.title = "Reviewer - " + selectedMovie.title;
    };
})