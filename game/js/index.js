window.addEventListener("load", () => {




    let playing = false;
let score;
let timeRemaining;
let action;
let correctAnswer;


//the user clicks on the start/reset
document.getElementById("start").addEventListener("click", () => {

    //if the user is playing
    if (playing == true){
        //reload page
        location.reload(); 
    }
    
    //if the user is not playing
    else
    {
        //change mode to playing
        document.getElementById("startgame").pause();
        playing=true;
        score=1;        
        document.getElementById("scoreNumber").innerHTML=score;

        //show the instructions     
        document.getElementById("instruction").innerHTML="Click on the right answer";

        //show countdown box
        show("time");

        //100 seconds timer
        timeRemaining = 100;
        document.getElementById("remainingTime").innerHTML=timeRemaining;

        //hide game over box
        hide("gameover");

        //change button to reset
        document.getElementById("start").innerHTML="Reset Game";

        //start countdown
        startCountdown();

        //generate new question and answers  
        generateQA();             
    }   
});

//the user clicks on the answer box
for(let i=1; i<5; i++){
    document.getElementById("answer"+i).addEventListener("click",scoreChange);
}

function scoreChange(){    
    if(playing==true){

        //if the answer is correct
        //this=document.getElementById("answer1")
        if (this.innerHTML==correctAnswer)
        { 
            //correct answer
            score++;
            document.getElementById("scoreNumber").innerHTML=score;
            //play sound
            document.getElementById("win").play();
            show("right");

            //show for 1 sec
            setTimeout(function(){
                hide("right");
            },1000);    
            hide("wrong");
            //generate new answer and question
            generateQA();

        }
        else
        {  //play sound
            score--;
            document.getElementById("scoreNumber").innerHTML=score;
            document.getElementById("lost").play();
            

            //wrong answer
            show("wrong");

            //show for 1 sec
            setTimeout(function(){
                hide("wrong");
            }, 1000);
            hide("right");
        }             
    }
}

//functions 

//start countdown 20sec
function startCountdown(){
    action = setInterval(function(){
        timeRemaining-=1;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        if(timeRemaining === 0 || score === 50 || score < 0)
        {//game over
            stopCountdown();
            show("gameover");
            if (score < 0) {
                document.getElementById("gameover").innerHTML= "<p>GAME OVER!</p><p>YOU LOSE!</p>";  
                hide("score");
            } else {
                document.getElementById("gameover").innerHTML= "<p>YOU WIN</p><p>YOUR SCORE: " + score + "</p>";  
                hide("score");
            }
            document.getElementById("final").play();
            hide("time");
            hide("right");
            hide("wrong");
            playing=false;
            document.getElementById("start").innerHTML = "Start Game";
        }
    },1000);
}


//generate question and answers 
function generateQA(){
    //a random digit from 0 to 10 inclusive
    let randomNumber1 = Math.round(Math.random()*10);   
    let randomNumber2 = Math.round(Math.random()*10);     

    document.getElementById("problem").innerHTML=randomNumber1+ " x " +randomNumber2;
    correctAnswer=randomNumber1*randomNumber2;  
    let answerBox= (Math.round(Math.random()*3))+1;

    //to fill on if the random answer boxes with the right answer
    document.getElementById("answer"+answerBox).innerHTML=correctAnswer; 

    //storing answer choices;    
    let answers=[correctAnswer];

    //to fill the other answer boxes with the wrong answers   

    //make sure to exclude the box with the right answer
    for (let i=1; i<5; i++){
        if (i!==answerBox)
    { 
        let wrongAnswer;
        // check that the wrong answer is not equal to the right answer or another taken wrong answer
        //do: at least one possible answer, while: generate then a new possible answer, if the previous answer is not ok
        do{
            wrongAnswer = (Math.round(Math.random()*10))*(Math.round(Math.random()*10));
        }            
        while(answers.indexOf(wrongAnswer)>-1) ; //wrongAnswer is already in the answer list, we countinue do loop   

            document.getElementById("answer"+i).innerHTML=wrongAnswer;
        //adding wrong answer to answer choices
        answers.push(wrongAnswer);
    }
    }
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}
//hide an element      
function hide(id){      
    document.getElementById(id).style.display="none";      
}   
//show an element
function show(id){      
    document.getElementById(id).style.display="block";      
}    

});


