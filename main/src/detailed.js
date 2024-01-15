import { drawMovieDetails } from "./movieDraw.js";
import {movieVideo} from "./movieDraw.js";
const check = localStorage.getItem("cast");
drawMovieDetails(check);
movieVideo(check);

// Return to HOME
const homeBtn = document.querySelector("#homeBtn");
homeBtn.addEventListener("click", homePage);

function homePage() {
    window.location.href = 'index.html';
}