function getSeriesDataByName(name) {
    const passedUrl = new URLSearchParams(window.location.search);
    return passedUrl.get(name);
}

const selectedSeriesTitle = getSeriesDataByName("title");

fetch("../php/getSeries.php").then(response => response.json()).then(data => {
    const selectedSeries = data.find(series => series.title === selectedSeriesTitle);

     if (selectedSeries){
        document.querySelector(".series-title").textContent = selectedSeries.title;
        document.querySelector(".series-release-year").innerHTML = selectedSeries.release_year;
        document.querySelector(".series-about-title").innerHTML = selectedSeries.title;
        document.querySelector(".series-about-year").innerHTML = selectedSeries.release_year;
        document.querySelector(".series-about-genre").innerHTML = selectedSeries.genre;
        document.querySelector(".series-about-director").innerHTML = selectedSeries.directors;
        document.querySelector(".series-about-actors").innerHTML = selectedSeries.actors;
        document.querySelector(".series-decription").innerHTML = selectedSeries.short_description;
        document.getElementById("thumbnail").src = selectedSeries.thumbnail;
        document.getElementById("series_id").value = selectedSeries.id; 
        document.getElementById("series_name").value = selectedSeries.title; 
        document.title = "Reviewer - " + selectedSeries.title;
    };
})