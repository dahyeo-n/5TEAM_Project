// 토글기능 구현
const toggle = document.querySelector('#toggle');
const toggleVal = document.querySelector('.toggleVal');
let toggleRepeat = true;
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
const inputBtn = document.querySelector('.input-btn');
const valueBox = document.querySelector('.valuetest');
let inputArray = [];
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
  let temp_hteml = `<div class="valueBox"><p>이름:${nameinput} 리뷰:${review}  별점:${star}</p></div>`;
  valueBox.insertAdjacentHTML('beforeend', temp_hteml);
  console.log(inputArray);
});
