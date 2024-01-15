
/* ---------------------------------------------------------------------------------------------------- */ 

// 입력 사항 검사 후 실행
// export const button = document.querySelector("inputBtn");
// button.addEventListener("click", function (event) {
//   event.preventDefault();

//   const idVal = document.getElementById("idVal").value;
//   const nameinput = document.getElementById("nameinput").value;
//   const pwinput = document.getElementById("pwinput").value;
//   const review = document.getElementById("review").value;
//   const star = document.getElementById("star").value;
  
//   // 사용자 입력 검사

//   // if (!nameinput || !pwinput || !review || !star) {
//   //   alert("항목을 모두 입력해주세요!");
//   //   return;
//   // }
//   if (!/^\d+$/.test(pwinput)) {
//     alert("비밀번호는 숫자만 입력해주세요");
//     return;
//   }
//   if (pwinput.length !== 4) {
//     alert("비밀번호는 4자리로 입력해주세요");
//     return;
//   }

//   saveData();
//   printData();

//   document.getElementById("nameinput").value = "";
//   document.getElementById("pwinput").value = "";
//   document.getElementById("star").value = "⭐️";
//   document.getElementById("review").value = "";
//   window.location.reload();
// });
// printData();

// // // 리뷰 삭제
// const deleteVal = (event) => {
//   // 비밀번호 입력 받기
  // let password = prompt("비밀번호를 입력해주세요.");

//   // 저장된 데이터 가져오기
//   let inputArrayGet = window.localStorage.getItem('data');

//   if (inputArrayGet !== null) {
//     let infoArray = JSON.parse(inputArrayGet);

//     // button id 와 localstrage의 button id가 같은지 확인
//     const buttonId = event.target.id;
//     const filteredreview = infoArray.find(
//       (data) => data.buttonId === buttonId);

//     // 비밀번호 확인
//     if (filteredreview && filteredreview.pwinput === pwinput) {
//       infoArray = infoArray.filter((data) => data.buttonId !== buttonId);
//       let inputArrayVal = JSON.stringify(infoArray);
//       localStorage.setItem("myData", inputArrayVal);

//       printData();
//     } else {
//       alert("비밀번호가 일치하지 않습니다.");
//     }
//   }
//   window.location.reload();
// };

// // 비밀번호 숫자만 입력
// const $pwinput  = document.getElementById(pwinput)
// $pwinput.addEventListener("input", pwinput);
// function pwinput(){
//   this.value.replace(/[^0-9]/g, "0")
// }

  // 유효성 검사
  // if (nameinput==="") {
  //   return alert("이름을 입력해주세요.")
  //   } 
  //   if (pwinput==="") {
  //   return  alert("비밀번호를 입력해주세요.")
  //   }
  //   if (review==="") {
  //   return  alert("리뷰를 입력해주세요.")
  //   }
  // // 비밀번호 숫자 4자리 입력
  //   if (!/^\d+$/.test(pwinput)) {
  //     alert("비밀번호는 숫자만 입력해주세요");
  //     return;
  //   }
  //   if (pwinput.length !== 4) {
  //     alert("비밀번호는 4자리로 입력해주세요");
  //     return;
  //   }