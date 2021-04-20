import { HIT, ATTACK, scorpion, subzero, logs  } from './objects.js';
import { getRandom } from './utils.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');
export const $button = document.querySelector('.button');

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
};

export const createPlayer = (character) => {
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
};

export const createReloadButton = () => {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('div', 'button');

    $reloadButton.innerText = 'Reload';

    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

export const playerWins = (name) => {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }

    return $winTitle;
};

export const playerAttack = () => {
    const attack = {};

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

    return attack;
};

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence =  ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence, 
    }
};

export const showResult = () => {
    if (scorpion.hp <= 0 || subzero.hp <= 0) {
        $button.disabled = true;
        createReloadButton();
    }

    if (scorpion.hp === 0 && scorpion.hp < subzero.hp) {
        generateLogs('end',  subzero, scorpion);
        $arenas.appendChild(playerWins(subzero.name));
    } else if (subzero.hp === 0 && subzero.hp < scorpion.hp){
        generateLogs('end',  scorpion, subzero);
        $arenas.appendChild(playerWins(scorpion.name));
    } else if (scorpion.hp <= 0 && subzero.hp <= 0) {
        generateLogs('draw');
        $arenas.appendChild(playerWins());
    }
};

export function generateLogs(type, player1, player2, damage) {
    let text = '';
    const date = new Date();
    const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    switch (type) {
        case 'start':
            text = logs[type]
                .replace('[time]', currentTime)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            break;
        case 'hit':
            text = logs[type][getRandom(type.length - 1)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            text = `<p>${currentTime} ${text} Нанесено ${damage} урона. ${player2.hp}/100</p>`;
            break;
        case 'defence':
            text = logs[type][getRandom(type.length - 1)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            text = `<p>${currentTime} ${text}</p>`;
            break;
        case 'end':
            text = logs[type][getRandom(type.length - 1)]
            .replace('[playerWins]', player1.name)
            .replace('[playerLose]', player2.name);
            text = `<p>${currentTime} ${text}</p>`;
            break;
        case 'draw':
            text = logs[type];
            break;
        default:
            alert( "Нет таких значений" );
    }
    $chat.insertAdjacentHTML('afterbegin', text);
};