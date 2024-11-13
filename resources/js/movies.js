fetch("../php/getMovies.php").then(response => response.json()).then(data => {
    const moviesContainer = document.querySelector(".movies-container");
    //sort movie entries from lastly added to the databse to firstly added
    data.sort((firstMovie, lastMovie) => lastMovie.id - firstMovie.id); 
    //loop through each movie
    data.forEach(movie_data => {
        const moviePageRedirection = document.createElement("a");
        moviePageRedirection.href =  `movie-page.html?title=${encodeURIComponent(movie_data.title)}`;
        moviePageRedirection.style.textDecoration = "none";

        /*Create a card component for every entry in the database*/ 
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.style.display = "inline-block";
        cardDiv.style.marginRight = "10px";
        cardDiv.style.width = "200px";
        cardDiv.style.height = "330px";
        cardDiv.style.backgroundColor = "white";
        cardDiv.style.borderRadius = "5px";
        moviesContainer.appendChild(cardDiv);

        const thumbnail = document.createElement("img");
        thumbnail.src = movie_data.thumbnail;
        thumbnail.style.width = "100%";
        thumbnail.style.height = "280px";
        thumbnail.style.objectFit = "cover";
        thumbnail.style.borderTopLeftRadius = "5px";
        thumbnail.style.borderTopRightRadius = "5px";
        cardDiv.appendChild(thumbnail);

        const titleDiv = document.createElement("div");
        titleDiv.style.textAlign = "center";
        titleDiv.style.fontSize = "20px";
        titleDiv.style.fontWeight = "700";
        titleDiv.style.color = "black";
        titleDiv.style.height = "50px";
        titleDiv.style.paddingTop = "9px";
        titleDiv.style.overflow = "hidden";
        titleDiv.style.whiteSpace = "nowrap";
        titleDiv.style.textOverflow = "ellipsis";
        titleDiv.textContent = movie_data.title;
        cardDiv.appendChild(titleDiv);

        moviePageRedirection.appendChild(cardDiv);
        moviesContainer.appendChild(moviePageRedirection);
    });
})