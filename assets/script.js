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
    question: "What is the output of '3 + 2 + 7'' in JavaScript?",
    choices: ["'327'", "12", "57", "NaN"],
    correctAnswer: "'57'",
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

function startQuiz() {
  quizContainer.removeChild(startButton);
  document.querySelector("h1").style.display = "none";
  document.querySelector("h2").style.display = "none";
  displayQuestion();
  startTimer();
}

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

function displayResult(isCorrect) {
  var resultElement = document.createElement("div");
  resultElement.classList.add("result");

  var resultText = document.createElement("p");
  resultText.textContent = isCorrect ? "Correct" : "Wrong";
  resultElement.appendChild(resultText);

  quizContainer.appendChild(resultElement);
  setTimeout(function () {
    quizContainer.removeChild(resultElement);
  }, 2000);
}

function checkEndGame() {
  if (currentQuestion >= questions.length || time <= 0) {
    clearInterval(timerInterval);
    questionElement.textContent = `You scored ${points} out of ${questions.length}!`;
    choicesElement.innerHTML = "";
    submitButton.style.display = "none";
    saveScore();
  }
}

function saveScore() {
  // create a form for the user to enter their initials
  var form = document.createElement("form");
  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your initials";
  input.required = true;
  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Save";
  form.appendChild(input);
  form.appendChild(submitButton);

  // add event listener to the form to handle submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var initials = input.value;
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: points });
    highScores.sort(function (a, b) {
      return b.score - a.score;
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    quizContainer.removeChild(form);
    showHighScores();
  });

  // add the form to the page
  quizContainer.appendChild(form);
}
function showHighScores() {
  quizContainer.innerHTML = "";
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var scoresList = document.createElement("ul");
  for (var i = 0; i < highScores.length; i++) {
    var score = highScores[i];
    var li = document.createElement("li");
    li.textContent = `${score.initials} - ${score.score}`;
    scoresList.appendChild(li);
  }
  quizContainer.appendChild(scoresList);
}

function clearHighScores() {
  localStorage.removeItem("highScores");
  showHighScores();
}

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

function endQuiz() {
  clearInterval(timerInterval);
  questionElement.textContent = `You scored ${points} out of ${questions.length}!`;
  choicesElement.innerHTML = "";
  submitButton.style.display = "none";
  var viewHighScoresButton = document.createElement("button");
  viewHighScoresButton.textContent = "View High Scores";
  viewHighScoresButton.addEventListener("click", function () {
    questionElementtextContent = "High Scores";
    choicesElement.innerHTML = "";
    submitButton.style.display = "none";
    showHighScores();
  });
  quizContainer.appendChild(viewHighScoresButton);
  var clearHighScoreButton = document.createElement("button");
  clearHighScoreButton.textContent = "Clear High Scores";
  clearHighScoreButton.addEventListener("click", function () {
    clearHighScores();
  });
  quizContainer.appendChild(clearHighScoreButton);
}
startButton.addEventListener("click", startQuiz);
