import {fetchmovieList} from "./api.js";
import {storegeAdd} from "./movieDraw.js";

export const searchMovie = () => {
  const inputform = document.querySelector('#input-form').value.replace(/\s/g, '');
  const checkTitle = document.querySelectorAll(".card-title");
  const checkCard = document.querySelectorAll(".col");
  for (let i = 0; i < checkTitle.length; i++) {
    const a = checkTitle[i].innerHTML;

    if (inputform === '') {
      alert('검색어를 입력해주세요');
      break;
    } else {
      if (a.includes(inputform)) {
        checkCard[i].style.display = "block";
      } else {
        checkCard[i].style.display = "none";
      }
    }
  }
};

export const detailedPageSearch = async () => {
  const movieList = await fetchmovieList();
  const inputform = document.querySelector('#input-form').value.replace(/\s/g, '');
  const checkTitle = movieList.map(e => e.title);

  for (let i = 0; i < checkTitle.length; i++) {
    const a = checkTitle[i];

    if (inputform === '') {
      alert("검색어를 입력해주세요");
      break;
    } else {
      if (a.includes(inputform)) {
        storegeAdd(movieList[i].id);
      }
    }
  }
  window.location.reload();
}
