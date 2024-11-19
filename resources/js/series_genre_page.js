//Navigationbar
fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;

    let cssForNavbar = "../css/navbar_style_genrePages.css";
    const navigationBarCss = document.createElement("link");
    navigationBarCss.rel = "stylesheet";
    navigationBarCss.href = cssForNavbar;
    document.head.appendChild(navigationBarCss);
})

const genreBoxes = document.querySelectorAll(".clickable-genre");

fetch("../json/genre_list.json")
  .then(response => response.json())
  .then(data => {
    const allGenres = data.genre;

    genreBoxes.forEach((box, index) => {
      if (allGenres[index]) {
        const link = box.querySelector('a');
        const genreName = allGenres[index];
        
        link.textContent = genreName;
        const href = `../html/movies.html?genre=${encodeURIComponent(genreName)}`;
        link.href = href;
        
        box.style.cursor = 'pointer';
        box.addEventListener('click', (e) => {
          e.preventDefault(); 
          window.location.href = href;
        });
      }
    });
  });
