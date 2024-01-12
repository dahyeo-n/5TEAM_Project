// 토글기능 구현
const toggle = document.querySelector('#toggle');
const toggleVal = document.querySelector('.toggleVal');
let toggleRepeat = true; //디폴트 값 설정.
toggle.addEventListener('click', function () {
  if (toggleRepeat === true) {
    toggleVal.style.display = 'block';
    toggleRepeat = false;
  } else {
    toggleVal.style.display = 'none';
    toggleRepeat = true;
  }
});

//입력기능 구현
const inputBtn = document.querySelector('#inputBtn');
const reviseBtn = document.querySelector('#reviseBtn'); //수정확인버튼
const createForm = document.querySelector('.createForm'); //reviewList로변경
let inputArrayGet = window.localStorage.getItem('data'); // 로컬 데이터 가져오기
let inputArrayVal = JSON.parse(inputArrayGet); // 가져온 로컬 데이터 배열로 다시 전환
let inputArray = inputArrayVal || []; // 가져온 로컬에 push하기 , 비어있어도 push가능하게 빈 배열 추가
let nameinput = document.querySelector('#floatingInput');
let pwinput = document.querySelector('#floatingPassword');
let review = document.querySelector('.review');
let star = document.querySelector('.starCnt');
//입력확인 로직
inputBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let nameinputval = nameinput.value;
  let pwinputval = pwinput.value;
  let reviewval = review.value;
  let starval = star.value;
  let idVal = new Date().getTime(); //현재 시간으로 id 부여

  //클릭시 array에 데이터 푸쉬
  inputArray.push({
    id: idVal,
    name: nameinputval,
    pw: pwinputval,
    reviewInput: reviewval,
    starCnt: starval,
  });
  let inputArrayString = JSON.stringify(inputArray); //push한 데이터 문자열로 전환
  window.localStorage.setItem('data', inputArrayString); // 전환된 데이터 로컬에 저장

  //html 추가
  let temp_html = `<div data-id=${idVal} class="valueBox" >
    <p>이름:${nameinputval} 리뷰:${reviewval}  별점:${starval} 
      <button type="button" class="btn btn-dark">수정</button>
      <button type="button" data-id=${idVal} class="btn btn-danger">삭제</button>
      <p class ="pw">비밀번호 입력:<input form="password" type="password" /></p>
      <button class="pwBtn">확인</button>
      
    </p>
  </div>`;
  createForm.insertAdjacentHTML('beforeend', temp_html);
  //삭제 이벤트
  const delBtns = document.querySelectorAll('.btn-danger');
  delBtns.forEach((deleteVal, index) => {
    //deleteBtn이 더 낫다
    deleteVal.addEventListener('click', function (e) {
      e.preventDefault();
      let stringIds = deleteVal.dataset.id;
      let numIds = parseInt(stringIds);
      inputArray = inputArray.filter((item) => item.id !== numIds);

      updateLocalStorage();
      e.target.parentElement.parentElement.remove();
    });
  });
});
//수정완료 로직
// reviseBtn.addEventListener('click', function (e) {
//   e.preventDefault();

//   reviseBtns.forEach((reviseBtn) => {
//     let reviseId = reviseBtn.dataset.id; //클릭한 ID값
//     let targetReview = inputArray.find((item) => item.id == reviseId); //클릭한 데이터
//     // 가져온 데이터 저장
//     let nameVal = targetReview.name; //수정을 누른 이름
//     let pw = targetReview.pw; //수정을 누른 비번
//     let reviewInput = targetReview.reviewInput; //수정을 누른 리뷰
//     let reviseStar = targetReview.starCnt; //수정을 누른 별

//     nameinput.value = nameVal;
//     pwinput.value = pw;
//     review.value = reviewInput;
//     star.value = reviseStar;
//     updateLocalStorage();
//   });
// });

function reviseBtnClick() {
  let updateVal = nameinput.value;
  let updatePw = pwinput.value;
  let updatereview = review.value;
  let updatestar = star.value;
  let updateinputArrayVal = inputArrayGet;
  let updateInputArray = inputArray; //set으로 가져옴
  const test = inputArray.map((obj) => {
    const { id, ...rest } = obj;
    return rest;
  });
  console.log(test);
  test.property = updateVal;
  const targetObj = test[0];
  const keys = Object.keys(targetObj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const keyInput = targetObj[key];
    console.log(keyInput);
  }
}
reviseBtnClick();

//기존 데이터 읽기
for (let i = 0; i < inputArray.length; i++) {
  let item = inputArray[i];

  let temp = `<div ${item.id} class="valueBox" >
    <p>이름:${item.name} 리뷰:${item.reviewInput}  별점:${item.starCnt}
      <button type="button" data-id=${item.id} class="btn btn-dark">수정</button>
      <button type="button" data-id=${item.id} class="btn btn-danger">삭제</button>
      <p class="pw">비밀번호 입력:<input form="password" type="password" /></p>
      <button class="pwBtn">확인</button>
    </p>
  </div>`;
  createForm.insertAdjacentHTML('beforeend', temp);
}

// 삭제기능 추가 , ⭐⭐⭐⭐⭐ 입력버튼 누르고 그린 html에도 삭제버튼 클릭 이벤트를 걸어줘야함

const delBtns = document.querySelectorAll('.btn-danger');
delBtns.forEach((deleteVal) => {
  //deleteBtn이 더 낫다
  deleteVal.addEventListener('click', function (e) {
    e.preventDefault();

    let stringIds = deleteVal.dataset.id;
    let numIds = parseInt(stringIds);
    inputArray = inputArray.filter((item) => item.id !== numIds);

    updateLocalStorage();

    e.target.parentElement.parentElement.remove();
  });
});

//수정기능 추가

const reviseBtns = document.querySelectorAll('.btn-dark');

reviseBtns.forEach((reviseBtn) => {
  reviseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let reviseId = reviseBtn.dataset.id; //클릭한 ID값
    let targetReview = inputArray.find((item) => item.id == reviseId); //클릭한 데이터
    // 가져온 데이터 저장
    let nameVal = targetReview.name; //수정을 누른 이름
    let pw = targetReview.pw; //수정을 누른 비번
    let reviewInput = targetReview.reviewInput; //수정을 누른 리뷰
    let reviseStar = targetReview.starCnt; //수정을 누른 별

    nameinput.value = nameVal;
    pwinput.value = pw;
    review.value = reviewInput;
    star.value = reviseStar;
  });
});

function updateLocalStorage() {
  let deleteString = JSON.stringify(inputArray);
  window.localStorage.setItem('data', deleteString);
}
