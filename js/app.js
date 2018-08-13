let myCards =  document.querySelectorAll('.my-card');

let changeCard = false;
let cardOne, cardTwo;
let close = false;

function showCard() {
	if (close) {
		return;
	}

	if(this === cardOne) return;
	this.classList.add('show');

	if (!changeCard) {
		changeCard = true;
		cardOne = this;

		return;
	} else {
		changeCard = false;
		cardTwo = this;
	}

	if (cardOne.dataset.name === cardTwo.dataset.name) {
		cardOne.removeEventListener('click', showCard);
		cardTwo.removeEventListener('click', showCard);

		changeCard = false;
		close = false;
		cardOne = null;
		cardTwo = null;
	} else {
		setTimeout(function(){
			close = true;
			cardOne.classList.remove('show');
			cardTwo.classList.remove('show');
			close =  false;
		}, 1200)
	} 
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