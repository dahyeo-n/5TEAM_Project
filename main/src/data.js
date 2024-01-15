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

//입력확인버튼
inputBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let nameVal = nameForm.value;
  let pwVal = pwForm.value;
  let reviewVal = reviewForm.value;
  let starVal = starForm.value;
  let idVal = new Date().getTime(); //현재 시간으로 id 부여
  let movieId = check;
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
    <p>이름:${nameVal} 리뷰:${reviewVal}  별점:${starVal} 
      <button type="button" data-id=${idVal} class="btn btn-dark">수정</button>
      <button type="button" data-id=${idVal} class="btn btn-danger">삭제</button>
      <p class ="pw">비밀번호 입력:<input class="blockPwForm" form="password" type="password" />
      <button class="pwBtn">확인</button></p>
    </p>
  </div>`;
  createForm.insertAdjacentHTML('beforeend', temp_html);

  // 입력 폼 비우기
  // nameForm.value = '';
  // pwForm.value = '';
  // reviewForm.value = '';
  // starForm.value = '';
  window.location.reload();

  // 수정버튼
  // const reviseBtns = document.querySelectorAll('.btn-dark');
  // reviseBtns.forEach((reviseBtn) => {
  //   reviseBtn.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     let reviseIdString = reviseBtn.dataset.id;
  //     let reviseBtnId = parseInt(reviseIdString);

  //     let targetReviewInput = inputArray.find(
  //       (item) => item.id === reviseBtnId
  //     );
  //     let targetName = targetReviewInput.name;
  //     let targetPw = targetReviewInput.pw;
  //     let targetReview = targetReviewInput.reviewInput;
  //     let targetStar = targetReviewInput.starCnt;

  //     nameForm.value = targetName;
  //     pwForm.value = targetPw;
  //     reviewForm.value = targetReview;
  //     starForm.value = targetStar;
  //   });
  // });
  // 삭제버튼
  // const delBtns = document.querySelectorAll('.btn-danger');
  // delBtns.forEach((deleteBtn) => {
  //   deleteBtn.addEventListener('click', function (e) {
  //     e.preventDefault();

  //     let deleteBtnId = deleteBtn.dataset.id;
  //     let numIds = parseInt(deleteBtnId);
  //     inputArray = inputArray.filter((item) => item.id !== numIds);

  //     e.target.parentElement.parentElement.remove();

  //     updateLocalStorage();
  //   });
  // });
});

//기존데이터 읽기 및 표시
function drawing() {
  let reviews = inputArray.filter((review) => {
    return review.movieId === check;
  });
  for (let i = 0; i < reviews.length; i++) {
    let item = reviews[i];

    let temp = `<div ${item.id} class="valueBox" >
      <p>이름:${item.name} 리뷰:${item.reviewInput}  별점:${item.starCnt}
        <button type="button" data-id=${item.id} class="btn btn-dark">수정</button>
        <button type="button" data-id=${item.id} class="btn btn-danger">삭제</button>
        <p class="pw" style="display:none">비밀번호 입력:<input class="pwInput" form="password" type="password" />
        <button class="pwBtn">확인</button></p>
      </p>
    </div>`;
    createForm.insertAdjacentHTML('beforeend', temp);
  }
}
drawing();

//삭제버튼  입력시 삭제버튼에도 이벤트 걸어 줘야 함 (나중에 함수화 해서 리팩토링)
let delBtns = document.querySelectorAll('.btn-danger');
let pwHiddenFrom = document.querySelector('.pw');
let pwSubmitBtn = document.querySelector('.pwBtn');

delBtns.forEach((deleteBtn) => {
  // 1.삭제버튼 클릭 , 벨리데이션
  deleteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let deleteBtnId = parseInt(deleteBtn.dataset.id); //삭제 버튼의 ID값

    pwHiddenFrom.style.display = 'block';
    pwSubmitBtn.addEventListener('click', function () {
      //3.비밀번호 인풋 확인버튼 클릭
      let pwInput = document.querySelector('.pwInput');
      let pwInputVal = pwInput.value; //입력한 비밀번호
      let pwTargetId = inputArray.find((idVal) => idVal.id === deleteBtnId); //inputArray의 id값에서 찾기
      if (pwTargetId.pw === pwInputVal) {
        inputArray = inputArray.filter((item) => item.id !== numIds); //기존ID랑 다른것들 item에 재할당
        alert('삭제완료');

        e.target.parentElement.parentElement.remove();

        updateLocalStorage();
        window.location.reload();
      } else {
        alert('비밀번호를 똑바로 확인 하세요');
        window.location.reload();
      }
    });
  });
});

//수정버튼
let reviseBtns = document.querySelectorAll('.btn-dark');
let hiddenId = document.querySelectorAll('.hiddenId');
reviseBtns.forEach((reviseBtn) => {
  reviseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    pwHiddenFrom.style.display = 'block';
    pwSubmitBtn.addEventListener('click', function () {
      let pwInput = document.querySelector('.pwInput');
      let pwInputVal = pwInput.value; //입력한 비밀번호
      console.log(pwInputVal);
    });
    inputBtn.style.display = 'none';
    hiddenReviseBtn.style.display = 'block';
    let reviseIdString = reviseBtn.dataset.id;
    let reviseBtnId = parseInt(reviseIdString); //클릭한 ID값

    let targetReviewInput = inputArray.find((item) => item.id === reviseBtnId); //클릭한 버튼의 정보들
    // console.log(targetReviewInput);

    // 클릭한 데이터들 저장 (객체분해 할당으로 리팩토링)
    let targetName = targetReviewInput.name;
    let targetPw = targetReviewInput.pw;
    let targetReview = targetReviewInput.reviewInput;
    let targetStar = targetReviewInput.starCnt;
    let targetId = reviseBtnId;
    // console.log(targetName, targetPw, targetReview, targetStar);

    //비어있는 폼에다가 클릭한 데이터들 표시
    nameForm.value = targetName;
    pwForm.value = targetPw;
    reviewForm.value = targetReview;
    starForm.value = targetStar;
    hiddenId.value = targetId;
  });
});

//수정완료버튼
reviseBtn.addEventListener('click', function () {
  let reviseName = nameForm.value;
  let revisePw = pwForm.value;
  let reviseReview = reviewForm.value;
  let reviseStar = starForm.value;
  let idVal = hiddenId.value;
  // console.log(reviseName, revisePw, reviseReview, reviseStar, idVal);

  let reviseTarget = inputArray.find((item) => item.id === idVal); //수정할 객체
  //수정된 데이터들
  reviseTarget.name = reviseName;
  reviseTarget.pw = revisePw;
  reviseTarget.reviewInput = reviseReview;
  reviseTarget.starCnt = reviseStar;

  for (let i = 0; i < inputArray.length; i++) {
    let inputArrayId = inputArray[i].id; //기존데이터들 ID
    if (inputArrayId === idVal) {
      updateLocalStorage();
      window.location.reload();
    }
  }
});

//로컬업데이트
function updateLocalStorage() {
  let deleteString = JSON.stringify(inputArray);
  window.localStorage.setItem('data', deleteString);
}
