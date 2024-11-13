const select = document.getElementById('year');
const currentYear = new Date().getFullYear();

for (let year = currentYear; year >= 1900; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
}

const genreSelect = document.getElementById('genre');

fetch('/resources/json/genre_list.json').then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    return response.json(); 
})
.then(data => {    
    data.genre.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});