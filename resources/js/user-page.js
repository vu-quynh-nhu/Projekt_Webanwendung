fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;

    let cssForNavbar= "../css/navigationbar.css";
    console.log("Selected CSS File:", cssForNavbar);

    const navigationBarCss = document.createElement("link");
    navigationBarCss.rel = "stylesheet";
    navigationBarCss.href = cssForNavbar;
    document.head.appendChild(navigationBarCss);
})

fetch("../php/getMovies.php").then(response => response.json()).then(data => {
    
})