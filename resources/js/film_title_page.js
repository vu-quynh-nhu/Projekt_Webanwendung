fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;
})

const genreLinks = document.querySelectorAll(".genre-box a");
fetch("../json/genre_list.json").then(response => response.json()).then(data => {
    const allGenres = data.genre;

    genreLinks.forEach((link, index) => {
        if (allGenres[index]) {
            link.textContent = allGenres[index];
            link.href = `../html/movies.html?genre=${encodeURIComponent(allGenres[index])}`;
        }
    })
})

