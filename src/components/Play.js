import React from "react";
//import PropTypes from "prop-types";
import { TweenLite } from "gsap";
import { gsap, CSSPlugin } from "gsap/all";
import base from "../base";
import Board from "./Board";
import Hud from "./Hud";
import CardList from "./CardList";
import { shuffle } from "../helpers";
import { cityCards, delphiHeroes, nav, atkNav, delphiEvents, modifiers } from "../data";
import { calculateStats, calculateDamage, canCastAbility, castAbility, castTargetAbility, castAbilityOnEvent, moveAbilityModifier, removeCard, calculateIncome, lowerDuration } from "../abilities";
import PlayerInfo from "./PlayerInfo";
 
gsap.registerPlugin(CSSPlugin);

class Play extends React.Component {

    state = {
        game: {},
        movingCard: {},
        selectedCard: {},
        cardInfo: {},
        canMoveTo: ["nowhere"],
        canAttack: ["nowhere"],
        canCast: ["nowhere"],
        shopType: "",
        cardList: false,
        playerInfo: false,
    };

    componentDidMount() {
        this.getGame();
        this.ref = base.syncState(`open-games/${this.props.params.lobbyname}`, {
            context: this,
            state: "game"
        });
        window.addEventListener( "mousemove", this.handleMousemove, false );
        this.skipComTurns();
    };

    componentDidUpdate() {
        this.skipComTurns();
    };

    componentWillUnmount() {
        window.removeEventListener( "mousemove", this.handleMousemove, false );
        base.removeBinding(this.ref);
    };

    timer = null;
    edgeSize = 50;

	handleMousemove = ( event ) => {
			var viewportX = event.clientX;
			var viewportY = event.clientY;

			var viewportWidth = document.documentElement.clientWidth;
			var viewportHeight = document.documentElement.clientHeight;

			var edgeTop = this.edgeSize;
			var edgeLeft = this.edgeSize;
			var edgeBottom = ( viewportHeight - this.edgeSize );
			var edgeRight = ( viewportWidth - this.edgeSize );

			var isInLeftEdge = ( viewportX < edgeLeft );
			var isInRightEdge = ( viewportX > edgeRight );
			var isInTopEdge = ( viewportY < edgeTop );
			var isInBottomEdge = ( viewportY > edgeBottom );

			if ( ! ( isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge ) ) {

				clearTimeout(this.timer);
				return;
			}

			var documentWidth = Math.max(
				document.body.scrollWidth,
				document.body.offsetWidth,
				document.body.clientWidth,
				document.documentElement.scrollWidth,
				document.documentElement.offsetWidth,
				document.documentElement.clientWidth
			);
			var documentHeight = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.body.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight,
				document.documentElement.clientHeight
			);

			var maxScrollX = ( documentWidth - viewportWidth );
			var maxScrollY = ( documentHeight - viewportHeight );

			const checkForWindowScroll = () => {

				clearTimeout(this.timer);

				if ( adjustWindowScroll() ) {

					this.timer = setTimeout( checkForWindowScroll, 10 );

				}

			};
            

			const adjustWindowScroll = () => {

				var currentScrollX = window.pageXOffset;
				var currentScrollY = window.pageYOffset;

				var canScrollUp = ( currentScrollY > 0 );
				var canScrollDown = ( currentScrollY < maxScrollY );
				var canScrollLeft = ( currentScrollX > 0 );
				var canScrollRight = ( currentScrollX < maxScrollX );

				var nextScrollX = currentScrollX;
				var nextScrollY = currentScrollY;

				var maxStep = 20;
                let intensity;
				if ( isInLeftEdge && canScrollLeft ) {

					intensity = ( ( edgeLeft - viewportX ) / this.edgeSize );

					nextScrollX = ( nextScrollX - ( maxStep * intensity ) );

				} else if ( isInRightEdge && canScrollRight ) {

					intensity = ( ( viewportX - edgeRight ) / this.edgeSize );

					nextScrollX = ( nextScrollX + ( maxStep * intensity ) );

				}

				if ( isInTopEdge && canScrollUp ) {

					intensity = ( ( edgeTop - viewportY ) / this.edgeSize );

					nextScrollY = ( nextScrollY - ( maxStep * intensity ) );

				} else if ( isInBottomEdge && canScrollDown ) {

					intensity = ( ( viewportY - edgeBottom ) / this.edgeSize );

					nextScrollY = ( nextScrollY + ( maxStep * intensity ) );

				}

				nextScrollX = Math.max( 0, Math.min( maxScrollX, nextScrollX ) );
				nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );

				if (
					( nextScrollX !== currentScrollX ) ||
					( nextScrollY !== currentScrollY )
					) {

					window.scrollTo( nextScrollX, nextScrollY );
					return( true );

				} else {

					return( false );

				}

			}
            checkForWindowScroll();

	};

    skipComTurns = () => {
        const game = {...this.state.game};
        if (!game.teams) return;
        const ComPlayers = ["player 1", "player 2", "player 3"]
        if (ComPlayers.includes(game.teams[game.whoTurn].player)) {
            console.log("skipping", game.teams[game.whoTurn].player)
            this.endTurn();
        } else if (game.dead[game.whoTurn]) {
            console.log(game.whoTurn, " is dead")
            this.endTurn();
        };
    };
    openCardList = () => {
        const cardList = true;
        this.setState({ cardList });
    };
    closeCardList = () => {
        const cardList = false;
        this.setState({ cardList });
    };
    openPlayerInfo = () => {
        const playerInfo = true;
        this.setState({ playerInfo });
    };
    closePlayerInfo = () => {
        const playerInfo = false;
        this.setState({ playerInfo });
    };

    getGame = async () => {
        const game = await base.fetch(`open-lobbies/${this.props.params.lobbyname}`, { context: this });
        if (!game.slots) return;
        game.teams = {};
        game.teams.athens = {city: "Athens"};
        game.teams.sparta = {city: "Sparta"};
        game.teams.thebes = {city: "Thebes"};
        game.teams.troy = {city: "Troy"};
        const randomNum = max => {return Math.ceil(Math.random()*max)};
        if (game.city==="choice") {
            game.teams.athens.player = game.slots.p1.filled;
            game.teams.sparta.player = game.slots.p2.filled;
            game.teams.thebes.player = game.slots.p3.filled;
            game.teams.troy.player = game.slots.p4.filled;
        } else {
            const cities = ["athens", "sparta", "thebes", "troy"];
            let rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p1.filled
            cities.splice(rndInt, 1);
            rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p2.filled
            cities.splice(rndInt, 1);
            rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p3.filled
            cities.splice(rndInt, 1);
            rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p4.filled
            cities.splice(rndInt, 1);
        }
        Object.keys(game.teams).forEach(team => {
            game.teams[team].level = 1;
            game.teams[team].citizens = {
                number: 2,
                mine: 0,
                farm: 0
            };
            game.teams[team].buildings = {
                city: true,
                walls: false,
                barracks: false,
                archerRange: false,
                stables: false,
                workshop: false,
            };
            game.teams[team].money = 200;
            game.teams[team].moneyIncome = 0;
            game.teams[team].food = 200;
            game.teams[team].foodIncome = 0;
            game.teams[team].bought = {card: true};
            game.teams[team].modifiers = {
                income: {
                    food: {
                        multipliers: {
                            effect: {value: 0},
                        },
                        bonuses: {
                            effect: {value: 0},
                        }
                    },
                    money: {
                        multipliers: {
                            effect: {value: 0},
                        },
                        bonuses: {
                            effect: {value: 0},
                        }
                    },
                    both: {
                        multipliers: {
                            effect: {value: 0},
                        },
                        bonuses: {
                            effect: {value: 0},
                        }
                    }
                },
                discount: {
                    soldiers: {
                        int: {
                            effect: {value: 0}
                        }
                    },
                    buildings: {
                        int: {
                            effect: {value: 0}
                        },
                        multiplier: {
                            effect: {value: 0}
                        }
                    },
                    heroes: {
                        int: {
                            effect: {value: 0}
                        }
                    },
                    walls: {
                        int: {
                            effect: {value: 0}
                        }
                    },
                },
                attack: {
                    slot: {
                        effect: {
                            damageReduction: {
                                multiplier: 0,
                                int: 0,
                            },
                            returnDamage: {
                                multiplier: 0,
                                int: 0,
                            },
                        },
                    },
                },
                event: {
                    disaster: {
                        effect: {
                            multiplier: 0,
                        },
                    },
                },
                position: {
                    battlefield: {
                        effect: {
                            battlefield: "none",
                            atk: 0,
                            hp: 0,
                        },
                    },
                    slot: {
                        effect: {
                            slot: ["none"],
                            atk: 0,
                            hp: 0,
                        },
                    },
                },
            };
        });
        const cities = ["athens", "sparta", "thebes", "troy"];
        const rndInt = randomNum(4)-1;
        game.whoTurn = cities[rndInt];
        game.order = [...cities.slice(rndInt), ...cities.slice(0, rndInt)];
        game.cards = {
            athensCity : {img : "Athens", name : "Athens", atk : "", hp : "", type : "athens", text : "City", cityHealth: 10, walls: false, desc: "Athens starts at city level 2 and walls are 5 money cheaper"},
            thebesCity : {img : "Thebes", name : "Thebes", atk : "", hp : "", type : "thebes", text : "City", cityHealth: 10, walls: false, desc: "Thebes can hire heroes for 3 money less"},
            spartaCity : {img : "Sparta", name : "Sparta", atk : "", hp : "", type : "sparta", text : "City", cityHealth: 10, walls: false, desc: "Sparta starts with a barracks and their citizens can fight in battle"},
            troyCity : {img : "Troy", name : "Troy", atk : "", hp : "", type : "troy", text : "City", cityHealth: 10, walls: false, desc: "Troy starts with 10 money"},
        };
        game.cardID = 0;
        game.delphiHeroes = shuffle(Object.keys(delphiHeroes));
        game.delphiEvents = shuffle(Object.keys(delphiEvents));
        game.delphi = {hero1: false, hero2: false};
        game.heroHire = false;
        game.event = false;
        game.dead={athens:false, sparta:false, thebes:false, troy:false};
        // Perks //
        game.teams.athens.level = 2;
        game.teams.athens.modifiers.discount.walls.int.athensCity = {
            duration: 1000,
            value: 5,
            card: "athensCity",
        };
        game.teams.sparta.buildings.barracks = true;
        game.teams.thebes.modifiers.discount.heroes.int.thebesCity = {
            duration: 1000,
            value: 3,
            card: "thebesCity",
        };
        game.teams.troy.money = game.teams.troy.money + 10;
        ///////////
        delete game.slots;
        delete game.readyCount;
        delete game.started;
        delete game.playerCount;
        this.setState({ game });
        this.props.openGame(game);
    };

    calculateModStats = (cardSlot, game, attacking) => {
        let card = game.cards[cardSlot];
        if (card.text==="City") return game;
        const mods = game.teams[card.type].modifiers.position;
        const battlefield = cardSlot.split("-s")[0];
        let bfMods = Object.keys(mods.battlefield).filter(eff => eff!=="effect" && mods.battlefield[eff].battlefield===battlefield);
        bfMods = bfMods.filter(eff => !modifiers[eff].effect.mod.effects || modifiers[eff].effect.mod.effects===card.id);
        const bfAtk = bfMods.map(mod => {return mods.battlefield[mod]}).reduce((acc, {atk}) => atk + acc, 0);
        const bfHp = bfMods.map(mod => {return mods.battlefield[mod]}).reduce((acc, {hp}) => hp + acc, 0);
        const slotMods = Object.keys(mods.slot).filter(eff => eff!=="effect" && mods.slot[eff].slot.includes(cardSlot));
        const slotAtk = slotMods.map(mod => {return mods.slot[mod]}).reduce((acc, {atk}) => atk + acc, 0);
        const slotHp = slotMods.map(mod => {return mods.slot[mod]}).reduce((acc, {hp}) => hp + acc, 0);
        card.modAtk = card.atk + bfAtk + slotAtk;
        card.modHp = card.hp + bfHp + slotHp;
        if (attacking!=="attacking" && card.modHp<1 && card.text!=="City") {
            game = removeCard(game, cardSlot);
        };
        return game;
    };

    calculateTeamModStats = (team) => {
        let game = {...this.state.game};
        const cards = game.cards;
        Object.keys(cards).filter(card => cards[card] && cards[card].type === team).forEach(c => {
            if (cards[c]!==null) {
                game = this.calculateModStats(c, game);
            };
        });
        return game;
    };

    attackCard = (attackedSlot) => {
        if (!this.state.selectedCard) return;
        let attackingCard = this.state.selectedCard;
        attackingCard.attacked=attackingCard.attacked +1 || 1;
        let game = {...this.state.game};
        const cards = game.cards;
        const attackingSlot = Object.keys(cards).filter(card => cards[card]===attackingCard)[0];
        let attackedCard = cards[attackedSlot];
        if (attackedCard.text==="City") {
            if (attackedCard.walls>0 && attackingCard.atk>0) {
                if (attackingCard.name==="Battering Ram") {
                    attackedCard.walls = attackedCard.walls - 2;
                    if (attackedCard.walls<1) {
                        attackedCard.walls=0;
                    };
                };
                if (attackingCard.name==="Heracles") {
                    attackedCard.walls = attackedCard.walls-attackingCard.atk;
                } else {
                    attackedCard.walls = attackedCard.walls-1;
                };
            } else {
                attackedCard.cityHealth = attackedCard.cityHealth - attackingCard.atk;
                if (attackedCard.cityHealth<1) {
                    game.dead[attackedCard.type] = true;
                };
            };
        } else {
            [attackedCard, attackingCard] = calculateDamage([attackedCard, attackingCard]);
            attackedCard = calculateStats(attackedCard);
            game.cards[attackingSlot] = calculateStats(attackingCard);
            game = this.calculateModStats(attackedSlot, game, "attacking");
            game = this.calculateModStats(attackingSlot, game, "attacking");
            if (attackedCard.modHp < 1) {
                game = removeCard(game, attackedSlot, attackingCard.type);
            };
            if (attackingCard.modHp < 1) {
                game = removeCard(game, attackingSlot, attackedCard.type);
            };
        };
        attackingCard.moved = true;
        const canMoveTo = ["nowhere"];
        const canAttack = ["nowhere"];
        const canCast = ["nowhere"];
        const selectedCard = {};
        game = this.calculateTeamModStats(game.whoTurn);
        this.setState({ game, selectedCard, canMoveTo, canAttack, canCast });
    };

    buyingCard = (card) => {
        const game = {...this.state.game};
        card.type = game.whoTurn;
        const canPlace = {city: `${card.type}-city`, citizen: card.text};
        const movingCard = {card, canPlace};
        const team = game.whoTurn;
        let foodCost = card.food;
        let moneyCost = card.money;
        if (card.id==="Hero") {
            moneyCost = card.money - Object.values(game.teams[team].modifiers.discount.heroes.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
        };
        if (card.id==="Soldier") {
            foodCost = card.food - Object.values(game.teams[team].modifiers.discount.soldiers.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
        };
        game.teams[team].food = game.teams[team].food-foodCost;
        game.teams[team].money = game.teams[team].money-moneyCost;
        this.setState({ movingCard, game });
    };

    updateTeam = (team, city) => {
        const game = {...this.state.game};
        game.teams[city] = team;
        this.setState({ game });
    };

    moveMovingCard = (e) => { 
        const movingCardDiv = document.querySelector(".moving-card");
        if (!movingCardDiv.firstElementChild) return;
        TweenLite.to(movingCardDiv, 0.1, {
            css: {
              left: e.pageX-70,
              top: e.pageY-50
            }
        });
    };

    placeCard = (cardSlot) => {
        const card = {...this.state.movingCard.card};
        let game = {...this.state.game};
        const team = game.whoTurn;
        game.teams[team].bought[card.name] = true;
        game.cards[cardSlot.id] = JSON.parse(JSON.stringify(card));
        let modifier = card.onPlace;
        let modEffect;
        if (modifier) {
            modEffect = modifiers[modifier];
            if (modEffect.type === "income") {
                game.teams[team].modifiers[modEffect.type][modEffect.resource][modEffect.extent][modEffect.effect.name] = modEffect.effect.mod;
                game= calculateIncome(game, team);
            };
            if (modEffect.type === "discount") {
                game.teams[team].modifiers[modEffect.type][modEffect.discounts][modEffect.extent][modEffect.effect.name] = modEffect.effect.mod;
            };
        };
        if (card.name==="Pericles") {
            game.teams[team].level++;
            game.teams[team].pericles = true;
        };
        modifier = card.atkMod;        
        if (modifier) {
            modEffect = modifiers[modifier];
            game.teams[team].modifiers.attack[cardSlot.id] = modEffect;
        };
        modifier = card.slotModifier;
        if (modifier) {
            modEffect = modifiers[modifier];
            game.teams[team].modifiers.position[modEffect.extent][modEffect.effect.name] = modEffect.effect.mod;
            switch (modEffect.effects) {
                case "allies":
                    game.teams[team].modifiers.position[modEffect.extent][modEffect.effect.name].battlefield = cardSlot.id.split("-s")[0];
                    break;
                case "neighbours":
                    const length = cardSlot.id.length-1;
                    const pos = parseInt(cardSlot.id[length]);
                    const biggerSlot = `${cardSlot.id.substring(0, length)}${pos+1}`;
                    const smallerSlot = `${cardSlot.id.substring(0, length)}${pos-1}`;
                    if (pos!==6||1) {
                        game.teams[team].modifiers.position[modEffect.extent][modEffect.effect.name].slot = [biggerSlot, smallerSlot];
                    } else if (pos===1) {
                        game.teams[team].modifiers.position[modEffect.extent][modEffect.effect.name].slot = [biggerSlot]
                    } else if (pos===6) {
                        game.teams[team].modifiers.position[modEffect.extent][modEffect.effect.name].slot = [smallerSlot]
                    };
                    break;
                default:
                    break;
            };
        };
        game = this.calculateTeamModStats(team);
        const movingCard = {};
        this.setState({ game, movingCard });
    };

    placeCitizen = () => {
        const movingCard = {};
        this.setState({ movingCard });
    };

    showMoves = (card, currentSlot) => {
        if (card.moved) return;
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const game = {...this.state.game};
        const team = Object.keys(game.teams).filter(t => game.teams[t].player===user.name)[0];
        if (team !== game.whoTurn) return;
        const playerTeam = Object.keys(game.teams).filter(team => {return game.teams[team].player===user.name})[0];
        if (card.type!==playerTeam) return;
        if (this.state.selectedCard===card) {
            const selectedCard = {};
            const canMoveTo = ["nowhere"];
            const canAttack = ["nowhere"];
            this.setState({ selectedCard, canMoveTo, canAttack });
            return;
        }
        const selectedCard = card;
        const currentBattlefield = currentSlot.slice(0,currentSlot.length-3);
        let CitizenCard = "";
        if (card.id==="Citizen") {
            CitizenCard = "Citizen";
        };
        const canMoveTo = [...nav[currentBattlefield], CitizenCard];
        const canAttack = atkNav[currentBattlefield];
        this.setState({ selectedCard, canMoveTo, canAttack });
    };

    moveCard = (newSlot) => {
        const card = this.state.selectedCard;
        let game = {...this.state.game};
        const cards = game.cards;
        const canMoveTo = ["nowhere"];
        if (!card.charge && card) {card.moved = true};
        cards[newSlot] = card;
        cards[Object.keys(cards).filter(c => {return cards[c]===card})[0]] = null;
        const selectedCard = {};
        if (card.slotModifier) {
            game = moveAbilityModifier(card, game, newSlot);
        };
        game = this.calculateTeamModStats(game.whoTurn);
        this.setState({ game, selectedCard, canMoveTo });
    };

    openCityShop = (shop) => {
        if (shop==="cityCenter") {
            const shopType = "cityCenter";
            this.setState({ shopType });
        };
    };

    closeCityShop = () => {
        const shopType = "unitShop";
        this.setState({ shopType });
    };

    upLevel = (t, cost) => {
        const game = {...this.state.game};
        const team = game.teams[t];
        team.level = team.level+1;
        team.money = team.money-cost.money;
        team.food = team.food-cost.food;
        this.setState({ game });
    };

    buyBuilding = (t, building, cost) => {
        const game = {...this.state.game};
        const team = game.teams[t];
        if (building==="walls") {
            game.cards[`${t}City`].walls = 10;
        };
        if (team.modifiers.discount.buildings.multiplier.cadmus) {
            team.modifiers.discount.buildings.multiplier.cadmus = null;
        };
        team.buildings[building] = true;
        team.money = team.money-cost;
        this.setState({ game });
    };

    setInfoState = (card) => {
        const cardInfo = {...card};
        this.setState({ cardInfo });
    };

    calcIncome = (team) => {
        let game = {...this.state.game};
        game = calculateIncome(game, team);
        this.setState({ game });
    };

    heroForHire = () => {
        const game = {...this.state.game};
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const team = Object.keys(game.teams).filter(t => game.teams[t].player===user.name)[0];
        if ((game.delphi.hero1 && game.delphi.hero2) || game.heroHire || game.whoTurn !== team) return;
        const heroes = game.delphiHeroes;
        if (!game.delphi.hero1) {
            game.delphi.hero1 = JSON.parse(JSON.stringify(delphiHeroes[heroes[0]]));
            game.delphiHeroes = [...heroes].slice(1);
        } else if (!game.delphi.hero2) {
            game.delphi.hero2 = JSON.parse(JSON.stringify(delphiHeroes[heroes[0]]));
            game.delphiHeroes = [...heroes].slice(1);
        };
        game.heroHire = true;
        game.teams[team].money--;
        this.setState({ game });
    };

    consultOracle = () => {
        let game = {...this.state.game};
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const team = Object.keys(game.teams).filter(t => game.teams[t].player===user.name)[0];
        if (game.event || team !== game.whoTurn) return;
        const events = game.delphiEvents;
        const eventName = events[0];
        const event = JSON.parse(JSON.stringify(delphiEvents[eventName]))
        game.delphiEvents = [...events.slice(1), eventName];
        const modifier = modifiers[event.modifier];
        game.teams[team].modifiers[modifier.type][modifier.resource][modifier.extent][modifier.effect.name] = modifier.effect.mod;
        game.event = true;
        game = calculateIncome(game, team);
        this.setState({ game });
    };

    abilityButton = () => {
        let game = {...this.state.game};
        let selectedCard = {...this.state.selectedCard};
        game = castAbility(game, selectedCard.ability, selectedCard);
        selectedCard.cast = true;
        const canMoveTo = ["nowhere"];
        const canAttack = ["nowhere"];
        this.setState({ selectedCard, game, canMoveTo, canAttack });
    };

    castOnEvent = (event) => {
        let selectedCard = {...this.state.selectedCard};
        let game = {...this.state.game};
        game = castAbilityOnEvent(game, selectedCard, selectedCard.canTarget, event);
        selectedCard = {};
        const canMoveTo = ["nowhere"];
        const canAttack = ["nowhere"];
        const canCast = ["nowhere"]
        this.setState({ game, selectedCard, canMoveTo, canAttack, canCast })
    };
    
    canTargetAbility = () => {
        let selectedCard = {...this.state.selectedCard};
        let game = {...this.state.game};
        let canCast;
        if (this.state.canCast[0]==="nowhere") {
            canCast = canCastAbility(game, selectedCard, selectedCard.canTarget);
        } else {
            canCast = ["nowhere"];
        };
        this.setState({ canCast });
    };
    
    castHere = (cardSlot) => {
        let game = {...this.state.game};
        let selectedCard = {...this.state.selectedCard};
        game = castTargetAbility(game, selectedCard, selectedCard.canTarget, cardSlot);
        selectedCard.cast = true;
        const canMoveTo = ["nowhere"];
        const canAttack = ["nowhere"];
        const canCast = ["nowhere"]
        this.setState({ selectedCard, game, canMoveTo, canAttack, canCast });
    };

    endTurn = async () => {
        let game = {...this.state.game};
        const team = game.whoTurn;
        if (!game.dead[team]) {
            const foodIncome = game.teams[team].foodIncome;
            const moneyIncome = game.teams[team].moneyIncome;
            game.teams[team].food = game.teams[team].food+foodIncome;
            game.teams[team].money = game.teams[team].money+moneyIncome;
        };
        let nextTurn = game.order.indexOf(game.whoTurn)+1;
        if (nextTurn===4) {nextTurn = 0};
        game.heroHire = false;
        game.event = false;
        const cards = game.cards;
        Object.keys(cards).forEach(c => {
            cards[c].moved=false;
            cards[c].cast=false;
            if (cards[c].cooldown && cards[c].type===game.whoTurn) {
                cards[c].cooldown = cards[c].cooldown-1;
            };
        });
        const deadTeams = Object.keys(game.dead).filter(t => game.dead[t]);
        const cardsToDelete = Object.keys(cards).filter(c => cards[c].text!=="City" && deadTeams.includes(cards[c].type));
        cardsToDelete.forEach(card => {
            game = removeCard(game, card);
        });
        const ComPlayers = ["player 1", "player 2", "player 3"];
        if (!ComPlayers.includes(game.teams[team].player)) {
            game = lowerDuration(game, team);
            game = calculateIncome(game, team);
        };
        game.whoTurn = game.order[nextTurn];
        const canMoveTo = ["nowhere"];
        const canAttack = ["nowhere"];
        const canCast = ["nowhere"];
        const selectedCard = {};
        this.setState({ game, canMoveTo, canAttack, canCast, selectedCard });
    };
    
    cardSlotProps = {
        placeCard: (cardSlot) => this.placeCard(cardSlot),
        showMoves: (card, cardSlot) => this.showMoves(card, cardSlot),
        moveCard: (newSlot) => this.moveCard(newSlot),
        attackCard: (attackedSlot) => this.attackCard(attackedSlot),
        setInfoState: (card) => this.setInfoState(card),
        castHere: (cardSlot) => this.castHere(cardSlot),
    };

    render() {

        if (this.state.playerInfo) return (
            <PlayerInfo 
                game={this.state.game}
                closePlayerInfo={this.closePlayerInfo}
            />
        );
        if (this.state.cardList) return (
            <CardList 
                closeCardList={this.closeCardList}
            />
        );
        return (
            <>
            <Board 
                game={this.state.game} 
                updateTeam={this.updateTeam}
                goToPage={this.props.goToPage}
                moveMovingCard={this.moveMovingCard}
                placeCitizen={this.placeCitizen}
                openCityShop={this.openCityShop}
                cardSlotProps={this.cardSlotProps}
                movingCard={this.state.movingCard}
                cards={this.state.game.cards}
                selectedCard={this.state.selectedCard}
                canMoveTo={this.state.canMoveTo}
                canAttack={this.state.canAttack}
                canCast={this.state.canCast}
                delphiHeroCards={delphiHeroes}
                heroForHire={this.heroForHire}
                consultOracle={this.consultOracle}
                buyingCard={this.buyingCard}
                calculateIncome={this.calcIncome}
                openCardList={this.openCardList}
                openPlayerInfo={this.openPlayerInfo}
            />
            <Hud 
                cards={cityCards}
                game={this.state.game} 
                cardInfo={this.state.cardInfo}
                shopType={this.state.shopType}
                endTurn={this.endTurn}
                buyingCard={this.buyingCard}
                closeCityShop={this.closeCityShop}
                upLevel={this.upLevel}
                buyBuilding={this.buyBuilding}
                setInfoState={this.setInfoState}
                delphiEvents={delphiEvents}
                selectedCard={this.state.selectedCard}
                abilityButton={this.abilityButton}
                canTargetAbility={this.canTargetAbility}
                canCast={this.state.canCast}
                castOnEvent={this.castOnEvent}
            />
            </>
        )};
}   

export default Play;