const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat')
const $button = document.querySelector('.button')

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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
generateLogs('start',  scorpion, subzero);

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

function playerAttack() {
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

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence =  ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence, 
    }
};

function showResult() {
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

function generateLogs(type, player1, player2, damage) {
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
    }
    $chat.insertAdjacentHTML('afterbegin', text);
};

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
   
    if (player.defence !== enemy.hit) {
        scorpion.changeHP(enemy.value);
        scorpion.renderHP();
        generateLogs('hit', subzero, scorpion, enemy.value);
    } else {
        generateLogs('defence', subzero, scorpion);
    }

    if (enemy.defence !== player.hit) {
        subzero.changeHP(player.value);
        subzero.renderHP();
        generateLogs('hit', scorpion, subzero, player.value);
    } else {
        generateLogs('defence', scorpion, subzero);
    }
    
    showResult();
});



