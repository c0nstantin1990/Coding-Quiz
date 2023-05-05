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
        scoreElement.textContent = `Score: ${points}`;
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    });
    choicesElement.appendChild(li);
  }
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
}
startButton.addEventListener("click", startQuiz);
