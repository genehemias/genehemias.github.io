function Animal(name, srcImg){
	this.name = name;
	this.srcImg = 'images/' + srcImg;
	this.srcAudio = 'sounds/' + name + '.mp3';
}

var animals = [
	new Animal('dog','dog.png'),
	new Animal('cat','cat.png'),
	new Animal('pig', 'pig.png'),
	new Animal('sheep', 'sheep.png'),
	new Animal('horse','horse.png'),
	new Animal('cow', 'cow.png'),
	new Animal('squirrel','squirrel.png')
];

let streak = 0;
let level = 1;
let winner = false;
var guess;

function animalBtnClick(name){
	winner = false;
	guess = name;
	//play corresponding animal sound
	playSound(name);
	//wait for sound to finish before continuing
	setTimeout(checkAnswer, 1700);			
}

function checkAnswer(){
	//get img element to check/update
	let img = document.getElementById('animalImg');
	let imgTitle = img.getAttribute('title');
	//check if correct answer has been given
	if (imgTitle === guess) {
		correctGuess(guess, img, imgTitle);
	} else {
		alert("That's not a " + guess +  ". Try again.");
		streak = 0;
		document.getElementById('streak').innerHTML = streak;
		level = 1;
		document.getElementById('level').innerHTML = level;
	}
}

function correctGuess(name, img, imgTitle){
	//get new animal. don't present the same animal twice in a row
	let currentAnimalIndex = animals.indexOf(imgTitle);
	let i = currentAnimalIndex;
	while (i === currentAnimalIndex) {
	 i = Math.floor((Math.random() * (animals.length - 1)) + 1 );
	}
	//present new animal
	img.setAttribute('title', animals[i].name);
	img.setAttribute('src', animals[i].srcImg);
	//update correct answer counter
	streak++;
	document.getElementById('streak').innerHTML = streak;
	//alert for every 10 correct in a row
	winner = streak%10 === 0;
	if (winner) {
		level = (streak/10) + 1;
		alert("YOU GOT " + streak + " IN A ROW! YOU ARE NOW LEVEL " + level + "!");
		document.getElementById('level').innerHTML = level;
	}
}

function playSound(name){
	let sound = document.getElementById('animalSound');
	let soundSrc = 'sounds/' + name + '.mp3';
	sound.setAttribute('src', soundSrc);
	sound.play();
}

function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
}