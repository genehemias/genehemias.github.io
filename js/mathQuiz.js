import newProblem from './mathProblem.js'

$(document).foundation()

let btnStartPressed = function () {
    getControlValues()
    if (validateGameSetup()) {
        btnResetPressed()
        startGame()
    }
}

let operators = [];
let maxOperand = 20;
let numProblems = 20;
let raceDuration = 120;

let problem = {
    operand1: null,
    operand2: null,
    operator: null,
    answer: null
};

let playerProgress = 0;
let step = 1;
let finishLine = 0;

function getControlValues() {
    getOperators();
    maxOperand = $('#maxOperand')[0].value;
    numProblems = $('#numProblems')[0].value;
    raceDuration = $('#duration')[0].value;
    finishLine = $('.outer').height() + 'px';
}

function getOperators() {
    if ($('#cbAdd').prop('checked')) {
        operators.push('+');
    }
    if ($('#cbSubtract').prop('checked')) {
        operators.push('-');
    }
    if ($('#cbMultiply').prop('checked')) {
        operators.push('x');
    }
    if ($('#cbDivide').prop('checked')) {
        operators.push('&#247;');
    }
}

let btnResetPressed = function () {
    $("#setup").toggle("slow");
    $("#gameboard").toggle("slow");
}

function startGame() {
    resetPlayerLocations();
    calculatePlayVariables();
    newProblem(operators, maxOperand, problem);
    showProblem();
    $("#btnSubmit").removeAttr("disabled", "");
    $("#answer")[0].value = null;
    $("#answer")[0].focus();
    $("#lblFeedback")[0].innerHTML = "answer to win";
}

function validateGameSetup() {
    if (operators.length <= 0) {
        alert("You must select at least one operator.");
        return false;
    }
    return true;
}

function resetPlayerLocations() {
    playerProgress = 0;
    $("#player").height(playerProgress + '%');
}

function calculatePlayVariables() {
    step = 100/numProblems;
    document.documentElement.style.setProperty('--duration',raceDuration+'s');
}

function showProblem() {
    $("#operand1")[0].innerHTML = problem.operand1;
    $("#operator")[0].innerHTML = problem.operator;
    $("#operand2")[0].innerHTML = problem.operand2;
}

let btnSubmitAnswer = function () {
    if (correctAnswer()) {
        updatePlayer();
        if (playerProgress >= 100) {
            gameOver();            
            return;
        }
        newProblem(operators, maxOperand, problem);
        showProblem();
    } else {
        $("#lblFeedback")[0].innerHTML = "That's not it.<br>Try again.";
    }
    $("#answer")[0].value = null;
    $("#answer")[0].focus();
}

function correctAnswer() {
    return $("#answer")[0].value == problem.answer;
}

function updatePlayer() {
    $("#lblFeedback")[0].innerHTML = "Correct!<br>";
    playerProgress += step;
    $("#player").height(playerProgress + '%');
}

function gameOver() {
    let message = "You finished the race!<br>";
    let opponentProgress = $("#opponent").css("height");
    if (opponentProgress == finishLine) {
        message += "But you did not win."
    } else {
        message += "And you won!"
    }
    $("#lblFeedback")[0].innerHTML = message;
    $("#btnSubmit").attr("disabled", "");
}

let enterListener = function(e) {
	let key = e.which || e.keyCode;
	if (key === 13) {
		btnSubmitAnswer();
	}
}

document.getElementById("btnStart").addEventListener('click', btnStartPressed);
document.getElementById("btnSubmit").addEventListener('click', btnSubmitAnswer);
document.getElementById("btnReset").addEventListener('click', btnResetPressed);
document.addEventListener("keypress", enterListener);
