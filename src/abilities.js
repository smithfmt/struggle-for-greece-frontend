import { cityCards, atkNav, delphiEvents, modifiers } from "./data";

export const calculateStats = (card) => {
    switch (card.name) {
        case "Achilles":
            if (card.hp < 9) {
                card.atk = card.baseAtk + 9-card.hp;
            };
            break;
        case "Neoptolemus":
            if (card.attacked) {
                card.atk = card.baseAtk*(2*card.attacked);
            };
            break;
        default: break;
    };
    return card;
};

export const calculateDamage = ([attackedCard, attackingCard]) => {
    let attackingDmg = (attackedCard.modAtk*(attackedCard.returnDmgMp || 1)) - (attackingCard.dmgRed || 0);
    let attackedDmg = attackingCard.modAtk - (attackedCard.dmgRed || 0);

    if (attackedCard.name==="Bellerophon" && attackingCard.type==="monster") {
        attackedDmg = 0;
    } else if (attackingCard.name==="Bellerophon" && attackedCard.type==="monster") {
        attackingDmg = 0;
    };

    if (attackedCard.name==="Diomedes" && attackingCard.id!=="Hero") {
        attackedDmg = attackingCard.modAtk -1;
    } else if (attackingCard.name==="Diomedes" && attackedCard.id!=="Hero") {
        attackingDmg = attackedCard.modAtk -1;
    };

    if (attackedCard.name==="Meleager" && attackedCard.modAtk>attackingCard.modAtk) {
        attackedDmg = attackingCard.modAtk -1;
    } else if (attackingCard.name==="Meleager" && attackingCard.modAtk>attackedCard.modAtk) {
        attackingDmg = attackedCard.modAtk -1;
    };

    if (attackingCard.archer) {
        attackingDmg = 0;
    };

    attackingCard.hp = attackingCard.hp - attackingDmg;
    attackedCard.hp = attackedCard.hp - attackedDmg;
    attackingCard.modHp = attackingCard.modHp - attackingDmg;
    attackedCard.modHp = attackedCard.modHp - attackedDmg;
    return [attackedCard, attackingCard];
};

export const castAbility = (game, ability, selectedCard) => {
    const cardSlot = Object.keys(game.cards).filter(c => game.cards[c].name===selectedCard.name)[0];
    const battlefield = `${cardSlot.split("-")[0]}-${cardSlot.split("-")[1]}`;
    const nums = [1,2,3,4,5,6];
    switch (ability) {
        case "hippolytus":
            let placed = false;
            nums.forEach(num => {
                if (!game.cards[`${battlefield}-s${num}`] && !placed) {
                    game.cards[`${battlefield}-s${num}`] = JSON.parse(JSON.stringify(cityCards.wildBoarBeast));
                    game.cards[`${battlefield}-s${num}`].type = selectedCard.type;
                    placed=true;
                };
            });
            game.cards[cardSlot].cooldown = 3;
            break;
        case "hippolyta":
            placed = false;
            nums.forEach(num => {
                if (!game.cards[`${battlefield}-s${num}`] && !placed) {
                    game.cards[`${battlefield}-s${num}`] = JSON.parse(JSON.stringify(cityCards.wildBoarBeast));
                    game.cards[`${battlefield}-s${num}`].type = selectedCard.type;
                    placed=true;
                };
            });
            game.cards[cardSlot].cooldown = 3;
            break;
        case "orpheus":
            nums.forEach(num => {
                const card = game.cards[`${battlefield}-s${num}`];
                if (card && card.hp<card.baseHp) {
                    card.hp = card.hp+1;
                };
            });
            game.cards[cardSlot].cooldown = 3;
            break;
        case "perseus":
            const effectedFields = atkNav[battlefield];
            nums.forEach(num => {
                effectedFields.forEach(bf => {
                    const card = game.cards[`${bf}-s${num}`];
                    if (card) {
                        card.hp = card.hp-1;
                        if (card.hp===0) {
                            game.cards[`${bf}-s${num}`]=null;
                        };
                    };
                });
            });
            game.cards[cardSlot].cooldown = 5;
            break;
        case "clytemnestra":
            if (game.teams[selectedCard.type].money>0){
                game.teams[selectedCard.type].money = game.teams[selectedCard.type].money-1;
                game.cards[cardSlot].atk++;
            };
            break;
        case "pandora":
            const teamList = Object.keys(game.teams);
            const team = teamList[Math.floor(Math.random()*teamList.length)];
            const events = ["drought", "famine", "fire", "volcano", "storm"];
            const eventName = events[Math.floor(Math.random()*events.length)];
            const event = JSON.parse(JSON.stringify(delphiEvents[eventName]));
            const modifier = modifiers[event.modifier];
            game.teams[team].modifiers[modifier.type][modifier.resource][modifier.extent][modifier.effect.name] = modifier.effect.mod;
            const tm = game.teams[team];
            const moneyMultiplier = Object.values(tm.modifiers.income.money.multipliers).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
            const foodMultiplier = Object.values(tm.modifiers.income.food.multipliers).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
            const bothMultiplier = Object.values(tm.modifiers.income.both.multipliers).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
            const moneyBonuses = Object.values(tm.modifiers.income.money.bonuses).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
            const foodBonuses = Object.values(tm.modifiers.income.food.bonuses).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
            const bothBonuses = Object.values(tm.modifiers.income.both.bonuses).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
            game.teams[team].moneyIncome = Math.floor(game.gamespeed * ((tm.citizens.mine * ((moneyMultiplier || 1) * (bothMultiplier || 1))) + moneyBonuses + bothBonuses));
            game.teams[team].foodIncome = Math.floor(game.gamespeed * ((tm.citizens.farm * ((foodMultiplier || 1) * (bothMultiplier || 1))) + foodBonuses + bothBonuses));
            game.cards[cardSlot].cooldown = 5;
            break;
        case "minos":
            nums.forEach(num => {
                if (!game.cards[`${selectedCard.type}City-t1-s${num}`]) {
                    if (game.cards[cardSlot].guards.soldier>0) {
                        console.log("soldier")
                        game.cards[`${selectedCard.type}City-t1-s${num}`] = JSON.parse(JSON.stringify(cityCards[`${selectedCard.type}Soldier`]));
                        game.cards[cardSlot].guards.soldier=game.cards[cardSlot].guards.soldier-1;
                        game.cards[`${selectedCard.type}City-t1-s${num}`].type = selectedCard.type;
                    } else if (game.cards[cardSlot].guards.archer>0) {
                        console.log("archer")
                        game.cards[`${selectedCard.type}City-t1-s${num}`] = JSON.parse(JSON.stringify(cityCards[`${selectedCard.type}Archer`]));
                        game.cards[cardSlot].guards.archer=game.cards[cardSlot].guards.archer-1;
                        game.cards[`${selectedCard.type}City-t1-s${num}`].type = selectedCard.type;
                    } else if (game.cards[cardSlot].guards.horseman>0) {
                        console.log("horseman")
                        game.cards[`${selectedCard.type}City-t1-s${num}`] = JSON.parse(JSON.stringify(cityCards[`${selectedCard.type}Horseman`]));
                        game.cards[cardSlot].guards.horseman=game.cards[cardSlot].guards.horseman-1;
                        game.cards[`${selectedCard.type}City-t1-s${num}`].type = selectedCard.type;
                    };
                };
            });
            if (game.cards[cardSlot].guards.soldier===0 && game.cards[cardSlot].guards.archer===0 && game.cards[cardSlot].guards.horseman===0) {
                game.cards[cardSlot].ability=null;
            };
            break;
        default: break;
    };
    if (game.cards[cardSlot].name !== "Clytemnestra") {
        game.cards[cardSlot].cast = true;
    };
    return game;
};

export const castTargetAbility = (game, selectedCard, canTarget, castSlot) => {
    const cardSlot = Object.keys(game.cards).filter(c => game.cards[c].name===selectedCard.name)[0];
    //const team = game.teams[selectedCard.type];
    const castCard = game.cards[castSlot];
    //const battlefield = `${cardSlot.split("-")[0]}-${cardSlot.split("-")[1]}`;
    //const nums = [1,2,3,4,5,6];
    switch (canTarget) {
        case "hecuba":
            game.teams[selectedCard.type].money = game.teams[selectedCard.type].money-1;
            if (castCard.hp<castCard.baseHp) {
                castCard.hp = castCard.hp+1;
            };
            break;
        case "semele":
            game.teams[selectedCard.type].food = game.teams[selectedCard.type].food-1;
            if (castCard.hp<castCard.baseHp) {
                castCard.hp = castCard.hp+1;
            };
            break;
        case "ariadne":
            game.teams[selectedCard.type].food = game.teams[selectedCard.type].food-1;
            if (castCard.hp<castCard.baseHp) {
                castCard.hp = castCard.hp+1;
            };
            break;
        case "penelope":
            game.teams[selectedCard.type].food = game.teams[selectedCard.type].food-1;
            if (castCard.hp<castCard.baseHp) {
                castCard.hp = castCard.hp+1;
            };
            break;
        case "medea":
            castCard.hp = castCard.hp-2;
            castCard.atk = castCard.atk-2;
            if (castCard.atk<0) {
                castCard.atk=0;
            };
            if (castCard.modHp<3) {
                game.cards[castSlot]=null;
            };
            game.cards[cardSlot].cooldown = 5;
            break;
        default:
            break;
    };
    game.cards[cardSlot].cast = true;
    return game;
};

export const canCastAbility = (game, selectedCard, ability) => {
    const cardSlot = Object.keys(game.cards).filter(c => game.cards[c].name===selectedCard.name)[0];
    const battlefield = `${cardSlot.split("-")[0]}-${cardSlot.split("-")[1]}`;
    const teamTargets = ["semele", "hecuba", "ariadne", "penelope", "daedalus", "patroclus"];
    const enemyTargets = ["medea"];
    const eventTargets = ["oedipus", "tiresias", "cassandra"];
    let canCast = [];
    if (teamTargets.includes(ability)) {
        canCast = battlefield;
    } else if (enemyTargets.includes(ability)) {
        canCast = atkNav[battlefield];
    } else if (eventTargets.includes(ability)) {
        canCast = ["events"];
    };
    return canCast;
};

export const castAbilityOnEvent = (game, selectedCard, ability, event) => {
    const cardSlot = Object.keys(game.cards).filter(c => game.cards[c].name===selectedCard.name)[0];
    const modifiers = game.teams[selectedCard.type].modifiers;
    
    switch (ability) {
        case "oedipus":
            Object.keys(modifiers.income).forEach(key => {
                Object.keys(modifiers.income[key]).forEach(k => {
                    Object.keys(modifiers.income[key][k]).forEach(eff => {
                        if (eff===event) {
                            modifiers.income[key][k][eff]=null;
                        };
                    });
                });
            });
            game.cards[cardSlot].hp=game.cards[cardSlot].hp-2;
            break;
        case "tiresias":
            Object.keys(modifiers.income).forEach(key => {
                Object.keys(modifiers.income[key]).forEach(k => {
                    Object.keys(modifiers.income[key][k]).forEach(eff => {
                        if (eff===event) {
                            modifiers.income[key][k][eff]=null;
                        };
                    });
                });
            });
            game.cards[cardSlot] = null;
            break;
        case "cassandra":
            Object.keys(modifiers.income).forEach(key => {
                Object.keys(modifiers.income[key]).forEach(k => {
                    Object.keys(modifiers.income[key][k]).forEach(eff => {
                        if (eff===event) {
                            modifiers.income[key][k][eff]=null;
                        };
                    });
                });
            });
            const newEvents = game.delphiEvents.slice(game.delphiEvents.length-2);
            game.delphiEvents = game.delphiEvents.splice(0,game.delphiEvents.length-2);
            game.delphiEvents = [...newEvents,...game.delphiEvents];
            game.cards[cardSlot].cooldown = 3;
            break;
        default:
            break;
    };
    game.cards[cardSlot].cast = true;
    if (game.cards[cardSlot].modHp<1) {
        game.cards[cardSlot]=null;
    };
    return game;
};

export const moveAbilityModifier = (card, game, cardSlot) => {
    const modifier = modifiers[card.slotModifier];
    let moveTo;
    switch (modifier.effects) {
        case "allies" :
            moveTo = cardSlot.split("-s")[0];
            break;
        case "neighbours" :
            const length = cardSlot.length-1;
            const pos = parseInt(cardSlot[length]);
            const biggerSlot = `${cardSlot.substring(0, length)}${pos+1}`;
            const smallerSlot = `${cardSlot.substring(0, length)}${pos-1}`;
            if (pos!==6||1) {
                moveTo = [biggerSlot, smallerSlot];
            } else if (pos===1) {
                moveTo = [biggerSlot]
            } else if (pos===6) {
                moveTo = [smallerSlot]
            };
            break;
        default:
            break;
    };
    game.teams[card.type].modifiers.position[modifier.extent][card.slotModifier][modifier.extent] = moveTo;
    return game;
};

export const calculateIncome = (game, tm) => {
    const team = game.teams[tm];
    const moneyMultiplier = Object.values(team.modifiers.income.money.multipliers).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
    const foodMultiplier = Object.values(team.modifiers.income.food.multipliers).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
    const bothMultiplier = Object.values(team.modifiers.income.both.multipliers).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
    const moneyBonuses = Object.values(team.modifiers.income.money.bonuses).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
    const foodBonuses = Object.values(team.modifiers.income.food.bonuses).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
    const bothBonuses = Object.values(team.modifiers.income.both.bonuses).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
    game.teams[tm].moneyIncome = Math.floor(game.gamespeed * ((team.citizens.mine * ((moneyMultiplier || 1) * (bothMultiplier || 1))) + moneyBonuses + bothBonuses));
    game.teams[tm].foodIncome = Math.floor(game.gamespeed * ((team.citizens.farm * ((foodMultiplier || 1) * (bothMultiplier || 1))) + foodBonuses + bothBonuses));
    return game;
};

export const lowerDuration = (game, tm) => {
    const modifiers = game.teams[tm].modifiers;
    if (!modifiers || !modifiers.income || !modifiers.income.both.bonuses) return;
    Object.keys(modifiers.income).forEach(key => {
        Object.keys(modifiers.income[key]).forEach(k => {
            Object.keys(modifiers.income[key][k]).forEach(eff => {
                const effect = modifiers.income[key][k][eff];
                if (effect.duration) {
                    effect.duration = effect.duration-1;
                    if (effect.duration<1) modifiers.income[key][k][eff] = null;
                };
            });
        });
    });
    return game;
};

export const removeCard = (game, c, killer) => {
    const card = game.cards[c];
    if (card.slotModifier) {
        const modifier = modifiers[card.slotModifier];
        game.teams[card.type].modifiers.position[modifier.extent][card.slotModifier] = null;
    };
    if (card.onPlace) {
        const modEffect = modifiers[card.onPlace];
        if (modEffect.type === "income") {
            game.teams[card.type].modifiers[modEffect.type][modEffect.resource][modEffect.extent][modEffect.effect.name] = null;
            game = calculateIncome(game, card.type);
        };
        if (modEffect.type === "discount") {
            game.teams[card.type].modifiers[modEffect.type][modEffect.discounts][modEffect.extent][modEffect.effect.name] = null;
        };
    };
    const nums = [1,2,3,4,5,6];
    let placed = false;
    switch (card.name) {
        case "Pericles":
            const { athens } = game.teams;
            athens.level = athens.level-1;
                if (athens.citizens.number>athens.level+1) {
                    athens.citizens.number = athens.level+1;
                    if (athens.citizens.mine+athens.citizens.farm>athens.level+1) {
                        athens.citizens.mine=athens.level+1-athens.citizens.farm;
                    };
                };
                athens.pericles=false; 
            break;
        case "Alcibiades":
                    nums.forEach(num => {
                        if (placed) return;
                        if (!game.cards[`${killer}City-t1-s${num}`]) {
                            game.cards[`${killer}City-t1-s${num}`] = cityCards.athensHero3;
                            game.cards[`${killer}City-t1-s${num}`].type = killer;
                            placed=true;
                        } else return;
                    });
            break;
        case "Aeneas":
            if (card.divineFavour) {
                nums.forEach(num => {
                    if (placed) return;
                    if (!game.cards[`troyCity-t1-s${num}`]) {
                        game.cards[`troyCity-t1-s${num}`] = cityCards.troyHero3;
                        game.cards[`troyCity-t1-s${num}`].divineFavour=false;
                        placed=true;
                    } else return;
                });
            };
            break;
        default:
            break;
    };
    game.cards[c] = null;
    return game;
};