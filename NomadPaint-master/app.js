const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // 2d canvas생성
const lineWidth = document.querySelector("#lineWidth");
const color = document.querySelector("#color");
const colorOption = Array.from(document.getElementsByClassName("color-option")); //array 생성및, className
const fillBtn = document.querySelector("#Fill-Btn");
const resetBtn = document.querySelector("#reset");
const eraseBtn = document.querySelector("#eraser");
const fileBtn = document.getElementById("file");
const textInput = document.querySelector("#text");
const saveImg = document.querySelector("#save");

const WIDTH_LENGTH = 500;
const HEIGT_LENGTH = 500;
const WHITE = "white";
canvas.width = WIDTH_LENGTH;
canvas.height = HEIGT_LENGTH;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let painting = false;
let Clicking = false;
function moveMathod(event) {
  if (painting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}
function inputChange(event) {
  ctx.lineWidth = event.target.value; //event.target.value중요
}
function colorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function backGroundColor(event) {
  const dataSetColor = event.target.dataset.color;
  ctx.strokeStyle = dataSetColor;
  ctx.fillStyle = dataSetColor;
  color.value = dataSetColor; //backgroundcolor input에 지원해주는 색으로 클릭 했을 때 변경방법
}
function changeBtn() {
  if (Clicking) {
    Clicking = false;
    fillBtn.innerText = "💖Fill"; //일때 선으로 그려짐
  } else {
    Clicking = true;
    fillBtn.innerText = "💖Draw"; //일때 배경색 채워짐
  }
}
function clickFill() {
  if (Clicking) {
    ctx.fillRect(0, 0, WIDTH_LENGTH, HEIGT_LENGTH);
  }
}
function resetButton() {
  ctx.fillStyle = WHITE;
  ctx.fillRect(0, 0, WIDTH_LENGTH, HEIGT_LENGTH);
}
function eraseButton() {
  ctx.strokeStyle = WHITE;
  Clicking = false;
  fillBtn.innerText = "Fill"; //erase할때 fill로 바뀌면서 흰색선으로 지워짐
}
function fileButton(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file); //url 만들기
  const image = new Image();
  image.src = url; //img와 url 연결
  image.onload = function () {
    //img 업로드중
    ctx.drawImage(image, 0, 0, WIDTH_LENGTH, HEIGT_LENGTH);
  };
}
function textClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "30px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
  }
}
function saveImage() {
  const url = canvas.toDataURL(); //canvas.url 지원
  const a = document.createElement("a");
  a.href = url;
  a.download = "abc.png";
  a.click();
}

canvas.addEventListener("mousemove", moveMathod);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting); //mouse가 border에 떠났을때 false
canvas.addEventListener("click", clickFill);
lineWidth.addEventListener("change", inputChange); //change할때마다 값 바뀜
color.addEventListener("change", colorChange);
colorOption.forEach((color) => {
  color.addEventListener("click", backGroundColor);
});
fillBtn.addEventListener("click", changeBtn);
resetBtn.addEventListener("click", resetButton);
eraseBtn.addEventListener("click", eraseButton);
fileBtn.addEventListener("change", fileButton);
canvas.addEventListener("click", textClick);
saveImg.addEventListener("click", saveImage);
/*
ctx.stroke(); outside색 채우기
ctx.fill(); inside색 채우기
ctx.rect(50,50,100,100); 50,50에 있는 길이100 정사각형
ctx.fillRect,strokeRect 두 함수 합쳐서 사용가능
ctx.beginPath();  새로운 경로생성 색 지정시 필요
ctx.fillStyle="red"; fillStyle 색 지정
ctx.moveTo(); 첫 좌표 지정
ctx.lineTo(); 다음 이어질 좌표 지정
ctx.lineWidth = 2; 라인두께 2 지정
ctx.strokeStyle = color; color Math랜덤 때렸을때 필요
ctx.arc(50,50,20,1 * Math.PI, 2 * Math.PI); x,y,radius,원start,원end //원의시작점은 항상 우측센터!!!
flatuicolors.com 자바스크립트 색깔 입히는 곳
*/
