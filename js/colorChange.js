var colors = [
	'beige',
	'brown',
	'cornflowerblue',
	'darkolivegreen',
	'darkslategrey',
	'lavender',
	'orangered',
	'palevioloetred',
	'springgreen',
	'teal',
	'black',
	'yellow'
];

var i;

function colorBtnClick(id){	
	i = Math.floor((Math.random()*(colors.length-1))+1);
	let color = colors[i];
	let div = document.getElementById(id); 
	div.style.backgroundColor = color;
}