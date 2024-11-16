fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;
})

function getMoviesByGenre(genre) {
    const passedUrl = new URLSearchParams(window.location.search);
    return passedUrl.get(genre);
}

const selectedGenre = getMoviesByGenre("genre");

fetch("../php/getMovies.php").then(response => response.json()).then(data => {
    const moviesContainer = document.querySelector(".movies-container");
    const moviesPopularContainer = document.querySelector(".movies-popular-container");
    //sort movie entries from lastly added to the databse to firstly added
    data.sort((firstMovie, lastMovie) => lastMovie.id - firstMovie.id);

    const moviesOfSelectedGenre = data.filter(movie => movie.genre === selectedGenre);
    if (moviesOfSelectedGenre.length === 0) {
        const noMoviesDiv = document.createElement("div");
        noMoviesDiv.className = "no-movies";
        noMoviesDiv.style.color = "white";
        noMoviesDiv.style.width = "97%";
        noMoviesDiv.style.height = "30px"
        noMoviesDiv.style.textAlign = "center";
        noMoviesDiv.style.fontSize = "20px"
        noMoviesDiv.style.marginTop = "30px";
        noMoviesDiv.innerHTML = "Es gibt für die Genre " + selectedGenre + " noch keine Einträge";
        moviesContainer.appendChild(noMoviesDiv);

        const noPopularMoviesDiv = noMoviesDiv.cloneNode(true);
        moviesPopularContainer.appendChild(noPopularMoviesDiv);
    } else {
        //loop through each movie
        moviesOfSelectedGenre.forEach(movie_data => {
            const moviePageRedirection = document.createElement("a");
            moviePageRedirection.href = `movie-page.html?title=${encodeURIComponent(movie_data.title)}`;
            moviePageRedirection.style.textDecoration = "none";

            /*Create a card component for every entry in the database*/
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            cardDiv.style.display = "inline-block";
            cardDiv.style.marginRight = "10px";
            cardDiv.style.width = "200px";
            cardDiv.style.height = "330px";
            cardDiv.style.borderRadius = "7px";
            cardDiv.style.backgroundColor = "white";
            cardDiv.style.marginBottom = "10px";
            moviesContainer.appendChild(cardDiv);

            const thumbnail = document.createElement("img");
            thumbnail.src = movie_data.thumbnail;
            thumbnail.style.width = "100%";
            thumbnail.style.height = "267.5px";
            thumbnail.style.objectFit = "cover";
            thumbnail.style.borderTopLeftRadius = "7px";
            thumbnail.style.borderTopRightRadius = "7px";
            cardDiv.appendChild(thumbnail);

            const titleDiv = document.createElement("div");
            titleDiv.className = "titleDiv";
            titleDiv.style.textAlign = "center";
            titleDiv.style.fontSize = "17px";
            titleDiv.style.fontWeight = "700";
            titleDiv.style.color = "black";
            titleDiv.style.height = "50px";
            titleDiv.style.paddingTop = "5px";
            titleDiv.style.overflow = "hidden";
            titleDiv.style.whiteSpace = "nowrap";
            titleDiv.style.textOverflow = "ellipsis";
            titleDiv.textContent = movie_data.title;
            cardDiv.appendChild(titleDiv);

            const starDiv = document.createElement("div");
            starDiv.className = "starDiv";
            titleDiv.appendChild(starDiv);

            moviePageRedirection.appendChild(cardDiv);
            moviesContainer.appendChild(moviePageRedirection);

            const movieId = movie_data.id;
            fetch(`../php/getCommentsMovie.php?movies_id=${movieId}`).then(response => response.json()).then(comments => {
                if (comments.length > 0) {
                    let sumStarRating = 0;
                    const totalStars = 5;
                    comments.forEach(starRating => {
                        sumStarRating += starRating.starrating;
                    })
                    let averageStarRating = sumStarRating / comments.length;

                    for (let i = 0; i < totalStars; i++) {
                        const star = document.createElement("label");
                        if (i < averageStarRating) {
                            star.style.color = "rgb(153, 123, 84)";
                        } else {
                            star.style.color = "black";
                        }

                        if (i < totalStars - 1) {
                            star.style.marginRight = "7px";
                        }

                        star.style.fontSize = "20px";
                        star.innerHTML = "★";
                        star.style.cursor = "pointer";
                        starDiv.appendChild(star);
                    }

                    if (averageStarRating > 3) {
                        const popularMoviesPageRedirection = moviePageRedirection.cloneNode(true);
                        moviesPopularContainer.appendChild(popularMoviesPageRedirection);
                    }

                } else {
                    let totalStars = 5;
                    for (let i = 0; i < totalStars; i++) {
                        const star = document.createElement("label");
                        star.style.color = "black";

                        if (i < totalStars - 1) {
                            star.style.marginRight = "7px";
                        }

                        star.style.fontSize = "20px";
                        star.innerHTML = "★";
                        star.style.cursor = "pointer";
                        starDiv.appendChild(star);
                    }
                }

            })
        });
    }
})