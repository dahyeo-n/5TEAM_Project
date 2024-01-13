//인기영화 API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTA1MDRiOTgyNTQyYjZmODkxNGViNGFlOTkwY2QzOCIsInN1YiI6IjY1OTY2ZGQ3ODY5ZTc1NmUzYTA2YWUwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWagrVhcGvx1NtgmximqmprghpZeG2tBjvcosz7SaDU',
    },
};

//url
const url =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc';

function showMovies() {
    fetch(url, options)
        .then((response) => response.json())
        .then((response) => moviesAPI(response.results))
        .catch((err) => console.error(err));
}

showMovies();

let moviesInfo

function moviesAPI(response) {
    moviesInfo = response
    for (let i = 0; i < response.length; i++) {
        const cardList = document.getElementById('main-card');
        let movieTitle = response[i]['title'];
        let movieOverview = response[i]['overview'];
        let posterPath = response[i]['poster_path'];
        let voteAverage = response[i]['vote_average'];
        let id = response[i]['id'];

        let temp_hteml = `<div id="col" class="col" >
        <a href = "#"><div id="cardId" class="card h-100" onclick="location.href='detailed.html'"${id}>
    <img src="https://image.tmdb.org/t/p/w500${posterPath}"> 
    <div class="card-body">
    <h5 class="card-title" >${movieTitle}</h5>
    <p class="card-text" >${movieOverview}</p>
    <p class="card-average" >${voteAverage}</p>
</div>
    </div>
    </a> 
</div>
`;

        cardList.insertAdjacentHTML('beforeend', temp_hteml);
    }
    console.log(moviesInfo);
    function maincard() {

    }
}

function test(e) {
    alert(document.getElementById(e.getAttribute('cardId')));
    console.log()
}

let inputformbtn = document.querySelector('.input-form-btn');
inputformbtn.addEventListener('click', function (e) {
    e.preventDefault(); // a 태그나 submit 태그는 누르게 되면 href를 통해 이동하거나 창이 새로고침하여 실행되는데, 이를 막아줌
    let inputform = document
        .querySelector('.input-form')
        .value.replace(/\s/g, '');
    let cards = document.querySelectorAll('.col');
    let searchNone = document.querySelector('.searchNone');
    let searchresult = false;

    if (inputform === '') {
        alert('검색어 입력해라');
    } else {
        for (let i = 0; i < cards.length; i++) {
            let title = cards[i].childNodes[1].childNodes[0].childNodes[3].childNodes[1].textContent.replace(
                /\s/g,
                ''
            );

            if (!title.includes(inputform)) {
                //제목에 검색한 값이 포함 되어 있는지 아닌지 includes
                cards[i].style.display = 'none';
            } else {
                cards[i].style.display = 'block';
            }
        }
        if (!searchresult) {
            searchNone.style.display = 'block';
        }
    }
});

// <영화 '상세정보 페이지' / HOME 이동 구현>
// [Click Event] 영화 카드를 클릭 시, 상세 페이지 연동
// 0. 영화 ID 주소 alert 삭제
// onclick="alert('ID 주소는: ${id} 입니다.')"

// 1. 카드를 누르면 새 페이지가 나오게 해줘
// onclick="location.href='detailed.html'"

// 2. 카드에 각각의 페이지 연결(영화 상세정보)
// 2-1. 모든 영화 정보를 가져와서 변수에 저장
// main-card
// const cardAll = document.getElementsByClassName(container);
// let cardAll = moviesInfo
// console.log(cardAll);

// 2-2. 클릭한 영화의 id 가져오기 (card class 가져오기)
// id="cardId"
const clickedCard = document.getElementById('container');
// function test(e) {
//     alert(document.getElementById(e.getAttribute('id')).getAttribute('id'));
// }
console.log(clickedCard);

// 2-3. 클릭한 영화의 id와 모든 영화 id랑 비교해서 같으면 상세정보 호출
// element.addEventListener(type, listener) | filter 쓰기
if (moviesInfo) {
    for (let i = 0; i < cardAll.length; i++) {
        let index = cardAll[i].childNodes[1].textContent;  // id 연결 먼저 시켜야 객체 요소인 id에 접근 가능
        console.log(cardAll);

        if (!index.includes(detailed)) {
            //id에 클릭한 값이 포함되어 있는지 아닌지 includes
            cardAll[i].style.display = 'none';
        } else {
            cardAll[i].style.display = 'block';
        }
    }
};


// 3. 카드-페이지 연결 확인

// 4. 각각의 영화 정보 구역 나누기

// 5. HOME 이동하는 버튼 및 기능 구현


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

// gotop.addEventListener('click', function () {
//   let timer = setInterval(function () {
//     if (scroll != 0) {
//       window.scrollBy(0, -50);
//     } else {
//       clearInterval(timer);
//     }
//   });
// });