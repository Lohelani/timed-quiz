var questions = [
    {
        question: "What attribute attaches a script file to an HTML file?",
        choices: ["src", "href", "br", "type"],
        answer: "src",
    },
    {
        question:
            "Values in an array are enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "square brackets",
    },
    {
        question:
            "What are function parameters listed within?",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question:
            "Which of the following would NOT be included in a for loop?",
        choices: ["i < 5", "i == i", "i ++", "i = 0"],
        answer: "i == i",
    },
    {
        question:
            "Which of the following is a boolean data type?",
        choices: ["YES/NO", "ON/OFF", "TRUE/FALSE", "all of the above"],
        answer: "all of the above",
    },
];
var startDiv = document.getElementById("start");
var questionDiv = document.getElementById("question-screen");
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var scoreDiv = document.getElementById("scores");
var finalScore = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");

var questionIndex = 0;
var correctCount = 0;
var time = 25;
var intervalId;

function startQuiz() {
    startDiv.setAttribute("class", "hide");
    questionDiv.removeAttribute("class");
    renderQuestion();
}
function endQuiz() {
    clearInterval(intervalId);
    scoreDiv.removeAttribute("class");
    questionDiv.setAttribute("class", "hide");

    finalScore.textContent = correctCount;
}


function saveHighScore() {
    var initials = initialsEl.value.trim();
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    console.log(highscores)

    var score = {
        initials: initials,
        score: correctCount
    }

    highscores.push(score);
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    var score = 0;
}


function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}


function renderQuestion() {
    if (time == 0) {
        updateTime();
        return;
    }



    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    intervalId = setInterval(updateTime, 1000);
    questionEl.textContent = questions[questionIndex].question;

    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        optionListEl.append(questionListItem);
    }
}

function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            correctCount++;
        } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 2;
            timerEl.textContent = time;
        }
    }
    setTimeout(nextQuestion, 2000);


}
var el = document.getElementById("option-list");
if (el) {
    el.addEventListener('click', checkAnswer, false);
}
var el = document.getElementById("start");
if (el) {
    el.addEventListener('click', startQuiz, false);
}
var el = document.getElementById("submit");
if (el) {
    el.addEventListener('click', saveHighScore, false);
}
