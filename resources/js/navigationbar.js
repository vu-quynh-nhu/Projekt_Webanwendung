const navbar = document.querySelector(".navbar");
const reviewerLogo = document.querySelector(".reviewer-logo");

if (window.location.pathname === "../html/login.html" || window.location.pathname === "../html/signup.html") {
    navbar.style.backgroundColor = "white";
} else {
    navbar.style.backgroundColor = "black";
    reviewerLogo.style.color = "white";
}