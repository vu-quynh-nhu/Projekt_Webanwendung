function getMovieDataByName(name) {
    const passedUrl = new URLSearchParams(window.location.search);
    return passedUrl.get(name);
}

const selectedMovieTitle = getMovieDataByName("title");
let newDate = new Date();
let date = newDate.toISOString().split("T")[0];  

const commentsContainer = document.querySelector(".movie-comments");
const starRatingContainer = document.querySelector(".movie-starRating");

fetch("../php/getMovies.php").then(response => response.json()).then(data => {
    const selectedMovie = data.find(movie => movie.title === selectedMovieTitle);
     if (selectedMovie){
        document.querySelector(".movie-title").textContent = selectedMovie.title;
        document.querySelector(".movie-release-year").textContent = selectedMovie.release_year;
        document.querySelector(".movie-about-title").textContent = selectedMovie.title;
        document.querySelector(".movie-about-year").textContent = selectedMovie.release_year;
        document.querySelector(".movie-about-genre").textContent = selectedMovie.genre;
        document.querySelector(".movie-about-director").textContent = selectedMovie.directors;
        document.querySelector(".movie-about-actors").textContent = selectedMovie.actors;
        document.querySelector(".movie-decription").textContent = selectedMovie.short_description;
        document.getElementById("thumbnail").src = selectedMovie.thumbnail;
        document.getElementById("movie_id").value = selectedMovie.id; 
        document.getElementById("movie_name").value = selectedMovie.title; 
        document.getElementById("date_of_comment").value = date; 
        document.title = "Reviewer - " + selectedMovie.title;

        const movieId = selectedMovie.id;
        fetch(`../php/getCommentsMovie.php?movies_id=${movieId}`).then(response => response.json()).then(comments => {
            if (comments.length === 0) {
                const noComment = document.createElement("div");
                noComment.className = "comments";
                noComment.style.width = "100%";
                noComment.style.height = "155px";
                noComment.style.marginTop = "35px";
                noComment.style.color = "rgb(153, 123, 84)";
                noComment.style.fontSize = "22px";
                noComment.style.fontWeight = "500";
                noComment.textContent = "Es gibt zu " + selectedMovie.title + " noch keine Kommentare.";
                commentsContainer.appendChild(noComment);

                let totalStars = 5;
                for (let i = 0; i < totalStars; i++) {
                    const star = document.createElement("label");
                    star.style.color = "white";
                    star.style.marginRight = "7px";
                    star.style.fontSize = "20px";
                    star.innerHTML = "★";
                    starRatingContainer.appendChild(star);
                }
            } else {
                comments.forEach(movieComment => {
                    const comment = document.createElement("div");
                    comment.className = "comments";
                    comment.style.width = "100%";
                    comment.style.minHeight = "155px";
                    comment.style.backgroundColor = "black";
                    comment.style.borderStyle = "solid";
                    comment.style.borderWidth = "thin";
                    comment.style.borderColor = "rgb(94, 94, 94)";
                    commentsContainer.appendChild(comment);

                    const comments_top_section = document.createElement("div");
                    comments_top_section.className = "comments-top-section";
                    comments_top_section.style.color = "rgb(153, 123, 84)";
                    comments_top_section.style.height = "50px";
                    comments_top_section.style.fontWeight = "500";
                    comments_top_section.style.fontSize = "20px";
                    comments_top_section.style.paddingTop = "10px";
                    comments_top_section.style.textAlign = "left";
                    comment.appendChild(comments_top_section);


                    const comments_top_section_commentator = document.createElement("div");
                    comments_top_section_commentator.className = "comments-top-section-commentator";
                    comments_top_section_commentator.innerHTML = movieComment.commentator_name;
                    comments_top_section_commentator.style.marginLeft = "25px";
                    comments_top_section_commentator.style.minWidth = "10px";
                    comments_top_section_commentator.style.display = "inline-block";
                    comments_top_section.appendChild(comments_top_section_commentator);

                    const comments_top_section_starRating = document.createElement("div");
                    comments_top_section_starRating.className = "comments-top-section-commentator";
                    comments_top_section_starRating.style.width = "139px";
                    comments_top_section_starRating.style.display = "inline-block";
                    comments_top_section_starRating.style.padding = "0px 10px 0px 10px";
                    comments_top_section.appendChild(comments_top_section_starRating);

                    const totalStars = 5;
                    let ratedStars = movieComment.starrating;

                    for (let i = 0; i < totalStars; i++) {
                        const star = document.createElement("label");
                        if (i < ratedStars) {
                            star.style.color = "rgb(153, 123, 84)";
                        } else {
                            star.style.color = "white";
                        }
                        star.style.marginRight = "7px";
                        star.style.fontSize = "20px";
                        star.innerHTML = "★";
                        comments_top_section_starRating.appendChild(star);
                    }

                    const date_of_comment = movieComment.date_of_comment.split("-");
                    const reverseDate = `${date_of_comment[2]}.${date_of_comment[1]}.${date_of_comment[0]}`
                    const comments_top_section_date = document.createElement("div");
                    comments_top_section_date.className = "comments-top-section-commentator";
                    comments_top_section_date.style.width = "139px";
                    comments_top_section_date.style.display = "inline-block";
                    comments_top_section_date.style.color = "white";
                    comments_top_section_date.style.float = "right";
                    comments_top_section_date.style.textAlign = "right";
                    comments_top_section_date.style.marginRight = "25px";
                    comments_top_section_date.innerHTML = reverseDate;
                    comments_top_section.appendChild(comments_top_section_date);
                    
                    const commemts_bottom_section = document.createElement("div");
                    commemts_bottom_section.className = "commemts-bottom-section";
                    commemts_bottom_section.style.color = "white";
                    commemts_bottom_section.style.fontWeight = "500";
                    commemts_bottom_section.style.fontSize = "20px";
                    commemts_bottom_section.style.textAlign = "left";
                    commemts_bottom_section.style.padding = "10px 25px 15px 25px";
                    commemts_bottom_section.innerHTML = movieComment.comment_text;
                    commemts_bottom_section.style.textAlign = "justify";
                    comment.appendChild(commemts_bottom_section);
                })

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
                        star.style.color = "white";
                    }
                    star.style.marginRight = "7px";
                    star.style.fontSize = "20px";
                    star.innerHTML = "★";
                    starRatingContainer.appendChild(star);
                }
            }
        })
    };
})