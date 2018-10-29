//  event when card is clicked - add an event listener to every class
var card = document.querySelectorAll('.card');

card.forEach(function(card) {
  card.addEventListener('click', flipCard);
});

//  handle matching the cards
//  when you click one card, you need to wait until another card is
//  flipped in order to make a match

//  how to know if it is flipped or not
//  important to be able to KEEP TRACK OF THE STATE OF THE CARD UNION-
//  ie is it flipped over? is it the first card or the second card?
var hasFlippedCard = false;
var lockBoard = false; //  this prevents two sets of cards from being flipped at the same time, b/c this will break the flipping
var firstCard;
var secondCard;
var moves = 0;

//   Function to flip the cards
function flipCard() {
  if (lockBoard) return; //  if lockBoard is true, can't flip a card, function will end
  //  the class 'is-flipped' is added to the selected card
  if (this === firstCard) return; // if you double clicked on the first card, exit out of flip card function
  moveCounter();
  this.classList.add('is-flipped');

  //  if the card has not been flipped over
  if (!hasFlippedCard) {
    //  hasFlippedCard is set to true, and
    //  the selected card is now the first card
    hasFlippedCard = true;
    firstCard = this;
    //  and the function ends, because we need to assing a value
    //  to the secondCard
    return;
  }
  //  else, if a card HAS already been flipped over
  //  (hasFlippedCard = true);
  //  then the selected card is assigned as the secondCard
  secondCard = this;

  //  once a second card has been assined a value,
  //  we can then check for a match, so we call our checkForMatch function
  checkForMatch();
}

//  check to see if datasets match
function checkForMatch() {
  //  if the firstCards data set matches the second card
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //  call the disableCard function, which will remove the event listener and
    //  make the cards unclickable
    disableCards();
    //  and the function ends --- **** could also CHANGE THIS SYNTAX to an if/else
    return;
  }
  //  otherwise, unflip the cards - ie flip them back over b/c it is not a match
  unflipCards();
}

//  function to disable the cards if it is a match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  //  now, if either of these cards that have been
  //  assined to these variables are clicked, nothing will happen,
  //  they will remain exposed
  resetBoard();
}

//  function to flip the cards back over if they are not a match,
//  after a set time they will flip back over

function unflipCards() {
  lockBoard = true; // no more cards can be flipped
  setTimeout(() => {
    //  after a certain amount of time has passed, take away that class, so
    //  the cards flip back over
    firstCard.classList.remove('is-flipped');
    secondCard.classList.remove('is-flipped');

    resetBoard();
    //  then, since those cards have been flipped over, reset so
    //  more cards can be flipped
  }, 1500);
}

//  function to reset the board
function resetBoard() {
  //  shorthand- instead of manually resetting these variables,
  //  can simply invoke the reset function and reset them that way
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
