//  To begin task we must declare all variables first;  so make a list (hints are left within the HTML for reference) 

var time = 60;
var timer;
var currentQuestion = 0;
var score = 0;
var submit;

// sound effects for right and wrong answer
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
                
 // start game with an event listener - set up function to start timer and display questions.
 var startQuiz = document.getElementById("start"); 
 document.addEventListener("click", startQuiz); // this should then be startQuiz.addEventListener("click"); this then states what we want from it

 var questionContainer = document.getElementById("questons"); //used to grab div for the Questions.
 var questionsTitle = document.getElementById("question-title");
 var choicesContainer = document.getElementById("choices"); // Grab div for the answer choices.
 var endScreen = document.getElementById("end-screen");
 var finalScore = document.getElementById("final-score");
 var initialsInput = document.getElementById("initials");
 var submitButton = document.getElementById("submit");
 submitButton.addEventListener("click", saveScore);

 var endQuiz = document.getElementById("end-screen"); // Grabs the div that will allow us to end the game and toggle the visibility.
 
 var feedback = document.getElementById("feedback");


// Functions for working code:


function startQuiz() {
  startButton.classList.add("hide");
  questionsContainer.classList.remove("hide");
  timer = setInterval(function() {
    time--;
    document.getElementById("time").innerHTML = time;
    if (time === 0) {
      clearInterval(timer);
      endQuiz(); // this is a function built at the end of the code, and it is just called here
    }
  }, 1000);
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestion < questions.length) {
    questionTitle.innerHTML = questions[currentQuestion].question;
    choicesContainer.innerHTML = "";
    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
      var choice = document.createElement("button");
      choice.innerHTML = questions[currentQuestion].choices[i];
      choice.addEventListener("click", checkAnswer);
      choicesContainer.appendChild(choice);
    }
  } else {
    endQuiz();
  }
}


  // function displayQuestion() {
  //     var currentQuest = questions[currentQuestion];//create a variable to get the current question object from question array
  //     if (currentQuest < questions.length){
  //       questionTitle.innerHTML = questions[currentQuestion].question; //update title with with current question...currentQuest.title
  //       choicesContainer.innerHTML = "";
  //       for (var i = 0; i < questions[currentQuestion].choices.length; i++) { //loop over questions
  //         var choice = document.createElement("button"); //create a new button for each choice
  //         choice.innerHTML = questions[currentQuestion].choices[i]; //set a value attribute to each with a value of questions.choices[i]
  //         choice.addEventListener("click", checkAnswer); //attach a click event to the button with the checkAnswer function as the event
  //         choicesContainer.appendChild(choice); //append the button to the choices
  //       }
  //     } else {
  //       endQuiz(); //clear out the choices element
  //     }
  //   }
    
  
  function checkAnswer() {
    if (this.innerHTML === questions[currentQuestion].answer) { //check if the value of the button clicked(this) and if it matches the answer of the current question
      //then make the feedback element have a text of 'Correct'
      score++;
      feedback.innerHTML = sfxRight();
      feedback.classList.remove("hide");
    } else {
      time -= 10; //else you need to reduce 15 seconds from the time
      feedback.innerHTML = sfxWrong;
      feedback.classList.remove("hide"); //remove the class of hide to the feedback element
      timeLeft(); //display the new time on the page
    }
    setTimeout(function() { //set a timeout function so that the class of hide gets added back after a second to hide the feedback
      feedback.classList.add("hide");
      currentQuestion++;
      displayQuestion(); //move to the next question
    }, 1000);
  }
  
    //make a condition so that if we ran out of questions the quiz ends, else displayQuestion

  //create a function to end the quiz
function endQuiz() {
  clearInterval(timer); //inside the function clear the interval of the timer
  questionsContainer.classList.add("hide"); //hide the questions
  endScreen.classList.remove //show the end screen
  ("hide");
  finalScore.innerHTML = score;
}

function saveScore() {
  var initials = initialsInput.value;
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({initials: initials, score: score});
  localStorage.setItem("highscores", JSON.stringify(highscores));
  window.location.href = "highscores.html";
}


  //show the final score
