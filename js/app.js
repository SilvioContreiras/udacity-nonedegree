const myCards =  document.querySelectorAll('.my-card');
let numMove =  document.getElementById('moveCount').textContent = 0;

let countMatch = 0;
let timerDelay = 0;
let seg = 0;
let min = 0;
let timerCount =  document.querySelector('.time');
let time =  '';
let timeResting = 0;
let reiniciar = document.querySelector('.reInit');
let modal = document.querySelector('.modal');
let felicitacoes =  document.querySelector('.congratulations');
let textTime = '';
let modalMensag = ''; 
let status =  document.querySelector('.statistcs');
let estrelas = document.querySelector('.all-stars').getElementByTagName('li');
let contStars =  3;

reiniciar.addEventListener('click', reinInitGame);



let changeCard = false;
let block = false;
let cardOne, cardTwo;

function showCard() {
	if (block) return;

	if(this === cardOne) return;
	this.classList.add('show');

	if (!changeCard) {

		// First Click 
		changeCard = true;
		cardOne = this;

		return;

	} 
		changeCard = false;
		cardTwo = this;

		//  Check if the cards matches or not
	if (cardOne.dataset.name === cardTwo.dataset.name) {
		checarMatch();

		countMatch ++;
		youWin();

	} 

	else {

		numberSteps();

		block = true;
		setTimeout(function(){
			noMatch()

			block =  false;
		}, 700);		
	} 
}

// Reset the game

function resetGame() {
	changeCard = false;
	block = false;
	cardOne = null;
	cardTwo = null;
}


// Couts the number of steps failed.

function numberSteps() {
	let countPlay = numMove + 1; 
	numMove = document.getElementById('moveCount').innerHTML = countPlay;
}


function checarMatch() {
	//  remove the function that make the card to flip
	flipCards();
	resetGame();
}

// When there is no match removes the flipped card

function noMatch() {
	cardOne.classList.remove('shake');
	cardTwo.classList.remove('shake');

	cardOne.classList.remove('show');
	cardTwo.classList.remove('show');
}

//  Flips the card to front 
function flipCards() {
	cardOne.removeEventListener('click', showCard);
	cardTwo.removeEventListener('click', showCard);

	cardOne.classList.add('shake');
	cardTwo.classList.add('shake');
}

// Game start
// function initGame() {
// 	for (let i = 0; i < myCards.length; i++) {
// 		myCards[i].addEventListener(click, showCard)
// 	}
// }


// Init the the time of the game
function timeStart() {
	time = setInterval(buildTime, 1000);
}


// Calculate minutes and seconds 
function buildTime() {
	sec += 1;
	min =  Math.floor(sec / 60);
	sec = Math.floor(sec % 60);
	textTime = pad(min) + ":" + pad(sec);
	timerCount.innerHTML =  textTime;
} 


function pad(value) {
	let txt = value + "";
	if(txt.length < 2){
		return "0" + txt;
	} else {
		return txt;
	}
}

function stopTime() {
	clearInterval(time);
	sec = 0;
	min = 0;
	textTime = '';
}

function createsMensg() {
	modalMensag = "<p>You made" + numMove + "moves in" + min + "minutes" + sec + "seconds!</p>" + "<p>you received" + contStars + "star</p>"
}


// Verify if you win the game.
function youWin() {

	if (countMatch === 8) {
		console.log("You Win");
	}
}


//  Shuffle the array of cards

(function shuffle() {
	myCards.forEach(function(card){
		let randomNum = Math.floor(Math.random() * 16);
		card.style.order = randomNum;
	});
})();



myCards.forEach(function(card){
	card.addEventListener('click', showCard);
});







