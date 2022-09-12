let a: string = "hello";
let b: boolean[] = [false];
let c: number[] = [];
c.push(1);

type Name = string;
type Age = number;
type player = { readonly name: Name; age?: Age };
// readonly 추가나 변경 안됨
//? 가져도되고 안가져도됨.(optional parameter)

const playerMaker = (name: string): player => ({ name });
const nico = playerMaker("nico");
nico.age = 12;

const player: readonly [string, number, boolean] = ["1", 2, true];

let d: null = null;
let e: undefined = undefined;
//any = typescript해제

let f: unknown; //변수의 타입을 미리 알지 못할때 사용
if (typeof f === "number") {
  let g = f + 1;
}
if (typeof f === "string") {
  let h = f.toUpperCase();
}

function hello(): void {
  // return할 것이 아무것도 없음.
  console.log("x");
}
//const h = hello();
// h.toUpperCase(); 안됨.

function hey(): never {
  // return하지않고 오류발생
  throw new Error("xxx");
}
function het(name: string | number) {
  if (typeof name === "string") {
  } else if (typeof name === "number") {
  } else {
    name; // never 절대 실행안됨.
  }
}

type Add = (a: number, b: number) => number; //call signatures
const add: Add = (a, b) => a + b;

//overloading 안먹히네
type Config = {
  //overloading(1)
  path: string;
  state: object;
};
type Push = {
  (path: string): void;
  (config: Config): void;
};
const push: Push = (config) => {
  //config = config: string | Config
  if (typeof config === "string") {
    console.log(config); //string
  } else {
    console.log(config.path); //Config
  }
};
type As = {
  //overloading(2)
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};
const as: As = (a, b, c?: number) => {
  //a = number, b = number
  if (c) return a + b + c;
  return a + b;
};
as(1, 2);
as(1, 2, 3);

//generic(1)
type SuperPrint = {
  <T, M>(a: T[], b: M): T; // 마우스 hover시 타입보여줌
};
/* 같음
function SuperPrint<T>(a:T[]){
  return a[0]
}
*/
const superPrint: SuperPrint = (a) => a[0];
const superPrint1 = superPrint([1, 2, 3, true], "x");
const superPrint2 = superPrint([true, "string"], 1);
//generic(2)
type play<E> = {
  name: string;
  extraInfo: E;
};
type playss = { favFood: string };
type plays = play<playss>;
const nco: plays = {
  name: "nco",
  extraInfo: {
    favFood: "kimchi",
  },
};
const lynn: play<null> = {
  name: "lynn",
  extraInfo: null,
};

//class(1)
abstract class User {
  //추상 class 클래스 상속 가능
  constructor(
    protected firstName: string, //private class내에서만
    protected lastName: string, //protected 상속받은 class까지
    protected nickname: string //public 다됨.
  ) {}
  abstract getNickName(): void; //call signature  추상메소드는 구현되어있지않음.
  getFullName() {
    //method = class안에 존재하는 함수.
    return `${this.firstName} ${this.lastName}`;
  }
}
class same extends User {
  //상속 class
  getNickName() {
    //추상메소드 구현해줘야됨.
    console.log(this.nickname);
  }
}
const nam = new same("nico", "las", "니꼬"); //instance
nam.getFullName();
//class(2)
type Words = {
  [key: string]: string;
};
class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
  static hello() {
    return "hello";
  }
}
class Word {
  constructor(public readonly term: string, public readonly def: string) {}
}
const kimchi = new Word("kimchi", "한국의 음식");
const dict = new Dict();
dict.add(kimchi);
dict.def("kimchi");
Dict.hello();

//interface(1)
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;
interface Aaa {
  //오브젝트 모양을 알려줌.
  nickname: string;
  team: Team;
  health: Health;
}
const Qa: Aaa = {
  nickname: "nico",
  team: "yellow",
  health: 1,
};
//interface(2)
interface Userr {
  name: string;
}
interface Playerr extends Userr {}
const qwe: Playerr = {
  name: "nico",
};
//interface(real.3)
interface Usering {
  //abstract는 js에 없으므로 interface사용
  firstName: string;
  lastName: string;
  sayHi(name: string): string;
  fullName(): string;
}
interface Human {
  health: number;
}
class Please implements Usering, Human {
  //implements 간결
  constructor(
    public firstName: string, // interface는 public만 가능
    public lastName: string, // interface 타입 중복가능 type은 중복안됨.
    public health: number
  ) {}
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  sayHi(name: string) {
    return `Hello ${name}. My name is ${this.fullName()}`;
  }
}
function makeUser(user: Usering): Usering {
  return {
    firstName: "nico",
    lastName: "kas",
    fullName: () => "xx",
    sayHi: (name) => "string",
  };
}
makeUser({
  firstName: "nico",
  lastName: "kas",
  fullName: () => "xx",
  sayHi: (name) => "string",
});

type PlaterA = {
  firstName: string;
};
interface platerB {
  firstName: string;
}
class Userd implements platerB {
  constructor(public firstName: string) {}
}
