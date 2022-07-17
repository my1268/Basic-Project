const formList = document.querySelector("#todolist");
const ulList = document.querySelector("#list");
const formInput = formList.querySelector("input"); //formList안에 들어있음

let toDos = []; // toDos.push(newInput);
const TODOS_KEY = "toDos";

function saveToDo(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //JSON.stringify() 배열을 스트링으로 바꿔줌.
    //  localStorage은 string밖에 안들어감 (배열형태라 string필요)
}

function deleteToDO(event){
    const li =event.target.parentElement; // target = 정확히 지정해줌 li.remove() event클릭되면 li를 즉시 지움
    li.remove(); // parentElement = html태그까지 지정 안쓰면 button이모티콘만 지워짐
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //filter 예시 parseInt문자를 숫자로 바꿔줌
    saveToDo(); 
}            

function newPut(newInput){ //newInput값 가져옴 
    const li = document.createElement("li");
    li.id = newInput.id;
    const span = document.createElement("span");
    li.appendChild(span); // li안에 span넣기
    span.innerText=newInput.text; //span안에 form.Input.value넣기(=newInput) +.text = Obj 
    const button = document.createElement("button");
    li.appendChild(button); //li안에 button넣기
    button.innerText ="✖"; //이모티콘 window + . 
    ulList.appendChild(li); //ul안에 li넣기
button.addEventListener("click",deleteToDO ); 
}

function newToDOList(event) {
    event.preventDefault();
    const newInput = formInput.value; //값이 newInput에 저장
    formInput.value=""; //enter누르면 없애기 값은 남아있음
    const newInputObj ={ 
        text : newInput,  // text 값은 그대로 id값 추가
        id : Date.now() // 1/1000초 랜덤값 표현할때 좋음
    };
    toDos.push(newInputObj); // /newInputObj할때마다 배열 text값, id값을 하나씩 추가하겠다. 
    newPut(newInputObj);//newInputObj newPut으로 이동
    saveToDo(); 
}
formList.addEventListener("submit", newToDOList);

const giveToDo = localStorage.getItem(TODOS_KEY);

if(giveToDo !== null) {
    const givingToDo = JSON.parse(giveToDo);
    toDos = givingToDo;
    givingToDo.forEach(newPut);
}

