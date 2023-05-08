var startButton = document.getElementById("start");
var quizContainer = document.querySelector(".container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var timerElement = document.getElementById("time");
var scoreElement = document.getElementById("points");

var currentQuestion = 0;
var points = 0;
var time = 60;
var timerInterval;

var questions = [
  {
    question: "What is JavaScript?",
    choices: [
      "A server-side scripting language",
      "A client-side scripting language",
      "A markup language",
      "A programming language",
    ],
    correctAnswer: "A programming language",
  },
  {
    question: "What is a variable in JavaScript?",
    choices: [
      "A function that returns a value",
      "A named storage location for data",
      "A data type",
      "A loop",
    ],
    correctAnswer: "A named storage location for data",
  },
  {
    question: "What is a function in JavaScript?",
    choices: [
      "A way to store data ",
      "A way to repeat code",
      "A way to define reusable code",
      "A way to declare variables",
    ],
    correctAnswer: "A way to define reusable code",
  },
  {
    question: "What is an array in JavaScript?",
    choices: [
      "A type of variable",
      "A type of function",
      "A type of loop",
      "A collection of data",
    ],
    correctAnswer: "A collection of data",
  },
  {
    question: "What is the output of 'typeof null' in JavaScript?",
    choices: ["null", "undefined", "object", "number"],
    correctAnswer: "object",
  },
  {
    question: "What is the output of ''3 + 2 + 7'' in JavaScript?",
    choices: ["327", "12", "57", "NaN"],
    correctAnswer: "57",
  },
  {
    question: "What is the difference between '==' and '===' in JavaScript?",
    choices: [
      "'==' compares values, while '===' compares both value and type",
      "'===' compares values, while '==' compares both value and type",
      "'==' and '===' are the same",
      "There is no difference",
    ],
    correctAnswer:
      "'==' compares values, while '===' compares both value and type",
  },
];
//Function is called when the user clicks on the "Start" button.
//It removes the start button, hides the title and subtitle, displays the first question, and starts the timer.
function startQuiz() {
  quizContainer.removeChild(startButton);
  document.querySelector("h1").style.display = "none";
  document.querySelector("h2").style.display = "none";
  displayQuestion();
  startTimer();
}
//Displays the current question and its choices, and adds event listeners to the choices.
// When the user selects a choice, it checks if the answer is correct, updates the points and timer, displays a result message,
//moves on to the next question, and checks if the game has ended.
function displayQuestion() {
  var question = questions[currentQuestion];
  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";
  for (var i = 0; i < question.choices.length; i++) {
    var li = document.createElement("li");
    var choice = question.choices[i];
    li.textContent = choice;
    li.addEventListener("click", function () {
      if (choice === question.correctAnswer) {
        points++;
        scoreElement.textContent = `${points}`;
        displayResult(true);
      } else {
        time -= 5;
        timerElement.textContent = time;
        displayResult(false);
      }
      currentQuestion++;
      checkEndGame();
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    });
    choicesElement.appendChild(li);
  }
}
//This function displays a result message for the user, indicating whether the answer was correct or wrong.
//The result message is shown for a short duration before it is removed.
function displayResult(isCorrect) {
  var resultElement = document.createElement("div");
  resultElement.classList.add("result");

  var resultText = document.createElement("p");
  resultText.textContent = isCorrect ? "Correct" : "Wrong";
  resultElement.appendChild(resultText);

  quizContainer.appendChild(resultElement);
  setTimeout(function () {
    quizContainer.removeChild(resultElement);
  }, 1000);
}
//This function checks if the game has ended by checking if all questions have been answered or if time has run out.
//If the game has ended, it stops the timer, displays the final score, and allows the user to save their score.
function checkEndGame() {
  if (currentQuestion >= questions.length || time <= 0) {
    clearInterval(timerInterval);
    questionElement.textContent = `You scored ${points} out of ${questions.length}!`;
    choicesElement.innerHTML = "";
    submitButton.style.display = "none";
    saveScore();
  }
}
//This function is called when the game has ended and the user is prompted to save their score.
//It creates a form for the user to enter their initials, and when the form is submitted, it saves the score to local storage and displays the high scores.

function saveScore() {
  var form = document.createElement("form");
  form.setAttribute("id", "initials-form");
  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your initials";
  input.required = true;
  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Save";
  form.appendChild(input);
  form.appendChild(submitButton);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var initials = input.value;
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: points });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    var scoresList = document.querySelector("#high-scores ul");
    var score = highScores[highScores.length - 1];
    var li = document.createElement("li");
    li.textContent = `${score.initials} - ${score.score}`;
    scoresList.appendChild(li);

    submitButton.disabled = true;
  });

  quizContainer.appendChild(form);
}
//This function displays the high scores by retrieving them from local storage,
//sorting them in descending order, and displaying them in a list.
function showHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  var scoresList = document.createElement("ul");
  for (var i = 0; i < highScores.length; i++) {
    var score = highScores[i];
    var li = document.createElement("li");
    li.textContent = `${score.initials} - ${score.score}`;
    scoresList.appendChild(li);
  }
  var highScoresElement = document.querySelector("#high-scores");
  if (scoresList.childNodes.length > 0) {
    highScoresElement.innerHTML = "<h2>High Scores</h2>";
    highScoresElement.appendChild(scoresList);
  } else {
    highScoresElement.innerHTML = "<p>No high scores to display</p>";
  }
}
//Function clears scores
function clearHighScores() {
  localStorage.removeItem("highScores");
  var scoresList = document.querySelector("#high-scores ul");
  if (scoresList) {
    scoresList.remove();
  }
}
//Function starts timer
function startTimer() {
  timerElement.textContent = time;
  timerInterval = setInterval(function () {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}
//Function is called when the game has ended. It clears the timer interval that was set by startTimer() using clearInterval(), displays the final score by setting the text content of the questionElement,
//removes the choices by setting the innerHTML of the choicesElement to an empty string, and calls saveScore() to allow the user to save their score.
//Finally, it hides the submit button by setting its style.display property to "none".
function endQuiz() {
  clearInterval(timerInterval);
  questionElement.textContent = `You scored ${points} out of ${questions.length}!`;
  choicesElement.innerHTML = "";
  submitButton.style.display = "none";
  var restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    points = 0;
    time = 60;
    displayQuestion();
    startTimer();
    location.reload();
  });

  var buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  var clearHighScoresButton = document.createElement("button");
  clearHighScoresButton.textContent = "Clear High Scores";
  clearHighScoresButton.addEventListener("click", function () {
    clearHighScores();
  });

  buttonContainer.appendChild(clearHighScoresButton);

  var highScoresElement = document.createElement("div");
  highScoresElement.innerHTML = "<h2>High Scores</h2>";
  highScoresElement.setAttribute("id", "high-scores");

  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  if (highScores.length === 0) {
    highScoresElement.innerHTML = "<p>No high scores to display</p>";
  } else {
    var scoresList = document.createElement("ul");
    for (var i = 0; i < highScores.length; i++) {
      var score = highScores[i];
      var li = document.createElement("li");
      li.textContent = `${score.initials} - ${score.score}`;
      scoresList.appendChild(li);
    }
    highScoresElement.appendChild(scoresList);
  }

  quizContainer.appendChild(buttonContainer);
  quizContainer.appendChild(highScoresElement);
  buttonContainer.appendChild(restartButton);

  quizContainer.appendChild(buttonContainer);
}
startButton.addEventListener("click", startQuiz);
