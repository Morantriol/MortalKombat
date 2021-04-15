const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const scorpion = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [],
    attack: function () {
        console.log(`${this.name} Fight...`);
    },
    changeHP,
    elHP,
    renderHP
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
    changeHP,
    elHP,
    renderHP
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

function changeHP(num) {
    this.hp -= num;
    if (this.hp <= 0) {
        this.hp = 0;
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

function createReloadButton() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('div', 'button');

    $reloadButton.innerText = 'Reload';

    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

const playerWins = (name) => {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }

    return $winTitle;
};

// $randomButton.addEventListener('click', () => {
//     scorpion.changeHP(getRandom(20));
//     scorpion.renderHP();
//     subzero.changeHP(getRandom(20));
//     subzero.renderHP();


//     if (scorpion.hp === 0 || subzero.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }

//     if (scorpion.hp === 0 && scorpion.hp < subzero.hp) {
//         $arenas.appendChild(playerWins(subzero.name));
//     } else if (subzero.hp === 0 && subzero.hp < scorpion.hp){
//         $arenas.appendChild(playerWins(scorpion.name));
//     } else if (scorpion.hp <= 0 && subzero.hp <= 0) {
//         $arenas.appendChild(playerWins()); 
//     }
// });

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence =  ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence, 
    }
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    if (scorpion.hp <= 0 || subzero.hp <= 0) {
        // $randomButton.disabled = true;
        // $reloadButton.disabled = true;
        createReloadButton();
    }
    
    if (scorpion.hp === 0 && scorpion.hp < subzero.hp) {
        $arenas.appendChild(playerWins(subzero.name));
    } else if (subzero.hp === 0 && subzero.hp < scorpion.hp){
        $arenas.appendChild(playerWins(scorpion.name));
    } else if (scorpion.hp <= 0 && subzero.hp <= 0) {
        $arenas.appendChild(playerWins());
    }
    
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        // item.checked = false;
    }

    if (attack.hit !== enemy.defence) {
        // subzero.hp -= attack.value;
        subzero.changeHP(attack.value);
        subzero.renderHP();
    } else if (enemy.hit !== attack.defence) {
        // scorpion.hp -= enemy.value;
        scorpion.changeHP(enemy.value);
        scorpion.renderHP();
    }

    // console.log(scorpion.hp);
    // console.log(subzero.hp);
    // console.log(attack.value);
    // console.log(enemy.value);
});



