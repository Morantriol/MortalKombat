const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
// const $restartButton = document.querySelector('.restart');

const scorpion = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [],
    attack: function () {
        console.log(`${this.name} Fight...`);
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

const subzero = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [],
    attack: function () {
        console.log(`${this.name} Fight...`)
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
};

const createPlayer = (character) => {
    const $player = createElement('div', 'player' + character.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = character.hp + '%';

    $name.innerText = character.name;

    $img.src = character.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subzero));

function changeHP(num = 20) {
    if (this.hp <= 0) {
        this.hp = 0;
    } else {
        this.hp -= num;
    }
}

function elHP() {
    const $el = document.querySelector('.player' + this.player + ' .life');
    return $el;
};

function renderHP() {
    this.elHP().style.width = this.hp + '%';
};

function getRandom(num) {
    return Math.ceil(Math.random() * num);
};

const playerWins = (name) => {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }

    return $winTitle;
};

$randomButton.addEventListener('click', () => {
    scorpion.changeHP(40);
    scorpion.elHP();
    scorpion.renderHP();
    subzero.changeHP(10);
    subzero.elHP();
    subzero.renderHP();


    if (scorpion.hp === 0 || subzero.hp === 0) {
        $randomButton.disabled = true;
    }

    if (scorpion.hp === 0 && scorpion.hp < subzero.hp) {
        $arenas.appendChild(playerWins(subzero.name));
    } else if (subzero.hp === 0 && subzero.hp < scorpion.hp){
        $arenas.appendChild(playerWins(scorpion.name));
    } else if (scorpion.hp <= 0 && subzero.hp <= 0) {
        $arenas.appendChild(playerWins()); 
    }
});

// $arenas.appendChild(createPlayer(scorpion));
// $arenas.appendChild(createPlayer(subzero));