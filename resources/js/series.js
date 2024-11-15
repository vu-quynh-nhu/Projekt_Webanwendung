fetch("../html/navigationbar.html").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;
})

fetch("../php/getSeries.php").then(response => response.json()).then(data => {
    const seriesContainer = document.querySelector(".series-container");
    //sort series entries from lastly added to the database to firstly added
    data.sort((firstSeries, lastSeries) => lastSeries.id - firstSeries.id); 
    //loop through each series
    data.forEach(series_data => {
        const seriesPageRedirection = document.createElement("a");
        seriesPageRedirection.href = `series-page.html?title=${encodeURIComponent(series_data.title)}`;
        seriesPageRedirection.style.textDecoration = "none";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.style.display = "inline-block";
        cardDiv.style.marginRight = "10px";
        cardDiv.style.width = "200px";
        cardDiv.style.height = "330px";
        cardDiv.style.borderRadius = "7px";
        cardDiv.style.backgroundColor = "white";
        cardDiv.style.marginBottom ="10px";
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
                    star.style.cursor ="pointer";
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
                    star.style.cursor ="pointer";
                    starDiv.appendChild(star);
                }
            }
        })
    });
})