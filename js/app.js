$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-lg btn-block start-button' href='#' role='button'><strong>Start Quiz</strong></a></p>";
    $(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
    event.preventDefault();  // added line to test issue on GitHub Viewer
    generateHTML();
    
    timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
    //answeredQuestion = true;
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
        //alert("correct");
        clearInterval(theClock);
        generateWin();
    }
    else {
        //alert("wrong answer!");
        clearInterval(theClock);
        generateLoss();
    }



}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
    resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
               + counter + "</span></p>" + "<p class='text-center'><strong>You ran out of time!</strong></p>" + "<p class='text-center'>The correct answer was: " 
               + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 2000);  //  change to 4000 or other amount
}



function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
               + counter + "</span></p>" + "<p class='text-center correct'><strong>Correct!</strong></p>" + "<p class='text-center'>The answer is: " 
               + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 2000);  //  change to 4000 or other amount
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
               + counter + "</span></p>" + "<p class='text-center wrong'><strong>Wrong!</strong></p>" + "<p class='text-center'>The correct answer is: "
               + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 2000); //  change to 4000 or other amount
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='question'>Q."+flag+"  " 
               +questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " 
               +answerArray[questionCounter][0] + "</p><p class='answer'>B. "
               +answerArray[questionCounter][1]+"</p><p class='answer'>C. "
               +answerArray[questionCounter][2]+"</p><p class='answer'>D. "
               +answerArray[questionCounter][3]+"</p>";
    $(".mainArea").html(gameHTML);
    flag++;
}

function wait() {
    if (questionCounter < 4) {
    questionCounter++;
    generateHTML();
    counter = 20;
    timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
               + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'><strong>Correct Answers:</strong> " 
               + correctTally + "</p>" + "<p class ='timer-q'><strong>Wrong Answers:</strong> " 
               + incorrectTally + "</p>" + "<p><strong>Unanswered:</strong> " 
               + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
    flag=1;
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 20;
    generateHTML();
    timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 20;
var questionArray = ["Who was the first indian captain of T20 match ?",
                    "Who was the first Indian bowler to take hat-tick in test cricket?",
                    "First Indian batsman to score 100 in test cricket?", 
                    "Who did the fastest stumping in cricket history?", 
                    "The most number of consecutive matches played for a team?"];

var answerArray = [["MS Dhoni", "Sourav Ganguly", "Rahul Dravid", "Virendra Sehwag"],
                   ["Kapil dev","Chetan Sharma","Harbhajan Singh","Anil Kumble"], 
                   ["Vijay Merchant", "Lala Amarnath", "Sunil Gavsker", "Vinoo Mankadu"], 
                   ["Mark Boucher","Adam Gilchrist","MS Dhoni","AB Devilliers"], 
                   ["Ricky Ponting", "Sachin Tendulkar", "Jacks Kallis", "Andy Flowe"]];

    var firstChoice = ["MS Dhoni", "Kapil dev", "Vijay Merchant", "Mark Boucher", "Ricky Ponting"];
    var secondChoice = ["Sourabh Ganguly", "Chetan Sharma", "Lala Amarnath", "Adam Gilchrist", "Sachin Tendulkar"];
    var thirdChoice = ["Rahul Dravid", "Harbhajan Singh", "Sunil Gavsker", "MS Dhoni", "Jacks Kallis"];
    var fourthChoice = ["Virendra Sehwag", "Anil Kumble", "Vinoo Mankad", "AB Devilliers", "Andy Flower"];

var imageArray = ["<img class='center-block img-right' src='images/sehwag.jpg'>", 
                  "<img class='center-block img-right' src='images/Harbhajan.jpg'>", 
                  "<img class='center-block img-right' src='images/Amarnath.jpg'>", 
                  "<img class='center-block img-right' src='images/Dhoni.jpg'>", 
                  "<img class='center-block img-right' src='images/Sachin.jpg'>"];

var correctAnswers = ["D. Virendra Sehwag", "C. Harbhajan Singh", "B. Lala Amarnath", "C. MS Dhoni", "B. Sachin Tendulkar", "A. Ankara", "B. Bogota", "D. New Delhi"];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var flag = 1;
