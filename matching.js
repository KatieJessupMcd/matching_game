//  start the game
function startGame() {
  document.getElementById('#button').addEventListener('click');
}
//  event when card is clicked
var card = document.querySelector('.card');

card.addEventListener('click', function() {
  card.classList.toggle('is-flipped');
});

//  is it a match?

//  increment tally count on click

//  reset the game
