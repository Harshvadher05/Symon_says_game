let gameSeq = [];
let userSeq = [];
let btns = ["C-one", "C-two", "C-three", "C-four"];

let started = false;
let level = 0;
let highScore = 0;
let name;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {                          //0
    name = prompt("Enter your name");
    if (started == false) {
        console.log("game is started...");
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {                                              //1
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn)
    gameSeq.push(randColor);
    console.log(gameSeq);
    console.log(userSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {                                                 //4
    // console.log("cur level :",level);
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = "Game over! press any key to start";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black" ,color = "white";
        },200);
        score();
        reset();
    }
}

function btnPress() {                                                    //3
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");                                //2
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
}

function score(){
    if(highScore <= level){
        highScore = level;
        let hs = document.querySelector(".HS");
        hs.innerHTML =`<u>HIGH SCORE = ${highScore}</u>`;
    }
    let s = document.createElement("h2");
    let scoreContainer = document.querySelector(".score-container");
    s.innerText = `${name}'s score = ${level}`;
    scoreContainer.appendChild(s);
}