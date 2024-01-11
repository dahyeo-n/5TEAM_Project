export const drawmovie = async () => {
  const movieList = await fetchmovieList();
  console.log(movieList);

  const cardList = document.querySelector("#movieCard");
  cardList.innerHTML = movieList
    .map(
      (movie) => `
  <li id="container" class="container">
  <a href="test2.html">
  <img 
  id = "${movie.id}"
  class = "image" 
  src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="이미지가 없습니다.">
  </a>
    <p class="title">영화 제목: ${movie.title}</p><br>
    <p class="overview">요약: ${movie.overview}</p><br>
    <p class="vote_average">별점: ${movie.vote_average}</p>
  </li>`
    )
    .join("");

  cardList.addEventListener("click", clickCard);

  function clickCard(event) {
    if (event.traget === cardList) return;

    if (event.target.matches(".image")) {
      const id = event.target.id;
      saveMovieCast(id);
    }
  }
};

function storegeAdd(keyword) {
  localStorage.setItem("cast", JSON.stringify(keyword));
}

const saveMovieCast = async (id) => {
  const castList = await fetchmovieCast(id);
  storegeAdd(castList);
  console.log(castList);
};

export const drawMovieCast = (cast) => {
  const cardList = document.querySelector("#castCard");
  cardList.innerHTML = cast
    .map(
      (cast) => `
<li id="container" class="container" >
<img
id = "${cast.id}"
class = "image"
src="https://image.tmdb.org/t/p/w200${cast.profile_path}" alt="이미지가 없습니다.">
  <p class="title"> ${cast.character}역</p><br>
  <p class="overview">${cast.original_name}</p><br>
</li>`
    )
    .join("");
};

async function fetchmovieList() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc",
    options
  );
  const data = await response.json();
  return data.results;
}

async function fetchmovieCast(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KO`,
    options
  );
  const data = await response.json();
  return data.cast;
}
