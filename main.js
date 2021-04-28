import Game from './Game/index.js';

const game = new Game();

game.start();


// import { getRandom, createElement } from './utils/index.js';
// import { HIT, ATTACK, LOGS } from './constants/index.js';
// import Player from './Player/index.js';

// const $arenas = document.querySelector('.arenas');
// const $formFight = document.querySelector('.control');
// const $chat = document.querySelector('.chat');
// const $button = document.querySelector('.button');

// const scorpion = new Player({
//     player: 1,
//     name: 'SCORPION',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
//     rootSelector: 'arenas',
// });

// const subzero = new Player({
//     player: 2,
//     name: 'SUB-ZERO',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
//     rootSelector: 'arenas',
// });

// const playerWins = (name) => {
//     const $winTitle = createElement('div', 'winTitle');
//     if (name) {
//         $winTitle.innerText = name + ' wins';
//     } else {
//         $winTitle.innerText = 'draw';
//     }

//     return $winTitle;
// };

// const createReloadButton = () => {
//     const $reloadButtonDiv = createElement('div', 'reloadWrap');
//     const $reloadButton = createElement('div', 'button');

//     $reloadButton.innerText = 'Reload';

//     $reloadButton.addEventListener('click', function() {
//         window.location.reload();
//     });

//     $reloadButtonDiv.appendChild($reloadButton);
//     $arenas.appendChild($reloadButtonDiv);
// };

// const enemyAttack = () => {
//     const hit = ATTACK[getRandom(3) - 1];
//     const defence =  ATTACK[getRandom(3) - 1];

//     return {
//         value: getRandom(HIT[hit]),
//         hit,
//         defence, 
//     }
// };

// const showResult = () => {
//     if (scorpion.hp <= 0 || subzero.hp <= 0) {
//         $button.disabled = true;
//         createReloadButton();
//     }

//     if (scorpion.hp === 0 && scorpion.hp < subzero.hp) {
//         generateLogs('end',  subzero, scorpion);
//         $arenas.appendChild(playerWins(subzero.name));
//     } else if (subzero.hp === 0 && subzero.hp < scorpion.hp){
//         generateLogs('end',  scorpion, subzero);
//         $arenas.appendChild(playerWins(scorpion.name));
//     } else if (scorpion.hp <= 0 && subzero.hp <= 0) {
//         generateLogs('draw');
//         $arenas.appendChild(playerWins());
//     }
// };

// const playerAttack = () => {
//     const attack = {};

//     for (let item of $formFight) {
//         if (item.checked && item.name === 'hit') {
//             attack.value = getRandom(HIT[item.value]);
//             attack.hit = item.value;
//         }

//         if (item.checked && item.name === 'defence') {
//             attack.defence = item.value;
//         }
//         // item.checked = false;
//     }

//     return attack;
// };

// function generateLogs(type, player1, player2, damage) {
//     let text = '';
//     const date = new Date();
//     const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

//     switch (type) {
//         case 'start':
//             text = LOGS[type]
//                 .replace('[time]', currentTime)
//                 .replace('[player1]', player1.name)
//                 .replace('[player2]', player2.name);
//             break;
//         case 'hit':
//             text = LOGS[type][getRandom(type.length - 1)]
//                 .replace('[playerKick]', player1.name)
//                 .replace('[playerDefence]', player2.name);
//             text = `<p>${currentTime} ${text} Нанесено ${damage} урона. ${player2.hp}/100</p>`;
//             break;
//         case 'defence':
//             text = LOGS[type][getRandom(type.length - 1)]
//                 .replace('[playerKick]', player1.name)
//                 .replace('[playerDefence]', player2.name);
//             text = `<p>${currentTime} ${text}</p>`;
//             break;
//         case 'end':
//             text = LOGS[type][getRandom(type.length - 1)]
//             .replace('[playerWins]', player1.name)
//             .replace('[playerLose]', player2.name);
//             text = `<p>${currentTime} ${text}</p>`;
//             break;
//         case 'draw':
//             text = LOGS[type];
//             break;
//         default:
//             alert( "Нет таких значений" );
//             break;
//     }
//     $chat.insertAdjacentHTML('afterbegin', text);
// };



// $formFight.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const enemy = enemyAttack();
//     const player = playerAttack();
   
//     if (player.defence !== enemy.hit) {
//         scorpion.changeHP(enemy.value);
//         scorpion.renderHP();
//         generateLogs('hit', subzero, scorpion, enemy.value);
//     } else {
//         generateLogs('defence', subzero, scorpion);
//     }

//     if (enemy.defence !== player.hit) {
//         subzero.changeHP(player.value);
//         subzero.renderHP();
//         generateLogs('hit', scorpion, subzero, player.value);
//     } else {
//         generateLogs('defence', scorpion, subzero);
//     }
    
//     showResult();
// });

// function init() {
//     scorpion.createPlayer();
//     subzero.createPlayer();

//     generateLogs('start',  scorpion, subzero);
// };

// init();




