const myCards =  document.querySelectorAll('.my-card');
let myScore =  document.getElementById('score').textContent = 0;

let card =  document.querySelectorAll('.front');


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

		//  remove the function that make the card to flip
		cardOne.removeEventListener('click', showCard);
		cardTwo.removeEventListener('click', showCard);

		setTimeout(function(){

			for (let i = 0; i < card.length; i++) {
				card[i].classList.add('match');

				console.log('Awesome!!');
			}

		}, 200);

		resetGame();

	} else {

		let countPlay = myScore + 1; 
		myScore = document.getElementById('score').innerHTML = countPlay;

		block = true;
		setTimeout(function(){
			cardOne.classList.remove('show');
			cardTwo.classList.remove('show');

			block =  false;
		}, 600);		
	} 
}

function resetGame() {
	changeCard = false;
	block = false;
	cardOne = null;
	cardTwo = null;
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







