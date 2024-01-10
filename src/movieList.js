const key = "key=b8a2981a96998e2deb17da0f88d6ebdb";
const targetDt = "&targetDt=20240101";
const movieCd = "&movieCd=572802";

const url =
  "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?" +
  key +
  targetDt;

fetch(url)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
