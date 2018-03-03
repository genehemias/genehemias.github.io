let animals = [
		{
			name:'dog',
			url:'images/dog.png'
		},
		{
			name:'cat',
			url:'images/cat.png'
		},
		{
			name:'pig',
			url:'images/pig.png'
		},
		{
			name:'cow',
			url:'images/cow.png'
		},
		{
			name:'squirrel',
			url:'images/squirrel.jpg'
		}
	];

var highScore = 0;

function btnClick(liName) {
	let li = document.getElementById(liName);
	let liStyle = li.getAttribute('style');
	if (liStyle === 'color:red') {
		li.setAttribute("style","color:black");

	} else {
		li.setAttribute('style','color:red');
	}
}

function animalBtn(animalName){
	//let animalImg = document.getElementById('quizImg');
	let correctAnimal = document.getElementById('quizImg').getAttribute('alt');
	if (correctAnimal === animalName) {
		correctAnswer(animalName);
	} else {
		wrongAnswer(animalName);
	}
}

function changeQuizImg(){        		
	let img = document.getElementById('quizImg');
	let i = Math.floor( (Math.random() * (animals.length-1) ) + 1 );
	img.setAttribute('src',animals[i].url);
	img.setAttribute('alt', animals[i].name);
}

function correctAnswer(animalName) {
	changeQuizImg();
	highScore++;
	document.getElementById('streak').innerHTML = highScore;
	alert("That is a " + animalName + ". You got the correct answer!");
}

function wrongAnswer(animalName) {
	highScore = 0;
	document.getElementById('streak').innerHTML = highScore;
	alert("That is not a " + animalName + ". Guess again.");
}