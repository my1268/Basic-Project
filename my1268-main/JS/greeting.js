const loginForm = document.querySelector("#login-form");  // 쿼리셀렉터로 태그찾기
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting"); 

const HIDDEN_CLASSNAME = "hidden";  //같은 string은 대문자 variable이 보기 쉽다.
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault(); //기본동작인 새로고침 막음, event의 첫 argument 즉시 출력
    loginForm.classList.add(HIDDEN_CLASSNAME); // 로그인폼, greeting 둘다 hidden class있음
    const username = loginInput.value; // 로그인인풋의 값을 유저네임에 저장 
    localStorage.setItem(USERNAME_KEY, username); // localStorage (API) 유저등록가능 setItem 등록 getItemm 불러오기 removeItem 등록제거
    paintGreetings(username);
}    
function paintGreetings(username){  // 두줄 코딩 하나의 함수로 합치기 
    greeting.innerText = `Hello ${username} `; // setItem("", ) set은 키와벨류필요
    greeting.classList.remove(HIDDEN_CLASSNAME); 
}

const savedUsername = localStorage.getItem(USERNAME_KEY); // getItem()

if(savedUsername === null) {   //만약 save된 username이 없다면
    loginForm.classList.remove(HIDDEN_CLASSNAME); //  loginForm hidden된걸 없애라 
    loginForm.addEventListener("submit", onLoginSubmit); //입력값을 받아내는 event
} else {
   paintGreetings(savedUsername);  // 있다면 innerText를 보여주고, h1 hidden된걸 없애라
}
