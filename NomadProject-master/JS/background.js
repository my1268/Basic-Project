const gif = ["1.gif"];
const livegif = gif[Math.floor(Math.random() * gif.length)];

const newgif = document.createElement("img"); // JS에서 img만드는법
newgif.src = `img/${livegif}`; // 이부분 어려운듯  img폴더+jpg
document.body.appendChild(newgif); //body로 옮겨줌
