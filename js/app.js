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
]

// duplicate cards array 
let gameGrid = cardsArray.concat(cardsArray);
// randomize grid on each reload
gameGrid.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

// create grid section 
const game = document.getElementById('game');
const grid = document.createElement('section');
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

//loop through selected elements and apply match class
const match = () => {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

//add event listener to grid and apply selected class to divs
grid.addEventListener('click', function(event){
    let clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match') ){
        return
    }
    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
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
});

//modal
var modal = document.querySelector('.modal');
var modalBtn = document.querySelector('.modal-button');
var closeBtn = document.querySelector('.close-button')
var playBtn = document.querySelector('.play-again');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
playBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function openModal(){
    modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
}

function outsideClick(e){
    if(e.target == modal){
        closeModal();
    }
}