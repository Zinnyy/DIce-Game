'use strict';

//SELECTING ELEMENTS
const scoreE0 = document.querySelector('#score--0');
const scoreE1 = document.getElementById('score--1');
const nameE0 = document.getElementById('name--0');
const nameE1 = document.getElementById('name--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//STARTING CONDITION
// scoreE0.textContent = 0;
// scoreE1.textContent = 0;
// diceEl.classList.add('hidden')
let score, currentScore, activePlayer, playing;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
const init = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0.textContent = 0;
  current1.textContent = 0;
  scoreE0.textContent = 0;
  scoreE1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', e => {
  e.preventDefault();
  if (playing) {
    //GENERATING A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    //DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //CHECK FOR ROLL Q: IF TRUE, SWITCH TO NEXT PLAYER
    if (dice !== 1) {
      //add dice to current score
      //currentScore = currentScore + dice
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', e => {
  if (playing) {
    //add current score to active player score
    score[activePlayer] += currentScore;
    //scores
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    //check if player score >= 100
    if (score[activePlayer] >= 20) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', e => {
  e.preventDefault();
  init();
});
