/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "6pV+");
/******/ })
/************************************************************************/
/******/ ({

/***/ "6pV+":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/ivy!./src/app/sim/simulation-web-worker.worker.ts ***!
  \*********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_attack_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/attack-table */ "hivY");
/* harmony import */ var _shared_magic_school__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/magic-school */ "al+y");
/// <reference lib="webworker" />


let onGCD = { value: false, timeUpdated: 0 };
let lastAutoAttack = {
    player: 0,
    creature: 0
};
addEventListener('message', ({ data }) => {
    const results = [];
    for (let i = 0; i < data.timeToRun; i += 10) {
        const result = {
            damageTaken: [],
            damageDone: []
        };
        if (onGCD.value === true && onGCD.timeUpdated + 1500 <= i) {
            onGCD.value = false;
            onGCD.timeUpdated = i;
        }
        const rollResult = playerAutoAttackCreature(data.character, data.creature, i);
        castAllAvailableAbilities(data.character, data.creature, i, data);
        data.registeredAbilities.playerAbiliities.forEach((ability) => {
            triggerPlayerAbility(rollResult, ability, data.character, data.creature, result, i);
        });
        const enemyRollResult = creatureAutoAttackPlayer(data.creature, data.character, i);
        data.registeredAbilities.bossAbilities.forEach((ability) => {
            triggerBossAbility(enemyRollResult, ability, data.creature, data.character, result, i);
        });
        data.registeredAbilities.reactiveAbilities.forEach((ability) => {
            triggerReactivePlayerAbility(enemyRollResult, ability, data.creature, data.character, result, i);
        });
        results.push(result);
    }
    postMessage(results);
});
function castAllAvailableAbilities(character, creature, i, data) {
    for (let spellName of data.spellPriority) {
        const ability = data.registeredAbilities.playerAbiliities.find((ability) => ability.name === spellName);
        if (ability.onGCD && onGCD.value) {
            // DO NOTHING
        }
        else {
            const triggerGCD = ability.onCast(character, creature, i);
            if (triggerGCD) {
                onGCD = { value: true, timeUpdated: i };
            }
        }
    }
}
function triggerReactivePlayerAbility(rollResult, ability, attacker, defender, result, timeElapsed) {
    if (rollResult) {
        const onHitEffect = ability.onReactive(rollResult, attacker, defender, timeElapsed);
        if (onHitEffect) {
            modifyDamage(defender, onHitEffect);
            result.damageDone.push(onHitEffect);
        }
    }
}
function triggerPlayerAbility(rollResult, ability, attacker, defender, result, timeElapsed) {
    if (rollResult) {
        const onHitEffect = ability.onHit(rollResult, attacker, defender, timeElapsed);
        if (onHitEffect) {
            modifyDamage(attacker, onHitEffect);
            result.damageDone.push(onHitEffect);
        }
    }
    const onCheckEffect = ability.onCheck(attacker, defender, timeElapsed);
    if (onCheckEffect) {
        modifyDamage(attacker, onCheckEffect);
        result.damageDone.push(onCheckEffect);
    }
}
function triggerBossAbility(rollResult, ability, attacker, defender, result, timeElapsed) {
    if (rollResult) {
        const onHitEffect = ability.onHit(rollResult, attacker, defender);
        onHitEffect ? result.damageTaken.push(onHitEffect) : null;
    }
    const onCheckEffect = ability.onCheck(attacker, defender, timeElapsed);
    onCheckEffect ? result.damageTaken.push(onCheckEffect) : null;
}
function playerAutoAttackCreature(character, creature, timeElapsed) {
    const weaponSpeed = character.attackSpeed;
    if (shouldAttack(weaponSpeed, timeElapsed, lastAutoAttack.player, 'player')) {
        const rollResult = attackRoll(character.attackTable);
        lastAutoAttack.player = timeElapsed;
        return rollResult;
    }
    else {
        return false;
    }
}
function creatureAutoAttackPlayer(creature, character, timeElapsed) {
    const weaponSpeed = creature.attackSpeed;
    if (shouldAttack(weaponSpeed, timeElapsed, lastAutoAttack.creature, 'creature')) {
        const attackTable = {
            miss: creature.AttackTable[_shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"].miss] + character.missChance,
            dodge: creature.AttackTable[_shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"].dodge] + character.dodgeChance,
            parry: creature.AttackTable[_shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"].parry] + character.parry,
            glancing: 0,
            block: creature.AttackTable[_shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"].block] + character.blockChance + ((character.buffs['Holy Shield'] && character.buffs['Holy Shield'].charges > 0) ? 30 : 0),
            crit: creature.AttackTable[_shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"].crit] - character.critReduction,
            crushing: creature.AttackTable[_shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"].crushing],
            hit: 0
        };
        const rollResult = attackRoll(attackTable);
        lastAutoAttack.creature = timeElapsed;
        return rollResult;
    }
    else {
        return false;
    }
}
function attackRoll(attackTable) {
    let roll = Math.random() * 100;
    for (let attackOutcome of Object.keys(attackTable)) {
        const rollRange = attackTable[attackOutcome];
        if (roll <= rollRange) {
            return _shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"][attackOutcome];
        }
        else {
            roll -= rollRange;
        }
    }
    ;
    return _shared_attack_table__WEBPACK_IMPORTED_MODULE_0__["AttackTableEnum"].hit;
}
function shouldAttack(attackSpeed, timeElapsed, lastAttackTime, attacker) {
    const attack = (lastAttackTime + (attackSpeed * 1000) <= timeElapsed);
    if (attack) {
        if (attacker === 'player') {
            lastAutoAttack.player = timeElapsed;
        }
        else {
            lastAutoAttack.creature = timeElapsed;
        }
    }
    return attack;
}
function modifyDamage(character, damage) {
    if (damage.damageType === _shared_magic_school__WEBPACK_IMPORTED_MODULE_1__["DamageType"].holy) {
        if (character.buffs['Sanctity Aura'] || character.buffs['Improved Sanctity Aura']) {
            damage.damageAmount = damage.damageAmount * 1.10;
        }
    }
    if (character.buffs['Improved Sanctity Aura']) {
        damage.damageAmount = damage.damageAmount * 1.02;
    }
    if (character.spec.talents.oneHandedSpec > 0) {
        damage.damageAmount = damage.damageAmount * (1 + (character.spec.talents.oneHandedSpec / 100));
    }
    if (character.spec.talents.crusade > 0) {
        damage.damageAmount = damage.damageAmount * (1 + (character.spec.talents.crusade / 100));
    }
    damage.damageAmount = Math.round(damage.damageAmount);
}


/***/ }),

/***/ "al+y":
/*!****************************************!*\
  !*** ./src/app/shared/magic-school.ts ***!
  \****************************************/
/*! exports provided: DamageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DamageType", function() { return DamageType; });
var DamageType;
(function (DamageType) {
    DamageType["holy"] = "holy";
    DamageType["shadow"] = "shadow";
    DamageType["fire"] = "fire";
    DamageType["arcane"] = "arcane";
    DamageType["physical"] = "physical";
})(DamageType || (DamageType = {}));


/***/ }),

/***/ "hivY":
/*!****************************************!*\
  !*** ./src/app/shared/attack-table.ts ***!
  \****************************************/
/*! exports provided: AttackTableEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttackTableEnum", function() { return AttackTableEnum; });
var AttackTableEnum;
(function (AttackTableEnum) {
    AttackTableEnum["miss"] = "miss";
    AttackTableEnum["dodge"] = "dodge";
    AttackTableEnum["parry"] = "parry";
    AttackTableEnum["glancing"] = "glancing";
    AttackTableEnum["block"] = "block";
    AttackTableEnum["crit"] = "crit";
    AttackTableEnum["crushing"] = "crushing";
    AttackTableEnum["hit"] = "hit";
})(AttackTableEnum || (AttackTableEnum = {}));


/***/ })

/******/ });
//# sourceMappingURL=0.worker.js.map