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
    }
};

const subzero = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [],
    attack: function () {
        console.log(`${this.name} Fight...`)
    }
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

// const changeHP = (player) => {
//     const $playerLife = document.querySelector('.player' + player.player + ' .life');
//     player.hp -= Math.ceil(Math.random() * 20);
//     $playerLife.style.width = player.hp + '%';

//     if (scorpion.hp <= 0 && subzero.hp <= 0) {
//         $randomButton.disabled = true;
//         $arenas.appendChild(playerDraw());
//         return;
//     } else if (scorpion.hp > subzero.hp && subzero.hp <= 0) {
//         $playerLife.style.width = 0;
//         $randomButton.disabled = true;
//         $arenas.appendChild(playerWin(scorpion.name));
//         return;
//     } else if (scorpion.hp < subzero.hp && scorpion.hp <= 0) {
//         $playerLife.style.width = 0;
//         $randomButton.disabled = true;
//         $arenas.appendChild(playerWin(subzero.name));
//         return;
//     }

    // if (player.hp <= 0) {
    //     $playerLife.style.width = 0;
    //     $arenas.appendChild(playerWin(player.name))
    //     $randomButton.disabled = true;
    // }
// }

const changeHP = (character1, character2) => {
    const $character1Life = createLifeBar(character1);
    const $character2Life = createLifeBar(character2);
    character1.hp -= Math.ceil(Math.random() * 20);
    character2.hp -= Math.ceil(Math.random() * 20);
    $character1Life.style.width = character1.hp + '%';
    $character2Life.style.width = character2.hp + '%';

    if (character1.hp <= 0 && character2.hp <= 0) {
        $character1Life.style.width = 0;
        $character2Life.style.width = 0;
        $randomButton.disabled = true;
        $arenas.appendChild(playerDraw());
    } else if (character1.hp > character2.hp && character2.hp <= 0) {
        $character2Life.style.width = 0;
        $randomButton.disabled = true;
        $arenas.appendChild(playerWin(character1.name));
    } else if (character2.hp > character1.hp && character1.hp <= 0) {
        $character1Life.style.width = 0;
        $randomButton.disabled = true;
        $arenas.appendChild(playerWin(character2.name));
    }
}

const playerWin = (name) => {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' wins';

    return $winTitle;
};

const playerDraw = () => {
    const $drawTitle = createElement('div', 'drawTitle');
    $drawTitle.innerText = 'draw';
    
    return $drawTitle;
};

const createLifeBar = (character) => {
    const $characterLife = document.querySelector('.player' + character.player + ' .life');

    return $characterLife;
}

// const restartGame = (character1, character2) => {
//     character1.hp = 100;
//     character2.hp = 100;
//     const $character1Life = createLifeBar(character1);
//     const $character2Life = createLifeBar(character2);
//     $character1Life.style.width = character1.hp + '%';
//     $character2Life.style.width = character2.hp + '%';
//     console.log(222);
// }

$randomButton.addEventListener('click', () => {
    // changeHP(scorpion);
    // changeHP(subzero); 
    changeHP(scorpion, subzero);
    // changeHP(subzero, scorpion);
});

// $restartButton.addEventListener('click', () => {
//     restartGame(scorpion, subzero);
//     console.log(111);
// })

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subzero));