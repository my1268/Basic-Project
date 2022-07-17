const clock = document.querySelector("#clock"); //"h2#clock"가능 

function realClock() {
    const date = new Date(); // date 선언
    const hours = String(date.getHours()).padStart(2,'0'); //시간 메서드들은 number형이므로 String()을 사용해 string형으로 바꿔준다
    const minutes = String(date.getMinutes()).padStart(2,'0'); //.padStart(2,'0') >> 최대2단어 앞에0추가 
    const seconds = String(date.getSeconds()).padStart(2,'0'); //.padEnd(2,'0')>> 최대2단어 뒤에0추가

    clock.innerText = (`${hours}:${minutes}:${seconds}`); //innerText =필요함;
} 
realClock(); // 즉시 호출
setInterval(realClock, 1000); // 1초마다 바뀜  setTimeout(dates, 1000); 1초뒤 한번 바뀜

