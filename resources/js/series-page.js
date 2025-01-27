function getSeriesDataById(id) {
    const passedUrl = new URLSearchParams(window.location.search);
    return passedUrl.get(id);
}

function checkForm(event) {
    event.preventDefault();

    var comment = document.forms["submit-comment"]["comment_text"].value;
    var starRating = document.forms["submit-comment"]["star"].value;

    var hasRatedStars = false;
    for (let i = 0; i < starRating.length; i++) {
        if (starRating[i].checked) {
            hasRatedStars = true;
        }
        break;
    }

    if (comment.trim() === "" || !starRating) {
        alert("Überprüfe, ob alle Felder ausgefüllt sind.");
        return false;
    }

    document.forms["submit-comment"].submit();
    return true;
}

fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;

    let cssForNavbar= "../css/navigationbar.css";
    const navigationBarCss = document.createElement("link");
    navigationBarCss.rel = "stylesheet";
    navigationBarCss.href = cssForNavbar;
    document.head.appendChild(navigationBarCss);
});

const selectedSeriesId = getSeriesDataById("id");
let newDate = new Date();
let date = newDate.toISOString().split("T")[0];  

const commentsContainer = document.querySelector(".series-comments");
const starRatingContainer = document.querySelector(".series-starRating");

fetch("../php/loginCheck.php").then(response => response.json()).then(login => {
    let targetedUsername; 

    if (login.isUserLoggedIn) {
        targetedUsername = login.username;
        document.getElementById("commentator_name").value = login.username;
    } else {
        document.getElementById("commentator_name").value = "Anonym";
    }

    fetch("../php/getSeries.php").then(response => response.json()).then(data => {
        const selectedSeries = data.find(series => series.id === selectedSeriesId);
        if (selectedSeries) {
            document.querySelector(".series-title").textContent = selectedSeries.title;
            document.querySelector(".series-release-year").textContent = selectedSeries.release_year;
            document.querySelector(".series-about-title").textContent = selectedSeries.title;

            const edit_series_anchor = document.getElementById("edit-series-anchor");
            if (targetedUsername === selectedSeries.creator) {
                const edit_series_btn = document.createElement("button");
                edit_series_btn.className = "edit-series-btn";
                edit_series_btn.textContent = "Bearbeiten";
                edit_series_anchor.appendChild(edit_series_btn);

                edit_series_anchor.href = `../php/edit_series.php?id=${selectedSeries.id}`;
            }

            document.querySelector(".series-creator-name").textContent = selectedSeries.creator;
            document.querySelector(".series-about-year").textContent = selectedSeries.release_year;
            document.querySelector(".series-about-genre").textContent = selectedSeries.genre;
            document.querySelector(".series-about-seasons").textContent = selectedSeries.seasons;
            document.querySelector(".series-about-director").textContent = selectedSeries.directors;
            document.querySelector(".series-about-actors").textContent = selectedSeries.actors;
            document.querySelector(".series-decription").textContent = selectedSeries.short_description;
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
                    noComment.style.textAlign = "center";
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
                        comments_top_section.style.paddingTop = "10px";
                        comments_top_section.style.textAlign = "left";
                        comment.appendChild(comments_top_section);
    
                        const comments_top_section_commentator = document.createElement("div");
                        comments_top_section_commentator.className = "comments-top-section-commentator";
                        comments_top_section_commentator.innerHTML = seriesComment.commentator_name;
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
    
                        const date_of_comment = seriesComment.date_of_comment.split("-");
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
                        commemts_bottom_section.innerHTML = seriesComment.comment_text;
                        commemts_bottom_section.style.textAlign = "justify";
                        comment.appendChild(commemts_bottom_section);
                    });
    
                    let sumStarRating = 0;
                    const totalStars = 5;

                    comments.forEach(starRating => {
                        sumStarRating += starRating.starrating;
                    });

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
            });
        };
    });
})