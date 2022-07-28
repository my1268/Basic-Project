const GAME_TIME = 9;
let score = 0; //점수 0
let time = GAME_TIME;
let isplaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

init();

function init() {
  buttonChange("게임로딩중");
  getWords();
  wordInput.addEventListener("input", checkMatch);
}
//게임 실행
function run() {
  if (isplaying) {
    retrun;
  }
  isplaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000); // 1초마다 줄어듬
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("게임중");
}

function checkStatus() {
  if (!isplaying && time === 0) {
    buttonChange("게임시작");
    clearInterval(checkInterval);
  }
}

//단어 불러오기
function getWords() {
  axios
    .get("https://random-word-api.herokuapp.com/word?number=100")
    .then(function (response) {
      // 성공 핸들링
      response.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word);
        }
      });
      buttonChange("게임시작");
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    })
    .then(function () {
      // 항상 실행되는 영역
    });
}

//단어일치 체크
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = ""; //단어 초기화
    if (!isplaying) {
      return;
    }
    score++; // 소문자 사용가능
    scoreDisplay.innerText = score;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
  }
}

function countDown() {
  time > 0 ? time-- : (isplaying = false);
  if (!isplaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time; //시간 집어넣기
}
function buttonChange(text) {
  button.innerText = text;
  text === "게임시작"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}
