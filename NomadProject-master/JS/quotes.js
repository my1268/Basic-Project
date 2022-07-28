const manyQuote = document.querySelector("#quotes span:first-child");
const manyAuthor = document.querySelector("#quotes span:last-child");

const quotes = [
        {quote : "HTML.CSS", author :"Basic"},
        {quote : "JavaScript", author :"Normal"},
        {quote : "TypeScript", author :"HARD"},
        {quote : "REACT", author :"HARD"}   
];

const realQuAu= quotes[Math.floor(Math.random() * quotes.length)];

manyQuote.innerText = realQuAu.quote;
manyAuthor.innerText = realQuAu.author;
/*
Math.random() 0<i<1         
Math.round()  반올림
Math.ceil()   무조건올림
Math.floor()  무조건내림
*/