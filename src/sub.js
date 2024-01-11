import { drawMovieCast } from "./movieApi.js";

const check = JSON.parse(localStorage.getItem("cast"));
console.log(check);
drawMovieCast(check);
