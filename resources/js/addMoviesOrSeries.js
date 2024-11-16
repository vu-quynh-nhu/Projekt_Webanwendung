fetch("../html/navigationbar.html").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;
})