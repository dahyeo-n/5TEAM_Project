import { drawMovieDetails } from "./movieDraw.js";
import {movieVideo} from "./movieDraw.js";
import {detailedPageSearch} from "./search.js";

const check = localStorage.getItem("cast");
drawMovieDetails(check);
movieVideo(check);


const search = document.querySelector("#search");
search.addEventListener("submit", (event) => {
    event.preventDefault();
    detailedPageSearch();
});

const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", detailedPageSearch);

// Return to HOME
const homeBtn = document.querySelector("#homeBtn");
homeBtn.addEventListener("click", homePage);

function homePage() {
    window.location.href = 'index.html';
}