import { drawmovie } from './movieDraw.js';
import { searchMovie } from './search.js';

drawmovie();

let inputformbtn = document.querySelector('.movie-search-inner');
inputformbtn.addEventListener('submit', (event) => {
  event.preventDefault();
  searchMovie();
});

//gotop 기능 구현
const gotop = document.querySelector('.gotop');
let scroll = 0; //스크롤 얼마나 움직이는지

window.addEventListener('scroll', function () {
  scroll = window.scrollY;
  if (scroll < 900) {
    gotop.style.display = 'none';
  } else {
    gotop.style.display = 'block';
  }
});

gotop.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
