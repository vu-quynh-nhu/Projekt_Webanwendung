//Navigationbar
fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;

    let cssForNavbar = "../css/navbar_style_genrePages.css";
    console.log("Selected CSS File:", cssForNavbar);

    const navigationBarCss = document.createElement("link");
    navigationBarCss.rel = "stylesheet";
    navigationBarCss.href = cssForNavbar;
    document.head.appendChild(navigationBarCss);
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

