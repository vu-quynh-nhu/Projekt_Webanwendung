
fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;

    let cssForNavbar = "../css/navigationbar.css";
    const navigationBarCss = document.createElement("link");
    navigationBarCss.rel = "stylesheet";
    navigationBarCss.href = cssForNavbar;
    document.head.appendChild(navigationBarCss);
})

//compare movie creator with currently logged user
fetch("../php/loginCheck.php").then(response => response.json()).then(login => {
    if (login.isUserLoggedIn) {
        const targetedUsername = login.username;

        fetch("../php/getMovies.php").then(response => response.json()).then(data => {
            const moviesContainer = document.querySelector(".movies-container");

            const moviesOfTargetedUsername = data.filter(movie => movie.creator === targetedUsername);
            if (moviesOfTargetedUsername.length === 0) {
                const noMoviesDiv = document.createElement("div");
                noMoviesDiv.className = "no-movies";
                noMoviesDiv.style.color = "rgb(71, 71, 71)";
                noMoviesDiv.style.width = "97%";
                noMoviesDiv.style.height = "30px"
                noMoviesDiv.style.paddingLeft = "28px";
                noMoviesDiv.style.fontSize = "20px"
                noMoviesDiv.style.marginTop = "30px";
                noMoviesDiv.innerHTML = "Du hast noch keine Filme erstellt.";
                moviesContainer.appendChild(noMoviesDiv);
            } else {
                moviesOfTargetedUsername.forEach(movie_data => {
                    const moviePageRedirection = document.createElement("a");
                    moviePageRedirection.href = `../php/edit_film.php?id=${movie_data.id}`;
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

        fetch("../php/getSeries.php").then(response => response.json()).then(data => {
            const seriesContainer = document.querySelector(".series-container");

            const seriesOfTargetedUsername = data.filter(series => series.creator === targetedUsername);
            if (seriesOfTargetedUsername.length === 0) {
                const noSeriesDiv = document.createElement("div");
                noSeriesDiv.className = "no-series";
                noSeriesDiv.style.color = "rgb(71, 71, 71)";
                noSeriesDiv.style.width = "97%";
                noSeriesDiv.style.height = "30px"
                noSeriesDiv.style.paddingLeft = "28px";
                noSeriesDiv.style.fontSize = "20px"
                noSeriesDiv.style.marginTop = "30px";
                noSeriesDiv.innerHTML = "Du hast noch keine Serien erstellt.";
                seriesContainer.appendChild(noSeriesDiv);
            } else {
                seriesOfTargetedUsername.forEach(series_data => {
                    const seriesPageRedirection = document.createElement("a");
                    seriesPageRedirection.href = `../php/edit_series.php?id=${series_data.id}`;
                    seriesPageRedirection.style.textDecoration = "none";

                    const cardDiv = document.createElement("div");
                    cardDiv.className = "card";
                    cardDiv.style.display = "inline-block";
                    cardDiv.style.marginRight = "10px";
                    cardDiv.style.width = "200px";
                    cardDiv.style.height = "330px";
                    cardDiv.style.borderRadius = "7px";
                    cardDiv.style.backgroundColor = "white";
                    cardDiv.style.marginBottom = "10px";
                    seriesContainer.appendChild(cardDiv);

                    const thumbnail = document.createElement("img");
                    thumbnail.src = series_data.thumbnail;
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
                    titleDiv.textContent = series_data.title;
                    cardDiv.appendChild(titleDiv);

                    const starDiv = document.createElement("div");
                    starDiv.className = "starDiv";
                    titleDiv.appendChild(starDiv);

                    seriesPageRedirection.appendChild(cardDiv);
                    seriesContainer.appendChild(seriesPageRedirection);

                    const seriesId = series_data.id;
                    fetch(`../php/getCommentsSeries.php?series_id=${seriesId}`).then(response => response.json()).then(comments => {
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
    }
})
