// movie 카드 함수
export const drawmovie = async () => {
  const movieList = await fetchmovieList();
  console.log(movieList);

  const cardList = document.querySelector("#movieCard");
  cardList.innerHTML = movieList
    .map(
      (movie) => `
  <li id="container" class="container">
  <a href="./test2.html">
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

  // 카드 클릭시 페이지 넘어가고 영화 아이디 저장
  cardList.addEventListener("click", clickCard);

  function clickCard(event) {
    if (event.traget === cardList) return;

    if (event.target.matches(".image")) {
      const id = event.target.id;
      storegeAdd(id);
    }
  }
};

//로컬스토리지 저장 함수
function storegeAdd(keyword) {
  const data = localStorage.setItem("cast", keyword);
  return data;
}

// id로 영화 검색후 배우 데이터 가져오기 및 카드 추가
export const drawMovieCast = async (id) => {
  const castList = await fetchmovieCast(id);
  const cardList = document.querySelector("#castCard");

  cardList.innerHTML = castList
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

export const drawMovieDetails = async (id) => {
  const detailsList = await fetchMovieDetails(id);
  const cardList = document.querySelector("#detailsCard");
  console.log(detailsList);

  let backdrop = detailsList.backdrop_path;
  let poster = detailsList.poster_path;
  let title = detailsList.title;
  let overview = detailsList.overview;
  let vote_average = detailsList.vote_average;
  let genres = detailsList.genres.map((e) => e.name);

  let temp_html = `<li class="container">
  <img 
  class = "image" 
  src="https://image.tmdb.org/t/p/w200${backdrop}" alt="이미지가 없습니다.">
  <img 
  class = "image" 
  src="https://image.tmdb.org/t/p/w200${poster}" alt="이미지가 없습니다.">
    <p class="title">영화 제목: ${title}</p><br>
    <p>장르:${genres} </p>
    <p class="overview">요약: ${overview}</p><br>
    <p class="vote_average">별점: ${vote_average}</p>
  </li>`;
  cardList.insertAdjacentHTML("beforeend", temp_html);
};

// API MOVIE 데이터 함수
async function fetchmovieList() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc",
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error(err);
  }
}

// API CAST 데이터 함수
async function fetchmovieCast(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
    },
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );
    const data = await response.json();
    return data.cast;
  } catch (err) {
    console.error(err);
  }
}

async function fetchMovieDetails(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KO`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}