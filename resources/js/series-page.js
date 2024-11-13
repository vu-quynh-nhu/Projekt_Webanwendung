function getSeriesDataByName(name) {
    const passedUrl = new URLSearchParams(window.location.search);
    return passedUrl.get(name);
}

const selectedSeriesTitle = getSeriesDataByName("title");
let newDate = new Date();
let date = newDate.toISOString().split("T")[0];
let splitDate = date.split("-");
let reverseDate = `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`

const commentsContainer = document.querySelector(".series-comments");
const starRatingContainer = document.querySelector(".series-starRating");

fetch("../php/getSeries.php").then(response => response.json()).then(data => {
    const selectedSeries = data.find(series => series.title === selectedSeriesTitle);
    if (selectedSeries) {
        document.querySelector(".series-title").textContent = selectedSeries.title;
        document.querySelector(".series-release-year").innerHTML = selectedSeries.release_year;
        document.querySelector(".series-about-title").innerHTML = selectedSeries.title;
        document.querySelector(".series-about-year").innerHTML = selectedSeries.release_year;
        document.querySelector(".series-about-genre").innerHTML = selectedSeries.genre;
        document.querySelector(".series-about-seasons").innerHTML = selectedSeries.seasons;
        document.querySelector(".series-about-director").innerHTML = selectedSeries.directors;
        document.querySelector(".series-about-actors").innerHTML = selectedSeries.actors;
        document.querySelector(".series-decription").innerHTML = selectedSeries.short_description;
        document.getElementById("thumbnail").src = selectedSeries.thumbnail;
        document.getElementById("series_id").value = selectedSeries.id;
        document.getElementById("series_name").value = selectedSeries.title;
        document.getElementById("date_of_comment").value = date;
        document.title = "Reviewer - " + selectedSeries.title;

        const seriesId = selectedSeries.id;
        fetch(`../php/getCommentsSeries.php?series_id=${seriesId}`).then(response => response.json()).then(comments => {
            if (comments.length === 0) {
                const noComment = document.createElement("div");
                noComment.className = "comments";
                noComment.style.width = "100%";
                noComment.style.height = "155px";
                noComment.style.marginTop = "35px";
                noComment.style.color = "rgb(153, 123, 84)";
                noComment.style.fontSize = "22px";
                noComment.style.fontWeight = "500";
                noComment.textContent = "Es gibt zu " + selectedSeries.title + " noch keine Kommentare.";
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
                comments.forEach(seriesComment => {
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
                    comments_top_section.style.textAlign = "left";
                    comment.appendChild(comments_top_section);

                    const comments_top_section_commentator = document.createElement("div");
                    comments_top_section_commentator.className = "comments-top-section-commentator";
                    comments_top_section_commentator.innerHTML = seriesComment.commentator_name;
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
                    let ratedStars = seriesComment.starrating;

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
                    commemts_bottom_section.innerHTML = seriesComment.comment_text;
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



