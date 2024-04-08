let gameSeq = []; 
let userSeq = []; 
let btns = ['red','blue','yellow','purple'];
let score = [0];
let started = false;
let h2 = document.querySelector("h2");
let btn = document.querySelector("button");
let level = 0;
let record = 0;
btn.addEventListener('click', function(){
   
    if(started ==false){
        console.log("The game is started");
        started = true;
        levelUp();
    }
    else{
        return;
    }
});
function btnFlash(btn){
        btn.classList.add('flash');
        setTimeout(function(){
            btn.classList.remove("flash");
        }, 150);
}
function levelUp(){
    userSeq =[];
    level++;
    h2.innerText = `Level ${level} \nHighest Score : ${record}`;
    score.push(level);
    let randomIdx = Math.floor(Math.random() * 4 );
    let randomElement = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomElement}`);
    gameSeq.push(randomElement);
    console.log(gameSeq);
    btnFlash(randombtn);
}
function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp,1000);
        }
    } 
    else{   
        document.querySelector('.container-div').style.backgroundColor = "red";
        if(level == 0) level = 1;
        h2.innerText = `Game Over! \nYour Score is ${level-1} \nHighest Score : ${record} \nPress the button to Restart the Game`;
       btn.innerText = "Restart";
        h2.style.fontSize = "30px";
        restart();
        setTimeout(()=>{document.querySelector('.container-div').style.backgroundColor = "white";
                        h2.style.fontSize = "20px";
                         },100);
    }
    score.push(level);
    record = highestScore();
}
function btnPress(){
    let btn = this;
    userSeq.push(this.getAttribute('id'));
    console.log(userSeq);
    btnFlash(btn);
    setTimeout(checkAns(userSeq.length-1));
}
let allBtns = document.querySelectorAll(".block");
let i = 1;
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}
function restart(){
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}
function highestScore(){ 
   let max = -1;
   for(s of score){
    if(s>max){
        max = s;
    }
   }
   return max;
}
