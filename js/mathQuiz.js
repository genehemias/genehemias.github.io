var operators = [];

var problem = {
	operand1: null,
	operand2: null,
	operator: null,
	answer: null
};

var computerFinished, id;

let opponent = document.getElementById('computer');
var opponentX = opponent.offsetLeft;
var oppSizeInfo = opponent.getBoundingClientRect();
var oppDistance = window.innerWidth - oppSizeInfo.width;

let car = document.getElementById('player');
let carSizeInfo = car.getBoundingClientRect();
let totalDistance = window.innerWidth - carSizeInfo.width;
let step = totalDistance/25 || 50;

function init() {
	document.getElementById('checkBtn').disabled = true;
	document.getElementById('startBtn').disabled = false;
	document.getElementById('answer').addEventListener('keypress', function(e) {
		var key = e.which || e.keyCode;
		if (key === 13) {
			checkAnswer();
		}
	});
	computerFinished = false;
}

function getOperand(){
	return Math.floor(Math.random() * 20);
}

function getOperand2(num1){
	return Math.floor(Math.random() * num1);
}

function getOperator(){
	let a = operators.length;
	let i = Math.floor(Math.random() * a);
	return operators[i];
}

function getResult(num1, num2, oper8r){
	if (oper8r === '+') {
		return num1+num2;
	} else if (oper8r === '-') {
		return num1-num2
	} else {
		return num1*num2;
	}
}

function getNewProblem() {
	let operator = getOperator();
	let operand1;
	if (operator === "x") {
		operand1 = 10;
	}
	else {
		operand1 = getOperand();
	}
	let operand2 = getOperand();
	if (operator === '-') {
		if (operand2 > operand1) {
			operand2 = getOperand2(operand1);
		}
	}
	problem.operand1 = operand1;
	problem.operator = operator;
	problem.operand2 = operand2;
	problem.answer = getResult(operand1, operand2, operator);
	refreshView();
}

function refreshView() {
	document.getElementById('operand1').innerHTML = problem.operand1;
	document.getElementById('operand2').innerHTML = problem.operand2;
	document.getElementById('operator').innerHTML = problem.operator;
	document.getElementById('answer').value = '';
}

function enterListener(e) {
	let key = e.which || e.keyCode;
	if (key === 13) {
		checkAnswer();
	}
}

function checkAnswer(){
	//is the user's answer correct y/n?
	let guess = document.getElementById('answer').value;
	let feedback = document.getElementById('feedback');
	if (guess == problem.answer) {
		//tell user
		feedback.innerHTML = "Correct!";
		//move player car
		let finished = takeStep();
		if (finished){
			if (computerFinished) {
				feedback.innerHTML = "The green car won.  Better luck next time!";
			}else{
				feedback.innerHTML = "You won the race! EXCELLENT!!";
			}
			document.getElementById('restartBtn').hidden = false;
			clearInterval(id);
		}
		//get new problem and update page
		getNewProblem();		
	} else {
		feedback.innerHTML = "Nope. Guess again."
		document.getElementById('answer').value='';
	}
	document.getElementById('answer').focus();
}

function takeStep() {
	let x = car.offsetLeft;
	let y = car.offsetTop;
	if (x < totalDistance) {
		x += step;
		car.style.left = x + 'px';
		if(x>=totalDistance){
			return true;
		}else{
			return false;
		}
	}
}

function animate(opts) {  
  let start = new Date;
  id = setInterval(function() {
    let timePassed = new Date - start;
    let progress = timePassed / opts.duration;

    if (progress > 1) {progress = 1;}
    
    let delta = opts.delta(progress);
    opts.step(delta);
    
    if (progress == 1) {
      clearInterval(id);
      computerFinished = true;
    }
  }, opts.delay || 10);
}

function move(delta, duration) {
  let to = oppDistance;  
  animate({
    delay: 10,
    duration: duration || 1000, // 1 sec by default
    delta: delta,
    step: function(delta) {
      opponent.style.left = to*delta + "px"    
    }
  });
}

function startGame() {	 
	//populate operators from user selection
	if (getOperatorsFromUser())
	{
	 	//show new math problem
		getNewProblem();
		//enable check answer button
		document.getElementById('checkBtn').disabled = false;
		//start computer car moving
		move(delta, 120000);
		//disable start button
		document.getElementById('startBtn').disabled = true;
		document.getElementById('restartBtn').hidden = false; 
		document.getElementById('answer').focus();
	}
}

function delta(p) {return p;}

function getOperatorsFromUser() {
	let add = document.getElementById('add');
	let minus = document.getElementById('subtract');
	let times = document.getElementById('multiply');
	if(add.checked){
		operators.push('+');
	}
	if (minus.checked) {
		operators.push('-');
	}
	if (times.checked) {
		operators.push('x');
	}
	if (operators.length === 0) {
		document.getElementById('feedback').innerHTML = "You must choose at least one type of problem.";
		return false;
	}
	return true;
}