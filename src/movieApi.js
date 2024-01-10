export const drawmovie = async () => {
  const movieList = await fetchmovieList();
  console.log(movieList);

  const cardlist = document.querySelector("#movieCard");
  cardlist.innerHTML = movieList
    .map(
      (movie) => `
  <li id="container" class="container" >
  <img 
  id = "${movie.id}"
  class = "image" 
  src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="이미지가 없습니다.">
    <p class="title">영화 제목: ${movie.title}</p><br>
    <p class="overview">요약: ${movie.overview}</p><br>
    <p class="vote_average">별점: ${movie.vote_average}</p>
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
