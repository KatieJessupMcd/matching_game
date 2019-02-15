var card = document.querySelectorAll('.card');

card.forEach(function(card) {
  card.addEventListener('click', flipCard);
});

var hasFlippedCard = false;
var lockBoard = false; //  this prevents two sets of cards from being flipped at the same time, b/c this will break the flipping
var firstCard;
var secondCard;
var moves = 0;

//   Function to flip the cards
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  moveCounter();
  this.classList.add('is-flipped');
  //  if the card has not been flipped over
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    return;
  }
  unflipCards();
}

//  function to disable the cards if it is a match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}


function unflipCards() {
  lockBoard = true; // no more cards can be flipped
  setTimeout(() => {
    //  after a certain amount of time has passed, take away that class, so
    //  the cards flip back over
    firstCard.classList.remove('is-flipped');
    secondCard.classList.remove('is-flipped');

    resetBoard();
  }, 1500);
}

//  function to reset the board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/*
//  function to shuffle
(function shuffle() {
  card.forEach(element => {
    var randomPos = Math.floor(Math.random() * 12);
    element.style.order = randomPos;
  });
})();
*/

//  increment tally count on click

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}

//  reset the game -- brute force fix- need more finesse if I want to save the lowest score

document.getElementById('button').addEventListener('click', reset);
function reset() {
  location.reload();
}
