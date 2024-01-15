// movie 카드 함수
export const drawmovie = async () => {
  const movieList = await fetchmovieList();
  console.log(movieList);

  const cardList = document.querySelector('#main-card');
  cardList.innerHTML = movieList
    .map(
      (movie) => `
      <div id="col" class="col" >
      <a href = "#">
      <div id="cardId" class="card h-100" onclick="location.href='detailed.html'">
  <img id="${movie.id}" class="image" src="https://image.tmdb.org/t/p/original${movie.poster_path}"> 
  <div class="card-body">
  <h5 class="card-title" >${movie.title}</h5>
  <p class="card-text" >${movie.overview}</p>
  <p class="card-average" >${movie.vote_average}</p>
</div>
  </div>
  </a> 
</div>`
    )
    .join('');

  // 카드 클릭시 페이지 넘어가고 영화 아이디 저장
  cardList.addEventListener('click', clickCard);

  function clickCard(event) {
    if (event.traget === cardList) return;

    if (event.target.matches('.image')) {
      const id = event.target.id;
      storegeAdd(id);
    }
  }
};

//로컬스토리지 저장 함수
function storegeAdd(keyword) {
  const data = localStorage.setItem('cast', keyword);
  return data;
}

// id로 영화 검색후 배우 데이터 가져오기 및 카드 추가
export const drawMovieDetails = async (id) => {
  const detailsList = await fetchMovieDetails(id);
  const detailedCast = await fetchmovieCast(id);

  const cardDetailList = document.querySelector('#moviedetail');
  const moviedetailCast = document.querySelector('#moviedetailCast');

  let backdrop = detailsList.backdrop_path;
  let title = detailsList.title;
  let overview = detailsList.overview;
  let average = detailsList.vote_average;
  let genres = detailsList.genres.map((e) => e.name).join(', ');
  let release = detailsList.release_date;
  let character = detailedCast.map((e) => e.character).join('역, ');
  let caster = detailedCast.map((e) => e.original_name).join(', ');

  let tempHtml = `<div class="main" img
  style="
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 85%, rgba(0, 0, 0, 0.7) 95%, rgba(0, 0, 0, 1) 100%), url(https://image.tmdb.org/t/p/w500${backdrop}); background-size: cover; background-position: center; background-repeat: no-repeat;">
  <div class="p-5 mb-4 bg-body-tertiary rounded-3">
      <div class="container-fluid py-5">
          <!-- 영화 제목 -->
          <h1 class="display-5 fw-bold">${title}</h1>
          <!-- 영화 요약 내용 -->
          <p class="col-md-8 fs-4">${overview}</p>
      </div>
      <button id="detailedInfobtn" type="button" class="btn btn-outline-light">상세정보</button>
      <button id="rewiewbtn" type="button" class="btn btn-outline-light">리뷰</button>
  </div>
</div>`;
  cardDetailList.insertAdjacentHTML('afterbegin', tempHtml);

  let tempCastHtml = `<div
style="border: whitesmoke 0px solid; border-radius: 15px; background-color: rgb(0, 0, 0); margin: 5px 200px 5px 280px; padding: 10px 50px 10px 50px;">

<div class="moviesText">
    <div>
        <span class="badge bg-light text-dark"
            style="font-size: 22px; text-align: center; font-weight: bolder;">장 르</span>
    </div>
    <div class="txc-textbox"
        style="box-sizing: border-box; border-radius: 5px; margin: 0px 7px 0px 7px; background-color:whitesmoke; opacity: 1; border: none 0px solid; padding: 0.5%">
        <div style="font-size: 20px; text-align: center;"><span style="font-weight: bolder; color: black;"
                data-ke-size="size16">${genres}</span>
        </div>
    </div>
</div>
<div class="moviesText">
    <div>
        <span class="badge bg-light text-dark"
            style="font-size: 22px; text-align: center; font-weight: bolder;">평 점</span>
    </div>
    <div class="txc-textbox"
        style="box-sizing: border-box; border-radius: 5px; margin: 0px 7px 0px 7px; background-color:whitesmoke; opacity: 1; border: none 0px solid; padding: 0.5%">
        <div style="font-size: 20px; text-align: center;"><span style="font-weight: bolder; color: black;"
                data-ke-size="size16">${average}</span>
        </div>
    </div>
</div>
<div class="moviesText">
    <div>
        <span class="badge bg-light text-dark"
            style="font-size: 22px; text-align: center; font-weight: bolder;">출 연</span>
    </div>
    <div class="txc-textbox"
        style="box-sizing: border-box; border-radius: 5px; margin: 0px 7px 0px 7px; background-color:whitesmoke; opacity: 1; border: none 0px solid; padding: 0.5%">
        <div style="font-size: 20px; text-align: center;" data-ke-size="size16">
            <span style="font-weight: bolder; color: black;">${caster}</span>
        </div>
    </div>
</div>
<div class="moviesText">
    <div>
        <span class="badge bg-light text-dark"
            style="font-size: 22px; text-align: center; font-weight: bolder;">배 역</span>
    </div>
    <div class="txc-textbox"
        style="box-sizing: border-box; border-radius: 5px; margin: 0px 7px 0px 7px; background-color:whitesmoke; opacity: 1; border: none 0px solid; padding: 0.5%">
        <div style="font-size: 20px; text-align: center;" data-ke-size="size16">
            <span style="font-weight: bolder; color: black;">${character}</span>
        </div>
    </div>
</div>
<div class="moviesText">
    <div>
        <span class="badge bg-light text-dark"
            style="font-size: 22px; text-align: center; font-weight: bolder;">개 봉</span>
    </div>
    <div class="txc-textbox"
        style="box-sizing: border-box; border-radius: 5px; margin: 0px 7px 0px 7px; background-color:whitesmoke; opacity: 1; border: none 0px solid; padding: 0.5%">
        <div style="font-size: 20px; text-align: center;" data-ke-size="size16">
            <span style="font-weight: bolder; color: black;">${release}</span>
        </div>
    </div>
</div>
</div>`;
  moviedetailCast.insertAdjacentHTML('beforeend', tempCastHtml);
};

// API MOVIE 데이터 함수
async function fetchmovieList() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00',
    },
  };

  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc',
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
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00',
    },
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KO`,
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
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00',
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
