//Navigationbar
fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;

    let cssForNavbar;
    if (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html")) {
        cssForNavbar = "../css/navbar_style_signUp_login.css";
    } else if (window.location.pathname.includes("add_film.html") || window.location.pathname.includes("add_series.html") 
        || window.location.pathname.includes("edit_film.php") || window.location.pathname.includes("edit_series.php")) {
        cssForNavbar = "../css/navbar_style_edit_and_add.css";
    } 
    
    const navigationBarCss = document.createElement("link");
    navigationBarCss.rel = "stylesheet";
    navigationBarCss.href = cssForNavbar;
    document.head.appendChild(navigationBarCss);
})

const select = document.getElementById('year');
const currentYear = new Date().getFullYear();

for (let year = currentYear; year >= 1900; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
}

const genreSelect = document.getElementById('genre');

fetch('../json/genre_list.json').then(response => {
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

document.addEventListener('DOMContentLoaded', function() {
    const thumbnailInput = document.getElementById('thumbnail');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const thumbnailPreview = document.getElementById('thumbnail-preview');
    const deleteThumbnailBtn = document.getElementById('delete-thumbnail');
    const debugInfo = document.getElementById('debug-info');

    thumbnailInput.addEventListener('change', function(event) {
        //debugInfo.innerHTML = 'File selected: ' + this.value;
        const file = event.target.files[0];
        if (file) {
            //debugInfo.innerHTML += '<br>File type: ' + file.type;
            const reader = new FileReader();
            reader.onload = function(e) {
                thumbnailPreview.src = e.target.result;
                thumbnailContainer.style.display = 'block';
                //debugInfo.innerHTML += '<br>Image loaded successfully';
            };
            reader.onerror = function(e) {
                debugInfo.innerHTML += '<br>Error loading image: ' + e.target.error;
            };
            reader.readAsDataURL(file);
        } else {
            debugInfo.innerHTML += '<br>No file selected';
        }
    });

    deleteThumbnailBtn.addEventListener('click', function() {
        thumbnailInput.value = '';
        thumbnailPreview.src = '';
        thumbnailContainer.style.display = 'none';
    });
});

//set username as value of input with id creator

fetch("../php/loginCheck.php").then(response => response.json()).then(login => {
     if (login.isUserLoggedIn) {
        document.getElementById("creator").value = login.username;
    }
})