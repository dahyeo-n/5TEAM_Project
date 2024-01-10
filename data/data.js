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
const createForm = document.querySelector('.createForm');
let inputArray = []; // 클릭시 각 value들을 저장하기 위해 빈 배열 생성
inputBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let nameinput = document.querySelector('#floatingInput').value;
  let pwinput = document.querySelector('#floatingPassword').value;
  let review = document.querySelector('.review').value;
  let star = document.querySelector('.starCnt').value;
  //클릭 될때마다 inputArray에 push. 각value는 inputArray에 있는상태.
  inputArray.push({
    name: nameinput,
    pw: pwinput,
    reviewInput: review,
    starCnt: star,
  });
  //html 추가
  let temp_hteml = `<div class="valueBox">
    <p>이름:${nameinput} 리뷰:${review}  별점:${star} 
      <button type="button" class="btn btn-dark">수정</button>
      <button type="button" class="btn btn-danger">삭제</button>
    </p>
  </div>`;
  createForm.insertAdjacentHTML('beforeend', temp_hteml);
});
