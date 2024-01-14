import {drawMovieDetails} from "./movieApi.js";
const check = localStorage.getItem("cast");
drawMovieDetails(check);

// Return to HOME
const homeBtn = document.querySelector("#homeBtn");
homeBtn.addEventListener("click", homePage);

function homePage() {
    window.location.href = 'index.html';
}


// Scroll adjustment function
// 1. 상세정보 scroll adjustment

const detailedBtn = document.querySelector("#detailedInfobtn");
detailedBtn.addEventListener("click", function() {
     // left: 가로축(x좌표), top: 세로축(y좌표) 지정
     window.scrollTo({ left: 0, top: 500 });
     // console.log(window.scrollTo);
});

// 2. 리뷰 scroll adjustment
const rewiewbtn = document.querySelector('#rewiewbtn');
rewiewbtn.addEventListener('click', function () {
    // left: 가로축(x좌표), top: 세로축(y좌표) 지정
    window.scrollTo({ left: 0, top: 800 });
});
