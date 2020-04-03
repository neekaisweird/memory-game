// cards
const cardsArray = [
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

const newGame = () => {
  // duplicate cards array
  gameGrid = cardsArray.concat(cardsArray);
  // randomize grid on each reload
  gameGrid.sort(() => 0.5 - Math.random());

  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  delay = 1200;

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
};

newGame();

//loop through selected elements and apply match class
const match = () => {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
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
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
};

grid.addEventListener('click', addSelected);

//modal
let modal = document.querySelector('.modal');
let modalBtn = document.querySelector('.modal-button');
let closeBtn = document.querySelector('.close-button');
let playBtn = document.querySelector('.play-again');

// temporary
function openModal() {
  modal.style.display = 'block';
}

const closeModal = () => {
  modal.style.display = 'none';
};

const outsideClick = e => {
  if (e.target == modal) {
    closeModal();
  }
};

const playAgain = () => {
  //remove old grid and add new one with event listener
  game.removeChild(grid);
  newGame();
  grid.addEventListener('click', addSelected);
  closeModal();
};

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
playBtn.addEventListener('click', playAgain);
window.addEventListener('click', outsideClick);
