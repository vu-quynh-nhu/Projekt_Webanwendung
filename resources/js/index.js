function getMovieDataByName(name) {
    const passedUrl = new URLSearchParams(window.location.search);
    return passedUrl.get(name);
}

const selectedMovieTitle = getMovieDataByName("title");

fetch("../php/getMovies.php").then(response => response.json()).then(data => {
    document.querySelector(".")
})