const myCards =  document.querySelectorAll('.my-card');
let myScore =  document.getElementById('score').textContent = 0;


let timer =  '';
let timerDelay = 0;
let seg = 0;
let min = 0;
let timerCount =  document.querySelector('.timer');
let reiniciar = document.querySelector('.reInit');
let modal = document.querySelector('.modal');
let felicitacoes =  document.querySelector('.congratulations');
let status =  document.querySelector('.statistcs');


// reiniciar.addEventListener('click', reinInitGame);

// let card =  document.querySelector('.front');


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
	let countPlay = myScore + 1; 
	myScore = document.getElementById('score').innerHTML = countPlay;
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







