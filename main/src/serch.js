export const serchMovie = () => {
  const inputform = document.querySelector('.input-form').value.replace(/\s/g, '');
  const checkTitle = document.querySelectorAll(".card-title");
  const checkCard = document.querySelectorAll(".col");
  for (let i = 0; i < checkTitle.length; i++) {
    const a = checkTitle[i].innerHTML;

    if (inputform === '') {
      alert('검색어 입력해라');
      break;
    } else {
      if (a.includes(inputform)) {
        checkCard[i].style.display = "block";
      } else {
        checkCard[i].style.display = "none";
      }
    }
    }
};
