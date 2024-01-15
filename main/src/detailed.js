import { drawMovieDetails } from "./movieApi.js";
const check = localStorage.getItem("cast");
drawMovieDetails(check);

// Return to HOME
const homeBtn = document.querySelector("#homeBtn");
homeBtn.addEventListener("click", homePage);

function homePage() {
    window.location.href = 'index.html';
}