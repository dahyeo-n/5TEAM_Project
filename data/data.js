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
