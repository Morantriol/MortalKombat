import { scorpion, subzero } from './objects.js';
import { createPlayer, playerAttack, enemyAttack, $arenas,  $formFight,  showResult, generateLogs } from './actions.js';

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subzero));
generateLogs('start',  scorpion, subzero);

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



