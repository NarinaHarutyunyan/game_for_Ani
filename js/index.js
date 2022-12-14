"use strict";

let playing = false;
let score;
let timeRemaining;
let action;
let correctAnswer;
let uncor;
const audioWin = document.createElement("audio");
audioWin.src = "./sounds/1.mp3";
const audioLose = document.createElement("audio");
audioLose.src = "./sounds/2.mp3";
const audioStart = document.createElement("audio");
audioStart.src = "./sounds/startss.mp3";
const audioRight = document.createElement("audio");
audioRight.src = "./sounds/right.mp3";
const audioWrong = document.createElement("audio");
audioWrong.src = "./sounds/wrong.mp3";


document.getElementById("start").addEventListener("click", () => {
    audioStart.currentTime = 0;
    audioStart.play();
    if (playing == true) {
        location.reload();
    }

    else {
        playing = true;
        score = 0;
        uncor = 0;
        document.getElementById("scoreNumber").innerHTML = score;        
        document.getElementById("instruction").innerHTML = "Ընտրել ճիշտ պատասխանը";    
        show("time");
        
        timeRemaining = 200;
        document.getElementById("remainingTime").innerHTML = timeRemaining;

        hide("gameover");

        document.getElementById("start").innerHTML = "Սկսել նորից";

        startCountdown();

        generateQA();
    }
});

document.querySelectorAll(".answer").forEach(item => {
    item.addEventListener("click", scoreChange);
});

function scoreChange() {
    if (playing == true) {
        if (this.innerHTML == correctAnswer) {
            score++;
            audioStart.pause();
            audioRight.currentTime = 0;
            audioRight.play();
            document.getElementById("scoreNumber").innerHTML = score;

            show("right");

            setTimeout(function () {
                hide("right");
            }, 1000);
            hide("wrong");
           
            generateQA();

        }
        else {  
            uncor++;
            audioStart.pause();
            audioWrong.currentTime = 0;
            audioWrong.play();
            document.getElementById("scoreNumber").innerHTML = score;
            document.getElementById("falseScore").innerHTML = uncor;

            show("wrong");
           

            setTimeout(function () {
                hide("wrong");
            }, 1000);
            hide("right");
        }
    }
}

function startCountdown() {
    action = setInterval(function () {
        timeRemaining -= 1;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        if(timeRemaining === 20){

            let timerAnimation;
            if (!timerAnimation) {
                timerAnimation = document.getElementById("time").animate([
                    {transform: "scale(0.1)",  filter: "sepia(100%)"},                
                    
                    {transform: "scale(1)",  filter: "sepia(0%)"}
                ], {
                    duration: 1500,
                    iterations: Infinity
                });
            document.querySelector("#time").style.backgroundColor="pink";
        }
    }

        if (timeRemaining === 0 || score === 50 || uncor >= 10) {
            stopCountdown();
            show("gameover");
            if ( uncor >= 10 ||timeRemaining === 0  ) {
                document.getElementById("gameover").innerHTML = "<p>Սիրելի Անի այս անգամ դու պարտվեցիր։Կրկնիր բազմապատկման աղյուսակը</p><p>Միավորների թիվը՝ " + score ;
                hide("score");
                audioStart.pause();
                audioLose.currentTime = 0;
                audioLose.play();
            } 
            else if(score === 50) {
                    audioStart.pause();
                    audioWin.currentTime = 0;
                    audioWin.play();
                    document.getElementById("gameover").innerHTML = "<p>Սիրելի' Անի, շնորհավորում եմ, դու հաղթեցիր:</p><p>Միավորների թիվը՝ " + score + "</p>";
                hide("uncor");  
                
                } 
            

            hide("time");
            hide("right");
            hide("wrong");
            playing = false;
            document.getElementById("start").innerHTML = "Սկսել խաղը";
        }
    }, 1000);
}


function generateQA() {
    let randomNumber1;
    let randomNumber2;
    if (score >= 0 && score < 30) {
        randomNumber1 = Math.round(Math.random() * 10);
        randomNumber2 = Math.round(Math.random() * 10);
    } else if (score >= 30 && score < 40) {
        randomNumber1 = Math.round(Math.random() * 10);
        randomNumber2 = 10;
    } else if (score >= 40 && score <= 45) {
        randomNumber1 = Math.round(Math.random() * 10);
        randomNumber2 = 20;
    } else if (score >= 45) {
        randomNumber1 = Math.round(Math.random() * 10);
        randomNumber2 = 30;
    }

    document.getElementById("problem").innerHTML = randomNumber1 + " x " + randomNumber2;
    correctAnswer = randomNumber1 * randomNumber2;
    let answerBox = (Math.round(Math.random() * 3)) + 1;

    document.getElementById("answer" + answerBox).innerHTML = correctAnswer;

    let answers = [correctAnswer];

    for (let i = 1; i < 5; i++) {
        if (i !== answerBox) {
            let wrongAnswer;
            do {
                if (score >= 0 && score < 30) {
                    wrongAnswer = (Math.round(Math.random() * 10)) * (Math.round(Math.random() * 10));
                } else if (score >= 30 && score < 45) {
                    wrongAnswer = (Math.round(Math.random() * 10)) * (Math.floor(Math.random() * (99 - 10 + 1) + 10));
                    document.querySelector("#LevelNumber").innerHTML = "2";
                } else if (score >= 45) {
                    wrongAnswer = (Math.round(Math.random() * 10)) * (Math.floor(Math.random() * (99 - 10 + 1) + 10));

                    document.querySelectorAll(".answer").forEach(item => {
                        document.querySelector("#LevelNumber").innerHTML = "3";
                        item.style.width = "90px";
                    });
                    
                }
            }
            while (answers.indexOf(wrongAnswer) > -1); 

            document.getElementById("answer" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

function stopCountdown() {
    clearInterval(action);
}
function hide(id) {
    document.getElementById(id).style.display = "none";
}
function show(id) {
    document.getElementById(id).style.display = "block";
}

