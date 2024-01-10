export const drawmovieCast = async () => {
  const castList = await fetchmovieCast();
  console.log(castList);

  const cardlist = document.querySelector("#castCard");
  cardlist.innerHTML = castList
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

async function fetchmovieCast() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/695721/credits?language=ko-KO",
    options
  );
  const data = await response.json();
  return data.cast;
}
