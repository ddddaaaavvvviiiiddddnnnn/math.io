let wrong = 0;
let problemCount = 0;
let startTime;
let currentAnswer = 0;

const startButton = document.getElementById("start-button");
const problemArea = document.getElementById("problem-area");
const problemDisplay = document.getElementById("problem");
const answerInput = document.getElementById("answer-input");
const submitButton = document.getElementById("submit-button");
const resultArea = document.getElementById("result-area");
const resultDisplay = document.getElementById("result");
const timeDisplay = document.getElementById("time");
const wrongAttemptsDisplay = document.getElementById("wrong-attempts");
const restartButton = document.getElementById("restart-button");

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartQuiz);

async function getProblem() {
    const response = await fetch('/generate_problem');
    const data = await response.json();
    return data;
}

async function loadNextProblem() {
    if (problemCount < 10) {
        const problemData = await getProblem();
        problemDisplay.textContent = `Problem #${problemCount + 1}: ${problemData.expression} = ?`;
        currentAnswer = problemData.answer;
        answerInput.value = "";
        answerInput.focus();
        problemCount++;
    } else {
        finishQuiz();
    }
}

function startQuiz() {
    wrong = 0;
    problemCount = 0;
    startTime = new Date();

    startButton.classList.add("hidden");
    problemArea.classList.remove("hidden");
    resultArea.classList.add("hidden");

    loadNextProblem();
}

function checkAnswer() {
    const userAnswer = parseFloat(answerInput.value);
    if (userAnswer === currentAnswer) {
        loadNextProblem();
    } else {
        wrong++;
        alert("Wrong answer, try again.");
        answerInput.value = "";
        answerInput.focus();
    }
}

function finishQuiz() {
    const endTime = new Date();
    const totalTime = ((endTime - startTime) / 1000).toFixed(2);

    problemArea.classList.add("hidden");
    resultArea.classList.remove("hidden");

    resultDisplay.textContent = "Quiz Completed!";
    timeDisplay.textContent = `You finished in: ${totalTime} seconds`;
    wrongAttemptsDisplay.textContent = `Wrong attempts: ${wrong}`;
}

function restartQuiz() {
    startButton.classList.remove("hidden");
    resultArea.classList.add("hidden");
}
