fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;
})

fetch("../php/getMovies.php").then(response => response.json()).then(data => {
    
})