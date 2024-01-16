//전역 변수
const check = localStorage.getItem('cast'); //클릭한 페이지 ID값 변수명변경
const inputBtn = document.querySelector('#inputBtn'); //입력 버튼
const hiddenReviseBtn = document.querySelector('#reviseBtn'); //수정완료 버튼
const createForm = document.querySelector('.createForm'); //리뷰 리스트들 부모
let inputArrayGet = window.localStorage.getItem('data'); // 로컬 데이터 가져오기 (문자열형태)
let inputArrayVal = JSON.parse(inputArrayGet); // 배열로 전환된 로컬 데이터
let inputArray = inputArrayVal || []; // 배열로 전환된 로컬 데이터 , 데이터가 없을 경우에 빈배열
//이름,비밀번호,리뷰,별점 각각의 폼 비어있음
let nameForm = document.querySelector('#floatingInput');
let pwForm = document.querySelector('#floatingPassword');
let reviewForm = document.querySelector('.review');
let starForm = document.querySelector('.starCnt');

//Validation Class
const $emptyName = document.querySelector('.emptyName');
const $emptyPassword = document.querySelector('.emptyPassword');
const $emptyReiview = document.querySelector('.emptyReiview');
const $emptyStar = document.querySelector('.emptyStar');
//Validation none
$emptyName.style.display = 'none';
$emptyPassword.style.display = 'none';
$emptyReiview.style.display = 'none';
$emptyStar.style.display = 'none';

//WindowReload
function Reload() {
  window.location.reload();
}

//localUpdate
function updateLocalStorage() {
  let deleteString = JSON.stringify(inputArray);
  window.localStorage.setItem('data', deleteString);
}

//기존데이터 드로잉
function drawing() {
  let reviews = inputArray.filter((review) => {
    return review.movieId === check;
  });
  for (let i = 0; i < reviews.length; i++) {
    let item = reviews[i];

    let temp = `<div ${item.id} class="valueBox" >
      <p class="reviewcontainor">[이름] ${item.name}  [리뷰] ${item.reviewInput}  [별점] ${item.starCnt}
        <button id="fixBtn" type="button" data-id=${item.id} class="btn btn-warning">수정</button>
        <button type="button" data-id=${item.id} class="btn btn-danger">삭제</button>
        <p class="pw" data-id=${item.id} style="display:none">비밀번호 입력: <input class="pwInput" form="password" type="password" />
        <button class="pwBtn">확인</button></p>
      </p>
    </div>`;
    createForm.insertAdjacentHTML('beforeend', temp);
  }
}

//입력확인버튼
inputBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let nameVal = nameForm.value;
  let pwVal = pwForm.value;
  let reviewVal = reviewForm.value;
  let starVal = starForm.value;
  let idVal = new Date().getTime(); //현재 시간으로 id 부여
  let movieId = check;
  //Validation
  if (nameVal && pwVal && reviewVal && starVal) {
    //클릭시 array에 데이터 푸쉬
    inputArray.push({
      id: idVal,
      name: nameVal,
      pw: pwVal,
      reviewInput: reviewVal,
      starCnt: starVal,
      movieId: movieId,
    });
    let inputArrayString = JSON.stringify(inputArray); //push한 데이터 문자열로 전환
    window.localStorage.setItem('data', inputArrayString); // 전환된 데이터 로컬에 저장

    // html 추가
    let temp_html = `<div data-id=${idVal} class="valueBox" >
    <p class="reviewcontainor">[이름] ${nameVal}  [리뷰] ${reviewVal}  [별점] ${starVal} 
      <button type="button" data-id=${idVal} class="btn btn-warning">수정</button>
      <button type="button" data-id=${idVal} class="btn btn-danger">삭제</button>
      <p class="pw" data-id=${idVal} style="display:none">비밀번호 입력: <input class="pwInput" form="password" type="password" />
        <button class="pwBtn">확인</button></p>
    </p>
  </div>`;
    createForm.insertAdjacentHTML('beforeend', temp_html);

    $emptyName.style.display = 'none';
    $emptyPassword.style.display = 'none';
    $emptyReiview.style.display = 'none';
    $emptyStar.style.display = 'none';
    alert('저장완료');
    Reload();
  } else {
    if (nameVal === '') {
      $emptyName.style.display = 'block';
    } else {
      $emptyName.style.display = 'none';
    }
    if (pwVal === '') {
      $emptyPassword.style.display = 'block';
    } else {
      $emptyPassword.style.display = 'none';
    }
    if (reviewVal === '') {
      $emptyReiview.style.display = 'block';
    } else {
      $emptyReiview.style.display = 'none';
    }
    if (starVal === '') {
      $emptyStar.style.display = 'block';
    } else {
      $emptyStar.style.display = 'none';
    }
  }
});

drawing();

//삭제버튼
let delBtns = document.querySelectorAll('.btn-danger');
delBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let deleteBtnId = parseInt(deleteBtn.dataset.id); //삭제 버튼의 ID값

    let pwHiddenFrom = deleteBtn.closest('.valueBox').querySelector('.pw'); //각각의 버튼의 pw,Btn에 이벤트를 걸어줘야함
    let pwSubmitBtn = deleteBtn.closest('.valueBox').querySelector('.pwBtn');
    pwHiddenFrom.style.display = 'block';
    //비밀번호 확인버튼 click
    pwSubmitBtn.addEventListener('click', function () {
      let pwInput = document.querySelector('.pwInput');
      let pwInputVal = pwInput.value; // 입력한 비밀번호
      let pwTargetId = inputArray.find((idVal) => idVal.id === deleteBtnId); //inputArray의 id값과 같은 값 추출
      //비밀번호 Validation
      if (pwTargetId.pw === pwInputVal) {
        inputArray = inputArray.filter((item) => item.id !== deleteBtnId); //기존ID랑 다른것들 item에 재할당
        alert('삭제 완료');
        e.target.parentElement.parentElement.remove(); //valueBox삭제
        updateLocalStorage();
        Reload();
      } else {
        alert('비밀번호를 다시 한번 확인하세요');
        Reload();
      }
    });
  });
});

//수정버튼
let reviseBtns = document.querySelectorAll('.btn-warning');
let hiddenId = document.querySelectorAll('.hiddenId');
reviseBtns.forEach((reviseBtn) => {
  reviseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let reviseIdString = reviseBtn.dataset.id;
    let reviseBtnId = parseInt(reviseIdString); //클릭한 ID값
    let pwHiddenFrom = reviseBtn.closest('.valueBox').querySelector('.pw');
    let pwSubmitBtn = reviseBtn.closest('.valueBox').querySelector('.pwBtn');
    pwHiddenFrom.style.display = 'block';
    //비밀번호 확인 버튼
    pwSubmitBtn.addEventListener('click', function () {
      let pwInput = document.querySelector('.pwInput');
      let pwInputVal = pwInput.value; //입력한 비밀번호
      let pwTargetId = inputArray.find(
        (reviseVal) => reviseVal.id === reviseBtnId
      ); //inputArray의 id값이 같은 객체 추출
      //비밀번호 Validation
      if (pwInputVal === pwTargetId.pw) {
        inputBtn.style.display = 'none'; //입력확인 버튼 none
        hiddenReviseBtn.style.display = 'block'; //수정완료 block
        pwHiddenFrom.style.display = 'none'; //비밀번호 none
        //inputArray의 id값이 같은 객체 추출
        let targetReviewInput = inputArray.find(
          (item) => item.id === reviseBtnId
        );

        // 클릭한 데이터들 변수할당
        let targetName = targetReviewInput.name;
        let targetPw = targetReviewInput.pw;
        let targetReview = targetReviewInput.reviewInput;
        let targetStar = targetReviewInput.starCnt;
        let targetId = reviseBtnId;

        // 비어있는 폼에다가 클릭한 데이터들 표시
        nameForm.value = targetName;
        pwForm.value = targetPw;
        reviewForm.value = targetReview;
        starForm.value = targetStar;
        hiddenId.value = targetId;
      } else {
        alert('비밀번호를 다시 한번 확인하세요');
        Reload();
      }
    });
  });
});

//수정완료버튼
hiddenReviseBtn.addEventListener('click', function () {
  //수정할 데이터들
  let reviseName = nameForm.value;
  let revisePw = pwForm.value;
  let reviseReview = reviewForm.value;
  let reviseStar = starForm.value;
  let idVal = hiddenId.value; //수정완료에도 추출할 id값이 필요하기 때문에 id지정

  //수정 Validation
  if (reviseName && revisePw && reviseReview && reviseStar) {
    let reviseTarget = inputArray.find((item) => item.id === idVal); //수정할 객체 추출
    //수정된 데이터들
    reviseTarget.name = reviseName;
    reviseTarget.pw = revisePw;
    reviseTarget.reviewInput = reviseReview;
    reviseTarget.starCnt = reviseStar;

    updateLocalStorage();
    alert('수정 완료');
    Reload();
  } else {
    if (reviseName === '') {
      $emptyName.style.display = 'block';
    } else {
      $emptyName.style.display = 'none';
    }
    if (revisePw === '') {
      $emptyPassword.style.display = 'block';
    } else {
      $emptyPassword.style.display = 'none';
    }
    if (reviseReview === '') {
      $emptyReiview.style.display = 'block';
    } else {
      $emptyReiview.style.display = 'none';
    }
    if (reviseStar === '') {
      $emptyStar.style.display = 'block';
    } else {
      $emptyStar.style.display = 'none';
    }
  }
});
