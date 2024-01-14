import { drawMovieCast } from "./movieApi.js";
import { drawMovieDetails } from "./movieApi.js";

// 로컬스토리지 데이터 호출
const check = localStorage.getItem("cast");

drawMovieCast(check);
drawMovieDetails(check);