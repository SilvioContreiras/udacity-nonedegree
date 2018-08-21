// Declaring all Variables

const myCards =  document.querySelectorAll('.my-card');
let numMove =  0

let countMatch = 0;
let timerDelay = 0;
let secTotal = 0;
let sec = 0;
let minTotal = 0;
let timerCount =  document.querySelector('.time');
let time =  '';
let timeResting = 0;
let reiniciar = document.querySelector('.reInit');
let modal = document.querySelector('.modal');
let felicitacoes =  document.querySelector('.congratulations');
let textTime = '';
let modalMensag = ''; 
let status =  document.querySelector('.statistcs');
let estrelas = document.querySelector('.all-stars').getElementsByTagName('li');
let contStars =  3;
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

		timerDelay ++;
		if (timerDelay === 1) {
			timeStart();
		}

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
		starRemove();
		block = true;
		setTimeout(function(){
			noMatch()

			block =  false;
		}, 700);		
	} 
}

playAgain();

// Reset the game
function resetGame() {
	changeCard = false;
    block = false;
	cardOne = null;
	cardTwo = null;
}

// Function play again button
function playAgain() {
	reiniciar.addEventListener('click', newGame);
}

function newGame() {
	stopTime();
	clearModal();
	reIniciarGame();
	console.log('working!');
}


// Reset number of moves, timer, and the number of stars
function reIniciarGame() {
	numMove = document.getElementById('moveCount').textContent = 0;
	timerCount.innerHTML = '';
	timerDelay = 0;
	estrelas[1].style.display =  'inline-block';
	estrelas[2].style.display =  'inline-block';
	window.location.reload();
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


// Init the the time of the game
function timeStart() {
	time = setInterval(buildTime, 1000);
}


// Calculate minutes and seconds 
function buildTime() {
	++sec;
	minTotal =  pad(parseInt(sec / 60));
	secTotal =  pad(sec % 60);
	textTime = minTotal + ":" + secTotal;
	timerCount.innerHTML =  textTime;
} 


function pad(val) {
	let txt = val + "";
	if(txt.length < 2){
		return "0" + txt;
	} else {
		return txt;
	}
}

function stopTime() {
	clearInterval(time);
	secTotal = 0;
	minTotal = 0;
	textTime = '';
}

function createsMensg() {
	modalMensag = "<p>Você fez " + numMove + " movimentos em " + minTotal + " min e " + secTotal + " seg</p>" + "<p> recebeste " + contStars + " Estrela(s)</p>"
}

function createsModal() {
	status.innerHTML = '';
	status.innerHTML =  modalMensag;
}

function showModal() {
	createsModal();

	runClick();
	window.onclick =  function(event) {
		if(event.target == modal) {
			esconderModal();
		}
	};

	modal.style.display =  'block';
}

// Click on confirm to close the modal
// and play again to play again.
function runClick() {
	document.querySelector('#play-again').onclick = newGame;
}


// Hide the modal modal
function esconderModal() {
	modal.style.display = 'none';
}

// clear the modal status

function clearModal() {
	status.innerHTML =  '';
}

// End of the game and show the message
function endOfGame() {
	createsMensg();
	stopTime();
	showModal();
}

// This function starts removing the amout of stars when the number of moves exceeds 16
function starRemove() {
	if (numMove > 16) {
		estrelas[2].style.display =  'none';
		contStars = 2;
	} if (numMove > 20) {
		estrelas[1].style.display =  'none';
	}
}


// Verify if you win the game.
function youWin() {
	if (countMatch === 8) {

		endOfGame();
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


//  Go through the array containg the cards
myCards.forEach(function(card){
	card.addEventListener('click', showCard);
});







