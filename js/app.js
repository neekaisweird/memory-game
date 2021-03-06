const allCards = [
  {
    name: 'bulldog',
    img: 'img/bulldog.png'
  },
  {
    name: 'butterfly',
    img: 'img/butterfly.png'
  },
  {
    name: 'cat',
    img: 'img/cat.png'
  },
  {
    name: 'colibri',
    img: 'img/colibri.png'
  },
  {
    name: 'cow',
    img: 'img/cow.png'
  },
  {
    name: 'deer',
    img: 'img/deer.png'
  },
  {
    name: 'frog',
    img: 'img/frog.png'
  },
  {
    name: 'hedgehog',
    img: 'img/hedgehog.png'
  },
  {
    name: 'hippo',
    img: 'img/hippo.png'
  },
  {
    name: 'koala',
    img: 'img/koala.png'
  },
  {
    name: 'ladybug',
    img: 'img/ladybug.png'
  },
  {
    name: 'lion',
    img: 'img/lion.png'
  },
  {
    name: 'pig',
    img: 'img/pig.png'
  },
  {
    name: 'seal',
    img: 'img/seal.png'
  },
  {
    name: 'guinea',
    img: 'img/guinea-pig.png'
  }
];

let gameGrid;
let firstGuess;
let secondGuess;
let count;
let previousTarget;
let delay;
let game;
let grid;
let matchedCards;
let numAnimals = 10;
let cardsArray = [];

const createCardArray = () => {
  cardsArray = [];
  let cards = [...allCards];
  while (cardsArray.length < numAnimals) {
    let randomIndex = Math.floor(Math.random() * cards.length);
    cardsArray.push(cards[randomIndex]);
    cards.splice(randomIndex, 1);
  }
};

const createGameGrid = () => {
  // duplicate cards array
  gameGrid = cardsArray.concat(cardsArray);
  // randomize grid on each reload
  gameGrid.sort(() => 0.5 - Math.random());

  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  delay = 1200;
  matchedCards = 0;

  // create grid section
  game = document.getElementById('game');
  grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);

  // loop through duplicated cards arrray
  gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
  grid.addEventListener('click', addSelected);
};

const checkWinner = () => {
  if (matchedCards === numAnimals) {
    modal.style.display = 'block';
  }
};

const match = () => {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
  checkWinner();
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

//add event listener to grid and apply selected class to divs
const addSelected = event => {
  let clicked = event.target;
  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        matchedCards++;
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
};

const startNewGame = () => {
  if (grid) game.removeChild(grid);
  createCardArray();
  createGameGrid();
};

//difficulty
const changeDifficulty = difficulty => {
  if (difficulty === 'Easy') numAnimals = 6;
  if (difficulty === 'Medium') numAnimals = 10;
  if (difficulty === 'Hard') numAnimals = 15;
};

let difficultyButtons = document.querySelectorAll('.difficulty-button');
difficultyButtons.forEach(button =>
  button.addEventListener('click', e => {
    document.querySelector('.chosen').classList.remove('chosen');
    e.target.classList.add('chosen');
    changeDifficulty(e.target.textContent);
    if (numAnimals > 10) {
      document.body.classList.add('hard-level');
      startNewGame();
    }
    if (numAnimals < 15) {
      document.body.classList.remove('hard-level');
      startNewGame();
    }
  })
);

//modal
let modal = document.querySelector('.modal');
let closeBtn = document.querySelector('.close-button');
let playBtn = document.querySelector('.play-again');

const closeModal = () => {
  modal.style.display = 'none';
};

const outsideClick = e => {
  if (e.target == modal) {
    closeModal();
  }
};

const playAgain = () => {
  startNewGame();
  closeModal();
};

closeBtn.addEventListener('click', closeModal);
playBtn.addEventListener('click', playAgain);
window.addEventListener('click', outsideClick);

startNewGame();
