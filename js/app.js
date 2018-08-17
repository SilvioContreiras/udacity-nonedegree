const myCards =  document.querySelectorAll('.my-card');
let myScore =  document.getElementById('score').textContent = 0;

let card =  document.querySelector('.front');


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

		let countPlay = myScore + 1; 
		myScore = document.getElementById('score').innerHTML = countPlay;

		block = true;
		setTimeout(function(){
			noMatch()

			block =  false;
		}, 700);		
	} 
}

function resetGame() {
	changeCard = false;
	block = false;
	cardOne = null;
	cardTwo = null;
}


function checarMatch() {
		//  remove the function that make the card to flip
		flipCards();
		resetGame();

}

function noMatch() {
	cardOne.classList.remove('shake');
	cardTwo.classList.remove('shake');

	cardOne.classList.remove('show');
	cardTwo.classList.remove('show');
}

function flipCards() {
	cardOne.removeEventListener('click', showCard);
	cardTwo.removeEventListener('click', showCard);

	cardOne.classList.add('shake');
	cardTwo.classList.add('shake');
}

(function shuffle() {
	myCards.forEach(function(card){
		let randomNum = Math.floor(Math.random() * 16);
		card.style.order = randomNum;
	});
})();



myCards.forEach(function(card){
	card.addEventListener('click', showCard);
});







